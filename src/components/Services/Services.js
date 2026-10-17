import React from 'react';

import './Services.css';
import SingleService from './SingleService/SingleService';
import { usePrefs } from '../../i18n/Preferences';
import { servicesData } from '../../data/servicesData';

function Services() {
    const { t } = usePrefs();
    if (!servicesData.length) return null;

    return (
        <section className="block services" id="services">
            <div className="wrap split">
                <h2 className="heading">{t('services.title')}</h2>
                <ul className="service-list">
                    {servicesData.map((service) => (
                        <SingleService key={service.id} id={service.id} title={service.title} icon={service.icon} />
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Services;
