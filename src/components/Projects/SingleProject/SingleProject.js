import React from 'react';
import { FaPlay, FaCode } from 'react-icons/fa';

import placeholder from '../../../assets/png/placeholder.png';
import './SingleProject.css';

function SingleProject({ id, name, desc, tags, code, demo, image }) {
    return (
        <article key={id} className='singleProject'>
            <div className='project-media'>
                <img src={image ? image : placeholder} alt={name} />
            </div>
            <div className='project-body'>
                <div className='project-top'>
                    <h2 id={name.replace(' ', '-').toLowerCase()}>{name}</h2>
                    <div className='project--showcaseBtn'>
                        {demo && (
                            <a
                                href={demo}
                                target='_blank'
                                rel='noreferrer'
                                aria-label={`${name} demo`}
                            >
                                <FaPlay />
                            </a>
                        )}
                        {code && (
                            <a
                                href={code}
                                target='_blank'
                                rel='noreferrer'
                                aria-label={`${name} code`}
                            >
                                <FaCode />
                            </a>
                        )}
                    </div>
                </div>
                <p className='project--desc'>{desc}</p>
                <div className='project--lang'>
                    {tags.map((tag, tagId) => (
                        <span key={tagId}>{tag}</span>
                    ))}
                </div>
            </div>
        </article>
    );
}

export default SingleProject;
