import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { ui } from './ui';
import { contentTr } from './content';

const PreferencesContext = createContext(null);

function stored(key) {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function store(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch {}
}

function initialLang() {
    const saved = stored('fek-lang');
    if (saved === 'en' || saved === 'tr') return saved;
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    return nav.toLowerCase().startsWith('tr') ? 'tr' : 'en';
}

function initialMode() {
    const saved = stored('fek-mode');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function PreferencesProvider({ children }) {
    const [lang, setLangState] = useState(initialLang);
    const [mode, setModeState] = useState(initialMode);

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    useEffect(() => {
        document.documentElement.setAttribute('data-mode', mode);
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', mode === 'dark' ? '#16181b' : '#eceee9');
        window.dispatchEvent(new Event('fek-mode'));
    }, [mode]);

    const setLang = useCallback((next) => {
        store('fek-lang', next);
        setLangState(next);
    }, []);

    const setMode = useCallback((next) => {
        store('fek-mode', next);
        setModeState(next);
    }, []);

    const value = useMemo(() => {
        const strings = ui[lang] || ui.en;
        const t = (key, vars) => {
            let s = strings[key] !== undefined ? strings[key] : ui.en[key] || key;
            if (vars) Object.keys(vars).forEach((k) => (s = s.split(`{${k}}`).join(vars[k])));
            return s;
        };
        // pick(base, ['projects', 3]) -> base merged with the Turkish override, if any
        const pick = (base, path) => {
            if (lang !== 'tr') return base;
            const override = path.reduce((node, k) => (node ? node[k] : undefined), contentTr);
            return override ? { ...base, ...override } : base;
        };
        return { lang, setLang, mode, setMode, t, pick };
    }, [lang, mode, setLang, setMode]);

    return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePrefs() {
    return useContext(PreferencesContext);
}
