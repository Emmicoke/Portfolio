import React from 'react';

import './Education.css';
import EducationCard from './EducationCard';
import { usePrefs } from '../../i18n/Preferences';
import { educationData } from '../../data/educationData';

function Education() {
    const { t, pick, lang } = usePrefs();
    // newest first reads more naturally on a CV
    const items = [...educationData].sort((a, b) => Number(b.startYear) - Number(a.startYear));

    return (
        <section className="block education" id="education">
            <div className="wrap split">
                <h2 className="heading">{t('education.title')}</h2>
                <ol className="timeline">
                    {items.map((item) => {
                        const edu = pick(item, ['education', item.id]);
                        return (
                            <EducationCard
                                key={edu.id}
                                id={edu.id}
                                institution={edu.institution}
                                degree={edu.degree}
                                course={edu.course}
                                startYear={edu.startYear}
                                endYear={edu.endYear}
                                lang={lang}
                            />
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}

export default Education;
