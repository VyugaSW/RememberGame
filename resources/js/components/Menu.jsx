import React from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import GameOptions from './GameOptions';
import styles from '../../css/modal.css.js';

export default function MainMenu(props){
    const [isOpenModal, setIsOpenModal] = React.useState(false);

    styles.content.height="40%";
    styles.content.width="40%";

    return (
        <>
            <div className='menu-container'>
                <h1 className='title'>Remember game</h1>
                <div className="menu-option" onClick={() => {setIsOpenModal(true)}}>Play</div>
                <div className="menu-option">Records table</div>
                <Modal isOpen={isOpenModal} onRequestClose={() => {setIsOpenModal(false)}} style={styles} ariaHideApp={false}>
                    <GameOptions closeOnClick={() => {setIsOpenModal(false)}}></GameOptions>
                </Modal>
            </div>
        </>
    );
}