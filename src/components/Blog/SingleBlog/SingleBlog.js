import React from 'react';

import './SingleBlog.css';

function SingleBlog({ title, desc, date, url, id }) {
    return (
        <li key={id} className="post">
            <a href={url} target="_blank" rel="noreferrer">
                <span className="post-date">{date}</span>
                <span className="post-title">{title}</span>
                <span className="post-desc">{desc}</span>
            </a>
        </li>
    );
}

export default SingleBlog;
