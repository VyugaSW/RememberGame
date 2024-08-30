import React, {useEffect, useRef, useState} from "react";
import GameTimer from "./Timer";
import Card from "./Card";
import Modal from 'react-modal';
import styles,{stylesResult, stylesSignUp} from '../../css/modal.css.js';
import uniqueCardsArray, {shuffleCards} from './CardsArray.jsx';
import { Link } from "react-router-dom";
import axios from "axios";
import Registration from "./SignUp.jsx";
import appPath from "../appPath.js";
import SignIn from "./SignIn.jsx";

const saveResult = (usid, typeid, mins, secs, scor, setMessage = null) => {
  console.log(usid,typeid,mins,secs,scor);
  axios
  .post(appPath('api/saverecord'), 
    {
      userid: usid, 
      typegameid: typeid,
      minutes: mins, 
      seconds: secs, 
      scores: scor
    })
  .then((response) => {
    if(setMessage != null)
      setMessage(response.data.message)
    return response.data.status;
  });
}

export default function Game(props) {
    const [cards, setCards] = useState(() => {
      let array = uniqueCardsArray;
      switch(props.type){
        case '8':
            array = array.slice(12)
            break;
        case '16':
            array = array.slice(8);
            break;
        case '32':
            array = array.slice(0);
            break;
      }
      return shuffleCards(array.concat(array));
    });

    const [isPaused, setIsPaused] = useState(false);
    const [openCards, setOpenCards] = useState([]);
    const [clearedCards, setClearedCards] = useState({});
    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
    const [moves, setMoves] = useState(0);
    const [isOpenModalResults, setIsOpenModalResults] = useState(false);
    const [isOpenModalSignUp, setisOpenModalSignUp] = useState(false);
    const [isOpenModalSignIn, setisOpenModalSignIn] = useState(false);
    const [time, setTime] = useState([]);
    const [isEnd, setIsEnd] = useState(false);
    const [score, setScore] = useState(2000);
    const timeout = useRef(null);
    const [resMsg, setResMsg] = useState('');
    const [typeId, setTypeId] = useState(null);

    const disable = () => {
      setShouldDisableAllCards(true);
    };

    const enable = () => {
      setShouldDisableAllCards(false);
    };
  
    const evaluate = () => {
      const [first, second] = openCards;
      enable();
      if (cards[first].type === cards[second].type) {
        setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
        setOpenCards([]);
        return;
      }
      timeout.current = setTimeout(() => {
        setOpenCards([]);
      }, 500);
    };

    const handleCardClick = (index) => {
      if (openCards.length === 1) {
        setOpenCards((prev) => [...prev, index]);
        setMoves((moves) => moves + 1);
        disable();
      } else {
        clearTimeout(timeout.current);
        setOpenCards([index]);
      }
    };

    const getTypeId = () => {
      axios
      .get(appPath('api/getgametypeid?type='+props.type))
      .then((response) => {
        if(response.data.success)
          setTypeId(response.data.data);
      })
    }

    useEffect(() => { if(typeId === null) getTypeId()},[]);

    useEffect(() => {
      let timeout = null;
      if (openCards.length === 2) {
        timeout = setTimeout(evaluate, 300);
      }
      return () => {
        clearTimeout(timeout);
      };
    }, [openCards]);

    useEffect(()=>{
      if(Object.keys(clearedCards).length === cards.length/2){
        setIsEnd(true);
        setTimeout(() => {setIsOpenModalResults(true)},600);
      }
    },[clearedCards]);

    const checkIsFlipped = (index) => {
      return openCards.includes(index);
    };
  
    const checkIsInactive = (card) => {
      return Boolean(clearedCards[card.type]);
    };

    const fieldType = () =>{
        switch(props.type){
            case '8':
                return 'game-field-8';
                break;
            case '16':
                return 'game-field-16';
                break;
            case '32':
                return 'game-field-32';
                break;
        }
    }
  
    const modalResultsContent = (
      <div className="result-container">
        <h2 className="title">Your results</h2>
        <div className="result-info">
          <div className="label">Time:</div>
          <div className="value">{time[0]}:{time[1]}</div>
        </div>
        <div className="result-info">
          <div className="label">Score:</div>
          <div className="value">{score}</div>
        </div>
        <div className="result-info">
          <div className="label">High score:</div>
          <div className="value">5000</div>
        </div>
        {score > 5000 ? 
          <div className='result-info'>
              <div className="label">You have set a new record!</div>
          </div>
          :
          <></>
        }
        {localStorage.getItem('isLoggedIn') ?
          <button className="result-save-btn"
            onClick={() => 
              {
                saveResult(JSON.parse(localStorage.getItem('userData')).id, typeId, time[0],time[1],score, setResMsg);
                setTimeout(() => {window.location.href = '/'}, 3000);
              }}
          >
            Save
          </button>
        :
          <>
            <div className="message">You are not logged {':('} <br /> Sign in and you can save your record!</div>
            <button className="result-save-btn" onClick={() => {setisOpenModalSignUp(true)}}>Sign up and save</button>
            <button className="result-save-btn" onClick={() => {setisOpenModalSignIn(true)}}>Sign in and save</button>
          </>
        }
        <Link className="result-save-btn" to='/'>Menu</Link>
        <div className="result-info">
          <div className="res-msg" style={{fontWeight: 'bold'}}>{resMsg}</div>
        </div>
      </div>
    );

    return (
        <>
          <div className="game-container">
              <div className="game-info">
                  <div className="time game-info__el">
                      <GameTimer 
                      onTime={(time) => {setTime(time)}} 
                      onPaused={(val) => {setIsPaused(val); props.onPaused(!val); setShouldDisableAllCards(!val);}}
                      isEnd={isEnd}/>
                  </div>
                  <div className="score game-info__el">
                      <h3>Current score</h3>
                      <div className="value">{score}</div>
                  </div>
                  <div className="high-score game-info__el">
                      <h3>High score</h3>
                      <div className="value">7089</div>
                  </div>
              </div>
              <div className="game-field-container">
                {!isEnd ? 
                  <div className={fieldType()}>
                    {cards.map( (card,index) => 
                    <Card 
                        key={index} 
                        card={card} 
                        index={index} 
                        isInactive={checkIsInactive(card)}
                        isFlipped={checkIsFlipped(index)}
                        isDisabled={shouldDisableAllCards}
                        onClick={handleCardClick}/>
                    )}      
                  </div>
                : <button onClick={() => setIsOpenModalResults(true)} className="result-btn">Results</button>}
              </div>
          </div>
          <Modal isOpen={isOpenModalResults} onRequestClose={() => {setIsOpenModalResults(false)}} style={stylesResult} ariaHideApp={false}>
            {modalResultsContent}
          </Modal>
          <Modal isOpen={isOpenModalSignUp} onRequestClose={() => {setisOpenModalSignUp(false)}} style={stylesSignUp} ariaHideApp={false}>
            <Registration closeOnClick={() => {setisOpenModalSignUp(false)}} signInAfter={true} ></Registration>
          </Modal>
          <Modal isOpen={isOpenModalSignIn} onRequestClose={() => {setisOpenModalSignIn(false)}} style={styles} ariaHideApp={false}>
            <SignIn closeOnClick={() => {setisOpenModalSignIn(false)}} withoutReload={true} ></SignIn>
          </Modal>
        </>
    );
  }