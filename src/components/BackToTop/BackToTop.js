import React, { useEffect, useState } from 'react';

import './BackToTop.css';
import { usePrefs } from '../../i18n/Preferences';

function BackToTop() {
    const { t } = usePrefs();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <button
            className={`backToTop${visible ? ' is-visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            tabIndex={visible ? 0 : -1}
            aria-hidden={!visible}
        >
            {t('top.back')}
        </button>
    );
}

export default BackToTop;
