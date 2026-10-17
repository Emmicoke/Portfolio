import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

import './BackToTop.css';

function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisible = () => {
            setVisible(document.documentElement.scrollTop > 300);
        };

        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!visible) return null;

    return (
        <div className='backToTop'>
            <button onClick={scrollToTop} aria-label='Back to top'>
                <IoIosArrowUp />
            </button>
        </div>
    );
}

export default BackToTop;
