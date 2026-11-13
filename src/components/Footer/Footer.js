import React from 'react';

import './Footer.css';
import { usePrefs } from '../../i18n/Preferences';
import { headerData } from '../../data/headerData';

function Footer() {
    const { pick, t } = usePrefs();
    return (
        <footer className="footer">
            <div className="wrap footer-row">
                <div className="footer-id">
                    <p>
                        © {new Date().getFullYear()} {headerData.name}
                    </p>
                    <p>{pick(headerData, ['header']).title}</p>
                </div>
                <button className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    {t('top.back')}
                </button>
            </div>
        </footer>
    );
}

export default Footer;
