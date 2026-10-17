import React from 'react';
import { Link } from 'react-router-dom';

import './Blog.css';
import SingleBlog from './SingleBlog/SingleBlog';
import { usePrefs } from '../../i18n/Preferences';
import { blogData } from '../../data/blogData';

function Blog() {
    const { t } = usePrefs();
    const posts = Array.isArray(blogData) ? blogData : [];
    if (!posts.length) return null;

    return (
        <section className="block blog" id="blog">
            <div className="wrap split">
                <h2 className="heading">{t('page.blog')}</h2>
                <div>
                    <ul className="post-list">
                        {posts
                            .slice(0, 3)
                            .reverse()
                            .map((blog) => (
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
                    {posts.length > 3 && (
                        <Link to="/blog" className="pen-link blog-more">
                            {t('blog.all', { n: posts.length })}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Blog;
