import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import '../Project/ProjectPage.css';
import { SingleBlog, Footer } from '../../components';
import Preferences from '../../components/Preferences/Preferences';
import { usePrefs } from '../../i18n/Preferences';
import { blogData } from '../../data/blogData';
import { headerData } from '../../data/headerData';

function BlogPage() {
    const { t } = usePrefs();
    const [search, setSearch] = useState('');
    const posts = Array.isArray(blogData) ? blogData : [];

    const filtered = posts
        .filter((blog) => (blog.title + blog.description + blog.date).toLowerCase().includes(search.toLowerCase()))
        .reverse();

    return (
        <div className="subpage">
            <Helmet>
                <title>{`${headerData.name} | ${t('page.blog')}`}</title>
            </Helmet>

            <header className="wrap subpage-head">
                <div className="subpage-bar">
                    <Link to="/" className="pen-link">
                        {t('page.home', { name: headerData.name })}
                    </Link>
                    <Preferences />
                </div>
                <h1 className="subpage-title">{t('page.blog')}</h1>
                {posts.length > 0 && (
                    <label className="subpage-search">
                        <span className="visually-hidden">{t('page.searchPosts')}</span>
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={t('page.searchPosts')}
                        />
                    </label>
                )}
            </header>

            <main className="wrap subpage-body">
                {filtered.length > 0 ? (
                    <ul className="post-list">
                        {filtered.map((blog) => (
                            <SingleBlog
                                key={blog.id}
                                id={blog.id}
                                title={blog.title}
                                desc={blog.description}
                                date={blog.date}
                                image={blog.image}
                                url={blog.url}
                            />
                        ))}
                    </ul>
                ) : (
                    <p className="subpage-empty">
                        {posts.length ? t('page.noPost', { q: search }) : t('page.noPosts')}
                    </p>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default BlogPage;
