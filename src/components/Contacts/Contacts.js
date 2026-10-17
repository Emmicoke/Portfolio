import React from 'react';
import {
    FaLinkedinIn,
    FaGithub,
    FaInstagram,
    FaMediumM,
} from 'react-icons/fa';
import { FiPhone, FiAtSign } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { socialsData } from '../../data/socialsData';
import { contactsData } from '../../data/contactsData';
import './Contacts.css';

function Contacts() {
    return (
        <section className='contacts section' id='contacts'>
            <div className='wrap'>
                <div className='section-head'>
                    <div>
                        <p className='kicker'>Get in touch</p>
                        <h2>Contact</h2>
                    </div>
                </div>

                <div className='contacts-body'>
                    <a href={`mailto:${contactsData.email}`} className='personal-details'>
                        <span className='details-icon'><FiAtSign /></span>
                        <div>
                            <small>Email</small>
                            <p>{contactsData.email}</p>
                        </div>
                    </a>
                    <a href={`tel:${contactsData.phone}`} className='personal-details'>
                        <span className='details-icon'><FiPhone /></span>
                        <div>
                            <small>Phone</small>
                            <p>{contactsData.phone}</p>
                        </div>
                    </a>
                    <div className='personal-details'>
                        <span className='details-icon'><HiOutlineLocationMarker /></span>
                        <div>
                            <small>Location</small>
                            <p>{contactsData.address}</p>
                        </div>
                    </div>

                    <div className='socialmedia-icons'>
                        {socialsData.github && (
                            <a href={socialsData.github} target='_blank' rel='noreferrer' aria-label='GitHub'>
                                <FaGithub />
                            </a>
                        )}
                        {socialsData.linkedIn && (
                            <a href={socialsData.linkedIn} target='_blank' rel='noreferrer' aria-label='LinkedIn'>
                                <FaLinkedinIn />
                            </a>
                        )}
                        {socialsData.instagram && (
                            <a href={socialsData.instagram} target='_blank' rel='noreferrer' aria-label='Instagram'>
                                <FaInstagram />
                            </a>
                        )}
                        {socialsData.medium && (
                            <a href={socialsData.medium} target='_blank' rel='noreferrer' aria-label='Medium'>
                                <FaMediumM />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contacts;
