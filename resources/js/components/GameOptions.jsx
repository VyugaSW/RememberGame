import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import appPath from "../appPath";
export default class GameOptions extends React.Component{
    constructor(props){
        super(props);
        this.state = { isLoading: true, types: [], isDataGotten: false};
    }

    getTypes = () => {
        let tempTypes = [];
        if(!this.state.isDataGotten){
            axios
            .get(appPath('api/gettypes'))
            .then((response) => {
                this.setState({isLoading: false, isDataGotten: true});
                response.data.data.forEach((type) => {tempTypes.push(type.type)});
                this.setState({types: tempTypes});
            })
        }
    }

    render()
    {
        this.getTypes();
        return(
            <div className="options-container">
                <div className="title">Choose the game type</div>
                {this.state.isLoading ? 
                <div className="spinner"></div> 
                : 
                <>
                    <button className='close-btn-opt' onClick={this.props.closeOnClick}>✖</button>
                    {this.state.types.map((type) => { return (<Link key={type} className="game-option" to={`game/cards${type}`}>{type} cards</Link>);})}
                </>
                }
            </div>
        );
    }
}