import React from 'react';

import './About.css';
import { usePrefs } from '../../i18n/Preferences';
import { aboutData } from '../../data/aboutData';

function About() {
    const { pick } = usePrefs();
    const about = pick(aboutData, ['about']);
    const paragraphs = about.description2
        .split('\n')
        .map((part) => part.trim())
        .filter(Boolean);

    return (
        <section className="block about" id="about">
            <div className="wrap split">
                <h2 className="heading">{about.title}</h2>

                <div className="about-body">
                    <p className="about-lead">{about.description1}</p>
                    <div className="about-text">
                        {paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
