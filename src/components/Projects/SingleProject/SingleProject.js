import React, { useState } from 'react';

import { usePrefs } from '../../../i18n/Preferences';
import placeholder from '../../../assets/png/placeholder.png';
import './SingleProject.css';

function SingleProject({ id, name, desc, tags, code, demo, image, open, onToggle }) {
    const { t } = usePrefs();
    // works controlled (home page) or on its own (projects page)
    const [selfOpen, setSelfOpen] = useState(false);
    const isOpen = typeof open === 'boolean' ? open : selfOpen;
    const toggle = onToggle || (() => setSelfOpen(!selfOpen));
    const panelId = `project-panel-${id}`;

    return (
        <li className={`project${isOpen ? ' is-open' : ''}`}>
            <h3>
                <button className="project-toggle" aria-expanded={isOpen} aria-controls={panelId} onClick={toggle}>
                    <span className="project-name">{name}</span>
                    <span className="project-tags">{tags.join(', ')}</span>
                    <span className="project-sign" aria-hidden="true" />
                </button>
            </h3>

            <div className="project-panel" id={panelId} hidden={!isOpen}>
                <div className="project-media">
                    <img src={image ? image : placeholder} alt={t('projects.shot', { name })} loading="lazy" />
                </div>
                <div className="project-info">
                    <p>{desc}</p>
                    <ul className="project-chips">
                        {tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                    <p className="project-links">
                        {code && (
                            <a className="pen-link" href={code} target="_blank" rel="noreferrer">
                                {t('projects.code')}
                            </a>
                        )}
                        {demo && (
                            <a className="pen-link" href={demo} target="_blank" rel="noreferrer">
                                {t('projects.demo')}
                            </a>
                        )}
                    </p>
                </div>
            </div>
        </li>
    );
}

export default SingleProject;
