import React from 'react';

import './About.css';
import { aboutData } from '../../data/aboutData'

function About() {
    const extraParagraphs = aboutData.description2
        .split('\n')
        .map((part) => part.trim())
        .filter(Boolean);

    return (
        <section className="about section" id="about">
            <div className="wrap">
                <div className="section-head">
                    <div>
                        <p className="kicker">About</p>
                        <h2>{aboutData.title}</h2>
                    </div>
                </div>

                <div className="about-body">
                    <p className="about-intro">{aboutData.description1}</p>
                    <div className="about-copy">
                        {extraParagraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
