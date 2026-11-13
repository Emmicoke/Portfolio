import React, { useEffect, useState } from 'react';

import './BackToTop.css';
import { usePrefs } from '../../i18n/Preferences';

function BackToTop() {
    const { t } = usePrefs();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            // the footer carries its own "back to top" link, so the floating
            // button steps aside as soon as the footer comes into view
            const footer = document.querySelector('.footer');
            const footerInView = footer && footer.getBoundingClientRect().top < window.innerHeight;
            setVisible(window.scrollY > window.innerHeight * 1.2 && !footerInView);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
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
