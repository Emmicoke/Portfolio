import React from 'react';

import './Skills.css'

import { skillsData } from '../../data/skillsData'
import { skillsImage } from '../../utils/skillsImage'

function Skills() {
    return (
        <section id="skills" className="skills section">
            <div className="wrap">
                <div className="section-head">
                    <div>
                        <p className="kicker">Toolkit</p>
                        <h2>Skills</h2>
                    </div>
                </div>

                <ul className="skills-grid">
                    {skillsData.map((skill, id) => (
                        <li className="skill--box" key={id}>
                            <img src={skillsImage(skill)} alt={skill} />
                            <h3>{skill}</h3>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Skills
