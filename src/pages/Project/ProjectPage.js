import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './ProjectPage.css';
import { SingleProject, Footer } from '../../components';
import Preferences from '../../components/Preferences/Preferences';
import { usePrefs } from '../../i18n/Preferences';
import { projectsData } from '../../data/projectsData';
import { headerData } from '../../data/headerData';

function ProjectPage() {
    const { t, pick } = usePrefs();
    const [search, setSearch] = useState('');

    const localized = projectsData.map((item) => pick(item, ['projects', item.id]));
    const filtered = localized.filter((project) => {
        const content = project.projectName + project.projectDesc + project.tags;
        return content.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className="subpage">
            <Helmet>
                <title>{`${headerData.name} | ${t('page.projects')}`}</title>
            </Helmet>

            <header className="wrap subpage-head">
                <div className="subpage-bar">
                    <Link to="/" className="pen-link">
                        {t('page.home', { name: headerData.name })}
                    </Link>
                    <Preferences />
                </div>
                <h1 className="subpage-title">{t('page.projects')}</h1>
                <label className="subpage-search">
                    <span className="visually-hidden">{t('page.searchProjects')}</span>
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t('page.searchProjects')}
                    />
                </label>
            </header>

            <main className="wrap subpage-body">
                {filtered.length > 0 ? (
                    <ul className="project-list">
                        {filtered.map((project) => (
                            <SingleProject
                                key={project.id}
                                id={project.id}
                                name={project.projectName}
                                desc={project.projectDesc}
                                tags={project.tags}
                                code={project.code}
                                demo={project.demo}
                                image={project.image}
                            />
                        ))}
                    </ul>
                ) : (
                    <p className="subpage-empty">
                        {t('page.noProject', { q: search })}
                    </p>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default ProjectPage;
