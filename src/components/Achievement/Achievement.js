import React from 'react';

import './Achievement.css';
import { achievementData } from '../../data/achievementData'
import AchievementCard from './AchievementCard';

function Achievement() {
    return (
        <>
            {achievementData.achievements.length > 0 && (
                <section className="achievement section" id="achievement">
                    <div className="wrap">
                        <div className="section-head">
                            <div>
                                <p className="kicker">Notes</p>
                                <h2>Achievements</h2>
                            </div>
                        </div>
                        <p className="achievement-bio">{achievementData.bio}</p>
                        <div className="achievement-cards">
                            {achievementData.achievements.map(achieve => (
                                <AchievementCard
                                    key={achieve.id}
                                    id={achieve.id}
                                    title={achieve.title}
                                    details={achieve.details}
                                    date={achieve.date}
                                    field={achieve.field}
                                    image={achieve.image}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default Achievement
