import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';

import './Landing.css';
import EdgePortrait from './EdgePortrait';
import { usePrefs } from '../../i18n/Preferences';
import { headerData } from '../../data/headerData';
import { contactsData } from '../../data/contactsData';

function Landing() {
    const { t, pick, lang } = usePrefs();
    const header = pick(headerData, ['header']);
    const words = headerData.name.split(' ');
    const last = words.pop();
    const place = contactsData.address.replace('/', ', ');
    const resume = headerData.resumePdf && (headerData.resumePdf[lang] || headerData.resumePdf.en);
    const title = lang === 'tr' ? header.title.toLocaleLowerCase('tr-TR') : header.title;

    return (
        <section className="hero" id="home">
            <div className="wrap hero-grid">
                <div className="hero-text">
                    <h1 className="hero-name">
                        <span>{words.join(' ')}</span> <span>{last}</span>
                    </h1>

                    <div className="hero-intro">
                        <p className="hero-role">{t('hero.role', { title, place })}</p>

                        <blockquote className="hero-quote">{header.desciption}</blockquote>

                        <div className="hero-actions">
                            {resume && (
                                <a
                                    className="button"
                                    href={resume}
                                    download={`FahrettinEminKORKUT-CV-${lang.toUpperCase()}.pdf`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {t('hero.cv')}
                                </a>
                            )}
                            <NavLink className="button button--line" to="/#contacts" smooth>
                                {t('hero.contact')}
                            </NavLink>
                        </div>
                    </div>
                </div>

                <EdgePortrait src={headerData.image} alt={t('hero.photoAlt', { name: headerData.name })} />
            </div>
        </section>
    );
}

export default Landing;
