import React from 'react';

import './Achievement.css';

function AchievementCard({ id, title, details, date, field, image, onOpen, enlargeLabel }) {
    return (
        <li key={id} className="certificate">
            <button className="certificate-thumb" onClick={onOpen} aria-label={enlargeLabel}>
                <img src={image} alt="" loading="lazy" />
            </button>
            <h3>{title}</h3>
            <p>{details}</p>
            <p className="certificate-date">
                {date}
                <span>{field}</span>
            </p>
        </li>
    );
}

export default AchievementCard;
