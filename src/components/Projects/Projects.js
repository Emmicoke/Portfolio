import React from 'react';
import { Link } from 'react-router-dom'
import { HiArrowRight } from "react-icons/hi";

import { projectsData } from '../../data/projectsData'

import './Projects.css'
import SingleProject from './SingleProject/SingleProject';

function Projects() {
    return (
        <>
            {projectsData.length > 0 && (
                <section className="projects section" id="projects">
                    <div className="wrap">
                        <div className="section-head">
                            <div>
                                <p className="kicker">Selected work</p>
                                <h2>Projects</h2>
                            </div>
                            {projectsData.length > 3 && (
                                <Link to="/projects" className="projects--viewAll">
                                    View all
                                    <HiArrowRight />
                                </Link>
                            )}
                        </div>

                        <div className="projects--bodyContainer">
                            {projectsData.slice(0, 4).map(project => (
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
                </section>
            )}
        </>
    )
}

export default Projects
