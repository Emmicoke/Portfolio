import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Projects.css';
import SingleProject from './SingleProject/SingleProject';
import { usePrefs } from '../../i18n/Preferences';
import { projectsData } from '../../data/projectsData';

const SHOWN = 4;

function Projects() {
    const { t, pick } = usePrefs();
    const [openId, setOpenId] = useState(projectsData[0] && projectsData[0].id);

    if (!projectsData.length) return null;

    return (
        <section className="block projects" id="projects">
            <div className="wrap split">
                <h2 className="heading">
                    {t('projects.title')}
                    <small>{t('projects.note')}</small>
                </h2>

                <div>
                    <ul className="project-list">
                        {projectsData.slice(0, SHOWN).map((item) => {
                            const project = pick(item, ['projects', item.id]);
                            return (
                            <SingleProject
                                key={project.id}
                                id={project.id}
                                name={project.projectName}
                                desc={project.projectDesc}
                                tags={project.tags}
                                code={project.code}
                                demo={project.demo}
                                image={project.image}
                                open={openId === project.id}
                                onToggle={() => setOpenId(openId === project.id ? null : project.id)}
                            />
                            );
                        })}
                    </ul>

                    {projectsData.length > SHOWN && (
                        <Link to="/projects" className="pen-link projects-more">
                            {t('projects.all', { n: projectsData.length })}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Projects;
