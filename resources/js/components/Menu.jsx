import React from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import GameOptions from './GameOptions';
import styles from '../../css/modal.css.js';
import RecordsTable from './RecordsTable.jsx';


export default function MainMenu(props){
    const [isOpenModalGame, setIsOpenModalGame] = React.useState(false);
    const [isOpenModalTables, setIsOpenModalTables] = React.useState(false);

    return (
        <>
            <div className='menu-container'>
                <h1 className='title'>Remember game</h1>
                <div className="menu-option" onClick={() => {setIsOpenModalGame(true); styles.content.height="40%"; styles.content.width="40%";}}>Play</div>
                <div className="menu-option" onClick={() => {setIsOpenModalTables(true); styles.content.height="80%"; styles.content.width="80%";}}>Records table</div>
                
                <Modal isOpen={isOpenModalGame} onRequestClose={() => {setIsOpenModalGame(false)}} style={styles} ariaHideApp={false}>
                    <GameOptions closeOnClick={() => {setIsOpenModalGame(false)}}></GameOptions>
                </Modal>
                <Modal isOpen={isOpenModalTables} onRequestClose={() => {setIsOpenModalTables(false)}} style={styles} ariaHideApp={false}>
                    <RecordsTable closeOnClick={() => {setIsOpenModalTables(false)}}></RecordsTable>
                </Modal>
            </div>
        </>
    );
}