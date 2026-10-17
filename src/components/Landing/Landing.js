import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

import './Landing.css';
import { headerData } from '../../data/headerData';
import { socialsData } from '../../data/socialsData';
import { contactsData } from '../../data/contactsData';

function Landing() {
    return (
        <section className='landing' id='home'>
            <div className='wrap landing--grid'>
                <div className='landing--copy'>
                    <p className='kicker'>{headerData.title}</p>
                    <h1>
                        {headerData.name.split(' ').slice(0, 2).join(' ')}
                        <em> {headerData.name.split(' ').slice(2).join(' ')}</em>
                    </h1>
                    <p className='landing--lead'>{headerData.desciption}</p>

                    <div className='landing--actions'>
                        {headerData.resumePdf && (
                            <a
                                href={headerData.resumePdf}
                                download='resume'
                                target='_blank'
                                rel='noreferrer'
                                className='btn btn-fill'
                            >
                                Download CV
                            </a>
                        )}
                        <NavLink to='/#contacts' smooth={true} duration={600} className='btn btn-ghost'>
                            Contact
                        </NavLink>
                    </div>

                    <div className='landing--socials'>
                        {socialsData.linkedIn && (
                            <a href={socialsData.linkedIn} target='_blank' rel='noreferrer' aria-label='LinkedIn'>
                                <FaLinkedin />
                            </a>
                        )}
                        {socialsData.github && (
                            <a href={socialsData.github} target='_blank' rel='noreferrer' aria-label='GitHub'>
                                <FaGithub />
                            </a>
                        )}
                        {socialsData.instagram && (
                            <a href={socialsData.instagram} target='_blank' rel='noreferrer' aria-label='Instagram'>
                                <FaInstagram />
                            </a>
                        )}
                    </div>
                </div>

                <div className='landing--portrait'>
                    <div className='landing--frame'>
                        <img src={headerData.image} alt={headerData.name} />
                    </div>
                    <div className='landing--meta'>
                        <span>{contactsData.address}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Landing;
