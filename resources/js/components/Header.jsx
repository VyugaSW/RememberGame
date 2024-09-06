import React, {useState} from 'react';
import Modal from 'react-modal';
import Registration from './SignUp.jsx';
import SignIn from './SignIn.jsx';
import { NavLink, Link } from 'react-router-dom';

import styles from '../../css/modal.css.js';

export default function Header(props){
    const [modalSingUpIsOpen, setModalSingUpIsOpen] = useState(false);
    const [modalSingInIsOpen, setModalSingInIsOpen] = useState(false);
    const isLogged = localStorage.getItem('isLoggedIn');

    const openModalSignIn = () => {
        setModalSingInIsOpen(true);
        styles.content.height = '63%';
        styles.content.width = '60%';
    };
    
    const closeModalSignIn = () => {
        setModalSingInIsOpen(false);
    };

    const openModalSignUp = () => {
        setModalSingUpIsOpen(true);
        styles.content.height = '88%';
        styles.content.width = '60%';
    };
    
    const closeModalSignUp = () => {
        setModalSingUpIsOpen(false);
    };

    const modalSignUpContent=(
        <Registration closeOnClick={closeModalSignUp} signInAfter={false}></Registration>
    );
    const modalSignInContent=(
        <SignIn closeOnClick={closeModalSignIn}></SignIn>
    );

    const unLogin = () => {
        localStorage.setItem('isLoggedIn', '');
        window.location.reload();
    }

    return (
        <div className="header-container">
                <ul className='header-menu'>
                    <Link className='header-option' to="/">Menu</Link>
                    <hr className='line'/>
                    <Link className='header-option' to="/aboutproject">About project</Link>
                    <Link className='header-option' to="/aboutus">About us</Link>
                    <Link className='header-option' to="/howtoplay" >How to play?</Link>
                </ul>
            <div className='user-info'>
                {isLogged ? 
                <> 
                    <div className='header-option-disabled'>Welcome, {JSON.parse(localStorage.getItem('userData')).login}</div>
                    <hr className='line'/>
                    <div className='login-btn header-option' onClick={unLogin}>Unlogin</div>
                </>
                : 
                <>
                    <div className='login-btn header-option' onClick={openModalSignIn}>Login</div>
                    <hr className='line'/>
                    <div className='register-btn header-option' onClick={openModalSignUp}>Registration</div>
                </>
                }
            </div>
            <Modal isOpen={modalSingUpIsOpen} onRequestClose={closeModalSignUp} style={styles} ariaHideApp={false}>
                {modalSignUpContent}
            </Modal>
            <Modal isOpen={modalSingInIsOpen} onRequestClose={closeModalSignIn} style={styles} ariaHideApp={false}>
                {modalSignInContent}
            </Modal>
        </div>
    );
}