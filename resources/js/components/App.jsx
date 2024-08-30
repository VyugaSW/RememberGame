import React, {Component } from 'react';
import {useRoutes, Outlet} from 'react-router-dom';

import MainMenu from './Menu.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import AboutProject from './AboutProject.jsx';
import AboutUs from './AboutUs.jsx';
import HowToPlay from './HowToPlay.jsx';
import Game from './Game.jsx';

function AppRoutes(props){
    const element = useRoutes([
        {path: "/", element: <MainMenu/>},
        {path: "/aboutproject", element: <AboutProject/>},
        {path: "/aboutus", element: <AboutUs/>},
        {path: "/howtoplay", element: <HowToPlay/>},
        {path: "/game/", 
            children: [
                {path: 'cards8', element: <Game type="8" onPaused={props.onPaused}/>},
                {path: 'cards16', element: <Game type="16" onPaused={props.onPaused}/>},
                {path: 'cards32', element: <Game type="32" onPaused={props.onPaused}/>},
        ]},
    ]);
    return element;
}

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            isPaused: false,
            isLoading: true
        }
    }


    componentDidMount(){
        window.onload = () => {this.setState({isLoading: false})};
    }
    render(){
        const login = localStorage.getItem('isLoggedIn');
        return (
            <>  
                <Header></Header> 
                <div className="m-bk">
                    <div className={'snow' + ' ' + (!this.state.isPaused ? 'snow-animation' : '')}>
                        <div></div>
                    </div>
                    {this.state.isLoading ? (<div className='spinner-big'/>) : <AppRoutes onPaused={(value) => {this.setState({isPaused: value})}}></AppRoutes>  }
                </div>
                <Footer></Footer>
            </>
        );
    }
}