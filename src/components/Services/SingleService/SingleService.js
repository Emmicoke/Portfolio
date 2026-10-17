import React from 'react';

import './SingleService.css';

function SingleService({ id, title, icon }) {
    return (
        <li key={id} className="service">
            <span className="service-icon" aria-hidden="true">
                {icon}
            </span>
            {title}
        </li>
    );
}

export default SingleService;
