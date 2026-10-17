import React, { useCallback, useEffect, useRef, useState } from 'react';

import { usePrefs } from '../../i18n/Preferences';

// GitHub "blob ... ?raw=true" links redirect without CORS headers, which would
// taint the canvas. Point straight at raw.githubusercontent.com instead.
export function toRawUrl(url) {
    if (!url) return url;
    const m = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/(.+?)(\?raw=true)?$/);
    return m ? `https://raw.githubusercontent.com/${m[1]}/${m[2]}/${m[3]}` : url;
}

const WORK_WIDTH = 720;

function sobel(img) {
    const ratio = img.naturalHeight / img.naturalWidth;
    const w = WORK_WIDTH;
    const h = Math.round(WORK_WIDTH * ratio);
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    const src = ctx.getImageData(0, 0, w, h).data; // throws if tainted

    // luminance
    const gray = new Float32Array(w * h);
    for (let i = 0, p = 0; i < gray.length; i++, p += 4) {
        gray[i] = 0.299 * src[p] + 0.587 * src[p + 1] + 0.114 * src[p + 2];
    }

    // two passes of a 3x3 gaussian keep only the meaningful edges
    const smooth = (a) => {
        const out = new Float32Array(a);
        for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
                const i = y * w + x;
                out[i] =
                    (a[i - w - 1] + 2 * a[i - w] + a[i - w + 1] +
                        2 * a[i - 1] + 4 * a[i] + 2 * a[i + 1] +
                        a[i + w - 1] + 2 * a[i + w] + a[i + w + 1]) / 16;
            }
        }
        return out;
    };
    const blur = smooth(smooth(gray));

    const mag = new Float32Array(w * h);
    const sample = [];
    for (let y = 2; y < h - 2; y++) {
        for (let x = 2; x < w - 2; x++) {
            const i = y * w + x;
            const gx =
                -blur[i - w - 1] - 2 * blur[i - 1] - blur[i + w - 1] +
                blur[i - w + 1] + 2 * blur[i + 1] + blur[i + w + 1];
            const gy =
                -blur[i - w - 1] - 2 * blur[i - w] - blur[i - w + 1] +
                blur[i + w - 1] + 2 * blur[i + w] + blur[i + w + 1];
            const m = Math.sqrt(gx * gx + gy * gy);
            mag[i] = m;
            if ((i & 7) === 0) sample.push(m);
        }
    }
    sample.sort((a, b) => a - b);
    const ceiling = sample[Math.floor(sample.length * 0.97)] || 1;

    const alpha = new Uint8ClampedArray(w * h);
    for (let i = 0; i < mag.length; i++) {
        // drop faint texture (asphalt, grass), keep real contours
        const v = (mag[i] / ceiling - 0.4) / 0.6;
        alpha[i] = v <= 0 ? 0 : Math.min(1, v) * 255;
    }
    return { w, h, alpha };
}

function readColor(name) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const c = document.createElement('canvas').getContext('2d');
    c.fillStyle = raw || '#000';
    const hex = c.fillStyle; // normalised to #rrggbb
    return [1, 3, 5].map((o) => parseInt(hex.slice(o, o + 2), 16));
}

function EdgePortrait({ src, alt }) {
    const { t } = usePrefs();
    const canvasRef = useRef(null);
    const edgesRef = useRef(null);
    const [status, setStatus] = useState('loading'); // loading | ready | plain
    const [split, setSplit] = useState(36);
    const [scan, setScan] = useState(0);
    const url = toRawUrl(src);

    const paint = useCallback(() => {
        const edges = edgesRef.current;
        const canvas = canvasRef.current;
        if (!edges || !canvas) return;
        canvas.width = edges.w;
        canvas.height = edges.h;
        const ctx = canvas.getContext('2d');
        const [pr, pg, pb] = readColor('--paper');
        const [ir, ig, ib] = readColor('--ink');
        const out = ctx.createImageData(edges.w, edges.h);
        const d = out.data;
        for (let i = 0, p = 0; i < edges.alpha.length; i++, p += 4) {
            const a = edges.alpha[i] / 255;
            d[p] = pr + (ir - pr) * a;
            d[p + 1] = pg + (ig - pg) * a;
            d[p + 2] = pb + (ib - pb) * a;
            d[p + 3] = 255;
        }
        ctx.putImageData(out, 0, 0);
    }, []);

    useEffect(() => {
        let cancelled = false;
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            if (cancelled) return;
            try {
                edgesRef.current = sobel(img);
                setStatus('ready');
            } catch {
                setStatus('plain');
            }
        };
        img.onerror = () => !cancelled && setStatus('plain');
        img.src = url;
        return () => {
            cancelled = true;
        };
    }, [url]);

    // paint once ready, repaint when the page switches light/dark
    useEffect(() => {
        if (status !== 'ready') return;
        paint();
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const repaint = () => requestAnimationFrame(paint);
        window.addEventListener('fek-mode', repaint);
        mq.addEventListener && mq.addEventListener('change', repaint);
        return () => {
            window.removeEventListener('fek-mode', repaint);
            mq.removeEventListener && mq.removeEventListener('change', repaint);
        };
    }, [status, paint]);

    // the one animated moment: a scan line sweeps down as the filter "runs"
    useEffect(() => {
        if (status !== 'ready') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setScan(100);
            return;
        }
        let raf;
        const start = performance.now();
        const duration = 1700;
        const step = (now) => {
            const t = Math.min(1, (now - start) / duration);
            setScan(100 * (1 - Math.pow(1 - t, 3)));
            if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [status]);

    const scanning = status === 'ready' && scan < 100;

    return (
        <figure className={`edge edge--${status}`}>
            <div className="edge-stage" style={{ '--split': `${split}%`, '--scan': `${scan}%`}}>
                <img className="edge-photo" src={url} alt={alt} />
                {status === 'ready' && (
                    <>
                        <canvas ref={canvasRef} className="edge-canvas" aria-hidden="true" />
                        {scanning && <span className="edge-scan" aria-hidden="true" />}
                        {!scanning && <span className="edge-handle" aria-hidden="true" />}
                        <label className="visually-hidden" htmlFor="edge-range">
                            {t('edge.range')}
                        </label>
                        <input
                            id="edge-range"
                            className="edge-range"
                            type="range"
                            min="0"
                            max="100"
                            value={split}
                            onChange={(e) => setSplit(Number(e.target.value))}
                        />
                    </>
                )}
            </div>
            <figcaption>
                {status === 'ready'
                    ? t('edge.caption')
                    : status === 'loading'
                    ? t('edge.loading')
                    : alt}
            </figcaption>
        </figure>
    );
}

export default EdgePortrait;
