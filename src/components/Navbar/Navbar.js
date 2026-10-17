import React, { useState, useEffect } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { IoMenuSharp, IoClose } from 'react-icons/io5';

import './Navbar.css';
import { headerData } from '../../data/headerData';

function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = [
        { to: '/#about', label: 'About' },
        { to: '/#skills', label: 'Skills' },
        { to: '/#education', label: 'Education' },
        { to: '/#experience', label: 'Experience' },
        { to: '/#projects', label: 'Projects' },
        { to: '/#contacts', label: 'Contact' },
    ];

    const close = () => setOpen(false);

    return (
        <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className='navbar--container wrap'>
                <NavLink to='/' className='navbar--brand' onClick={close}>
                    {headerData.name.split(' ')[0]}
                    <span>{headerData.name.split(' ').slice(1).join(' ')}</span>
                </NavLink>

                <nav className={`navbar--links ${open ? 'is-open' : ''}`}>
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            smooth={true}
                            duration={600}
                            onClick={close}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    {headerData.resumePdf && (
                        <a
                            className='navbar--cv'
                            href={headerData.resumePdf}
                            download='resume'
                            target='_blank'
                            rel='noreferrer'
                            onClick={close}
                        >
                            CV
                        </a>
                    )}
                </nav>

                <button
                    className='navbar--toggle'
                    onClick={() => setOpen(!open)}
                    aria-label={open ? 'Close menu' : 'Open menu'}
                >
                    {open ? <IoClose /> : <IoMenuSharp />}
                </button>
            </div>
        </header>
    );
}

export default Navbar;
