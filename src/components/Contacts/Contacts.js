import React, { useState } from 'react';
import axios from 'axios';
import isEmail from 'validator/lib/isEmail';

import './Contacts.css';
import { usePrefs } from '../../i18n/Preferences';
import { contactsData } from '../../data/contactsData';
import { socialsData } from '../../data/socialsData';

const socialNames = {
    github: 'GitHub',
    linkedIn: 'LinkedIn',
    instagram: 'Instagram',
    twitter: 'Twitter',
    facebook: 'Facebook',
    codepen: 'CodePen',
    reddit: 'Reddit',
    blogger: 'Blogger',
    medium: 'Medium',
    stackOverflow: 'Stack Overflow',
    gitlab: 'GitLab',
    youtube: 'YouTube',
};

// Only shown when a form endpoint is configured in contactsData.sheetAPI
function ContactForm() {
    const { t } = usePrefs();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [state, setState] = useState({ kind: 'idle', text: '' });

    const submit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setState({ kind: 'error', text: t('form.missing') });
            return;
        }
        if (!isEmail(email)) {
            setState({ kind: 'error', text: t('form.badEmail') });
            return;
        }
        setState({ kind: 'sending', text: t('form.sending') });
        axios
            .post(contactsData.sheetAPI, { name, email, message })
            .then(() => {
                setState({ kind: 'sent', text: t('form.sent', { email }) });
                setName('');
                setEmail('');
                setMessage('');
            })
            .catch(() =>
                setState({ kind: 'error', text: t('form.failed') })
            );
    };

    return (
        <form className="contact-form" onSubmit={submit} noValidate>
            <label>
                {t('form.name')}
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
            <label>
                {t('form.email')}
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </label>
            <label className="contact-form-wide">
                {t('form.message')}
                <textarea rows="5" value={message} onChange={(e) => setMessage(e.target.value)} />
            </label>
            <div className="contact-form-wide contact-form-foot">
                <button className="button" type="submit" disabled={state.kind === 'sending'}>
                    {t('form.send')}
                </button>
                <p role="status" className={`contact-status is-${state.kind}`}>
                    {state.text}
                </p>
            </div>
        </form>
    );
}

function Contacts() {
    const { t } = usePrefs();
    const [copied, setCopied] = useState(false);
    const socials = Object.keys(socialNames).filter((key) => socialsData[key]);

    const copyEmail = () => {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(contactsData.email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <section className="block contacts" id="contacts">
            <div className="wrap">
                <h2 className="heading">{t('contact.title')}</h2>

                <p className="contact-email">
                    <a href={`mailto:${contactsData.email}`}>{contactsData.email}</a>
                </p>
                <button className="contact-copy" onClick={copyEmail}>
                    {copied ? t('contact.copied') : t('contact.copy')}
                </button>

                <dl className="contact-details">
                    {contactsData.phone && (
                        <div>
                            <dt>{t('contact.phone')}</dt>
                            <dd>
                                <a className="pen-link" href={`tel:${contactsData.phone.replace(/\s/g, '')}`}>
                                    {contactsData.phone}
                                </a>
                            </dd>
                        </div>
                    )}
                    {contactsData.address && (
                        <div>
                            <dt>{t('contact.location')}</dt>
                            <dd>{contactsData.address.replace('/', ', ')}</dd>
                        </div>
                    )}
                    {socials.length > 0 && (
                        <div>
                            <dt>{t('contact.elsewhere')}</dt>
                            <dd className="contact-socials">
                                {socials.map((key) => (
                                    <a key={key} className="pen-link" href={socialsData[key]} target="_blank" rel="noreferrer">
                                        {socialNames[key]}
                                    </a>
                                ))}
                            </dd>
                        </div>
                    )}
                </dl>

                {contactsData.sheetAPI && <ContactForm />}
            </div>
        </section>
    );
}

export default Contacts;
