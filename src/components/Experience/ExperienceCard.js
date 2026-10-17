import React from 'react';

import './Experience.css'

function ExperienceCard({id, company, jobtitle, startYear, startMonth, endMonth, endYear}) {
    return (
        <article key={id} className="experience-card">
            <p className="experience-years">{startMonth} {startYear} — {endMonth} {endYear}</p>
            <div className="experience-details">
                <h3>{jobtitle}</h3>
                <h4>{company}</h4>
                <p>
                    This internship was part of the Erasmus+ Internship Mobility Program and took place at South Tours, a tourism and travel
                    agency based in Spain. The internship focused on web development and software engineering tasks, specifically contributing to the maintenance, development,
                    and enhancement of a web-based tour management system used by the company.
                </p>
            </div>
        </article>
    )
}

export default ExperienceCard
