import React from 'react';
import { Helmet } from 'react-helmet';

import { Navbar, Footer, Landing, About, Skills, Education, Experience, Contacts, Projects, Achievement } from '../../components';
import { headerData } from '../../data/headerData';
import { usePrefs } from '../../i18n/Preferences';

function Main() {
    const { pick } = usePrefs();
    return (
        <>
            <Helmet>
                <title>{`${headerData.name} — ${pick(headerData, ['header']).title}`}</title>
            </Helmet>

            <Navbar />
            <main>
                <Landing />
                <About />
                <Skills />
                <Education />
                <Experience />
                <Projects />
                <Achievement />
                <Contacts />
            </main>
            <Footer />
        </>
    );
}

export default Main;
