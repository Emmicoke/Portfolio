import React from 'react';

import './Experience.css';

import { experienceData } from '../../data/experienceData'
import ExperienceCard from './ExperienceCard';

function Experience() {
    return (
        <section className="experience section" id="experience">
            <div className="wrap">
                <div className="section-head">
                    <div>
                        <p className="kicker">Work</p>
                        <h2>Experience</h2>
                    </div>
                </div>

                <div className="experience-list">
                    {experienceData.map(exp => (
                        <ExperienceCard
                            key={exp.id}
                            id={exp.id}
                            jobtitle={exp.jobtitle}
                            company={exp.company}
                            startMonth={exp.startMonth}
                            endMonth={exp.endMonth}
                            startYear={exp.startYear}
                            endYear={exp.endYear}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experience
