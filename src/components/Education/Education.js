import React from 'react';

import './Education.css'
import EducationCard from './EducationCard';

import { educationData } from '../../data/educationData'

function Education() {
    return (
        <section className="education section" id="education">
            <div className="wrap">
                <div className="section-head">
                    <div>
                        <p className="kicker">Studies</p>
                        <h2>Education</h2>
                    </div>
                </div>

                <div className="education-list">
                    {educationData.map(edu => (
                        <EducationCard
                            key={edu.id}
                            id={edu.id}
                            institution={edu.institution}
                            degree={edu.degree}
                            course={edu.course}
                            startYear={edu.startYear}
                            endYear={edu.endYear}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Education
