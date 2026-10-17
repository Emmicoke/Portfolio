import React from 'react';

import '../Education/Education.css';
import { shortMonth } from '../../i18n/content';

function ExperienceCard({ id, company, jobtitle, startYear, startMonth, endMonth, endYear, note, lang }) {
    const from = shortMonth(startMonth, lang);
    const to = shortMonth(endMonth, lang);
    return (
        <li key={id} className="timeline-row">
            <p className="timeline-when">
                {startYear === endYear ? `${from}–${to} ${endYear}` : `${from} ${startYear}–${to} ${endYear}`}
            </p>
            <div className="timeline-what">
                <h3>{jobtitle}</h3>
                <p>{company}</p>
                {note && <p className="timeline-note">{note}</p>}
            </div>
        </li>
    );
}

export default ExperienceCard;
