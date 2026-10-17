import React from 'react';

import './Footer.css';
import { usePrefs } from '../../i18n/Preferences';
import { headerData } from '../../data/headerData';

function Footer() {
    const { pick } = usePrefs();
    return (
        <footer className="footer">
            <div className="wrap footer-row">
                <p>
                    © {new Date().getFullYear()} {headerData.name}
                </p>
                <p>{pick(headerData, ['header']).title}</p>
            </div>
        </footer>
    );
}

export default Footer;
