import React, { useEffect, useState } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';

import './Navbar.css';
import Preferences from '../Preferences/Preferences';
import { usePrefs } from '../../i18n/Preferences';
import { headerData } from '../../data/headerData';
import { contactsData } from '../../data/contactsData';

const links = [
    { to: '/#about', key: 'nav.about' },
    { to: '/#skills', key: 'nav.skills' },
    { to: '/#education', key: 'nav.education' },
    { to: '/#projects', key: 'nav.projects' },
    { to: '/#achievement', key: 'nav.achievements' },
    { to: '/#contacts', key: 'nav.contact' },
];

const formatTime = () =>
    new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Istanbul',
    }).format(new Date());

function useLocalTime() {
    const [time, setTime] = useState(formatTime);
    useEffect(() => {
        const timer = setInterval(() => setTime(formatTime()), 15000);
        return () => clearInterval(timer);
    }, []);
    return time;
}

function Navbar() {
    const { t } = usePrefs();
    const [open, setOpen] = useState(false);
    const time = useLocalTime();
    const city = (contactsData.address || '').split('/')[0];

    const close = () => setOpen(false);

    return (
        <header className="topbar">
            <div className="wrap topbar-row">
                <NavLink to="/#home" smooth className="topbar-name" onClick={close}>
                    {headerData.name}
                </NavLink>

                <button
                    className="topbar-menu"
                    aria-expanded={open}
                    aria-controls="site-nav"
                    onClick={() => setOpen(!open)}
                >
                    {open ? t('nav.close') : t('nav.menu')}
                </button>

                <nav id="site-nav" className={`topbar-nav${open ? ' is-open' : ''}`} aria-label={t('nav.sections')}>
                    {links.map((link) => (
                        <NavLink key={link.to} to={link.to} smooth onClick={close}>
                            {t(link.key)}
                        </NavLink>
                    ))}
                </nav>

                <div className="topbar-aside">
                    {city && (
                        <span className="topbar-time" title={t('nav.localTime')}>
                            {city} {time}
                        </span>
                    )}
                    <Preferences />
                </div>
            </div>
        </header>
    );
}

export default Navbar;
