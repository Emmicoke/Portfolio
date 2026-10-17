import React from 'react';

import './Testimonials.css';
import { usePrefs } from '../../i18n/Preferences';
import { testimonialsData } from '../../data/testimonialsData';

function Testimonials() {
    const { t } = usePrefs();
    if (!testimonialsData.length) return null;

    return (
        <section className="block testimonials" id="testimonials">
            <div className="wrap split">
                <h2 className="heading">{t('testimonials.title')}</h2>
                <ul className="quote-list">
                    {testimonialsData.map((t) => (
                        <li key={t.id}>
                            <blockquote>{t.text}</blockquote>
                            <p>
                                {t.name}, {t.title}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Testimonials;
