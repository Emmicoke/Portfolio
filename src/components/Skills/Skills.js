import React from 'react';

import './Skills.css';
import { usePrefs } from '../../i18n/Preferences';
import { skillsData } from '../../data/skillsData';
import { skillsImage } from '../../utils/skillsImage';

function Skills() {
    const { t } = usePrefs();
    return (
        <section className="block skills" id="skills">
            <div className="wrap split">
                <h2 className="heading">
                    {t('skills.title')}
                    <small>{t('skills.note')}</small>
                </h2>

                <ul className="skills-list">
                    {skillsData.map((skill) => {
                        const icon = skillsImage(skill);
                        return (
                            <li key={skill}>
                                {icon && <img src={icon} alt="" aria-hidden="true" />}
                                {skill}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

export default Skills;
