import React from 'react';

import './Education.css'

function EducationCard({ id, institution, degree, course, startYear, endYear }) {
    return (
        <article key={id} className="education-card">
            <p className="education-years">{startYear} — {endYear}</p>
            <div className="education-details">
                <h3>{degree}</h3>
                <h4>{course}</h4>
                <p>{institution}</p>
            </div>
        </article>
    )
}

export default EducationCard
