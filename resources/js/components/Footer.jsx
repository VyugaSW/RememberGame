import React from 'react';
import {Link} from 'react-router-dom'

export default function Footer(){
    return (
        <div className="footer">
            <div className="footer-container">
                <Link to="/" className='footer-ref'>Menu</Link>
                <Link to='/aboutus' className='footer-ref'>About us</Link>
                <Link to='/aboutproject' className='footer-ref'>About project</Link>
                <Link to='/howtoplay'className='footer-ref'>How to play?</Link>
                <Link to='/' className='footer-ref'>Login</Link>
                <Link to='/' className='footer-ref'>Registration</Link>
            </div>
        </div>
        
    );
}