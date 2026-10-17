import React from 'react'
import { Helmet } from 'react-helmet'

import { Navbar, Footer, Landing, About, Skills, Education, Experience, Contacts, Projects, Achievement } from '../../components'
import { headerData } from '../../data/headerData'

function Main() {
    return (
        <div>
            <Helmet>
                <title>{headerData.name} — {headerData.title}</title>
            </Helmet>

            <Navbar />
            <Landing />
            <About />
            <Skills />
            <Education />
            <Experience />
            <Projects />
            <Achievement />
            <Contacts />
            <Footer />
        </div>
    )
}

export default Main
