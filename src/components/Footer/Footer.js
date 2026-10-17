import React from 'react'
import './Footer.css'
import { headerData } from '../../data/headerData'

function Footer() {
    return (
        <footer className="footer">
            <div className="wrap footer-inner">
                <p>{headerData.name}</p>
                <p className="muted">{headerData.title}</p>
            </div>
        </footer>
    )
}

export default Footer
