import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { AiOutlineHome } from "react-icons/ai";

import './ProjectPage.css'
import { SingleProject } from '../../components';
import { projectsData } from '../../data/projectsData'
import { headerData } from '../../data/headerData'

function ProjectPage() {
    const [search, setSearch] = useState('')

    const filteredArticles = projectsData.filter((project) => {
        const content = project.projectName + project.projectDesc + project.tags
        return content.toLowerCase().includes(search.toLowerCase())
    })

    return (
        <div className="projectPage">
            <Helmet>
                <title>{headerData.name} | Projects</title>
            </Helmet>
            <div className="projectPage-header">
                <div className="wrap projectPage-header-inner">
                    <Link to="/" className="projectPage-home" aria-label="Home">
                        <AiOutlineHome />
                    </Link>
                    <div>
                        <p className="kicker">Archive</p>
                        <h1>Projects</h1>
                    </div>
                </div>
            </div>
            <div className="wrap projectPage-container">
                <div className="projectPage-search">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search project..."
                    />
                </div>
                <div className="project-container">
                    {filteredArticles.map(project => (
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
                </div>
            </div>
        </div>
    )
}

export default ProjectPage
