import React from 'react';

import './Achievement.css'

function AchievementCard({id, title, details, date, field, image}) {
    return (
        <article key={id} className="achievement-card">
            <div className="achievecard-imgcontainer">
                <img src={image} alt={title} />
            </div>
            <div className="achievecard-content">
                <p className="achievecard-meta">
                    <span>{date}</span>
                    <span>{field}</span>
                </p>
                <h3>{title}</h3>
                <p>{details}</p>
            </div>
        </article>
    )
}

export default AchievementCard
