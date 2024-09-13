import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getTypes from "../getTypes";


export default function GameOptions(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        if(!types.length)
            getTypes(setTypes, setIsLoading);
    }, [])

    return(
        <div className="options-container">
            <div className="title">Choose the game type</div>
            {isLoading ? 
            <div className="spinner"></div> 
            : 
            <>
                <button className='close-btn' onClick={props.closeOnClick}>✖</button>
                {types.map((type) => { return (<Link key={type} className="game-option" to={`game/cards${type}`}>{type} cards</Link>);})}
            </>
            }
        </div>
    );
}
