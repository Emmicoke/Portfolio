import React from 'react';

import '../Education/Education.css';
import './Experience.css';
import ExperienceCard from './ExperienceCard';
import { usePrefs } from '../../i18n/Preferences';
import { experienceNotesEn } from '../../i18n/content';
import { experienceData } from '../../data/experienceData';

function Experience() {
    const { t, pick, lang } = usePrefs();
    if (!experienceData.length) return null;

    return (
        <section className="block experience" id="experience">
            <div className="wrap split">
                <h2 className="heading">{t('experience.title')}</h2>
                <ol className="timeline">
                    {experienceData.map((item) => {
                        const exp = pick({ ...item, note: experienceNotesEn[item.id] }, ['experience', item.id]);
                        return (
                            <ExperienceCard
                                key={exp.id}
                                id={exp.id}
                                jobtitle={exp.jobtitle}
                                company={exp.company}
                                startMonth={exp.startMonth}
                                endMonth={exp.endMonth}
                                startYear={exp.startYear}
                                endYear={exp.endYear}
                                note={exp.note}
                                lang={lang}
                            />
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}

export default Experience;
