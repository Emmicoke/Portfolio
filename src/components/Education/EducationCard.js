import React from 'react';

import './Education.css';
import { contentTr } from '../../i18n/content';

function EducationCard({ id, institution, degree, course, startYear, endYear, lang }) {
    const current = String(endYear).toLowerCase() === 'present';
    const end = current && lang === 'tr' ? contentTr.present : endYear;
    return (
        <li key={id} className={`timeline-row${current ? ' is-current' : ''}`}>
            <p className="timeline-when">
                {startYear}–{end}
            </p>
            <div className="timeline-what">
                <h3>{institution}</h3>
                <p>
                    {degree}, {course}
                </p>
            </div>
        </li>
    );
}

export default EducationCard;
