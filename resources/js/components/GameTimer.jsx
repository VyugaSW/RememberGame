import React from "react";
import pad from "../pad";

export default class GameTimer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hours: 0,
            minutes: this.props.minutes ?? 0,
            seconds: this.props.seconds ?? 0,
            timerId: '',
            isPaused: false,
            interval: ''
        }
    };

    startTimer = () => {
        const timing = () => {
            if(!this.state.isPaused && !this.props.isEnd)
            {
                if(this.state.seconds+1 >= 60){
                    this.setState({minutes:  this.state.minutes + ~~((this.state.seconds+1)/60)});
                    this.setState({seconds: (this.state.seconds+1)%60});
                }
                else
                    this.setState({seconds: this.state.seconds+1});
                if(this.state.minutes+1 > 60){
                    this.setState({hours:  this.state.hours+~~((this.state.minutes+1)/60)});
                    this.setState({minutes:  (this.state.minutes+1)%60});
                }
                this.props.onTime([this.state.minutes,this.state.seconds]);
            }
        }
        let interval = setInterval(timing, 1000);
        this.setState({interval: interval});
    }

    clearTimer = () => {
        this.setState({second: 0, minutes: 0, hours: 0});
    }

    stopTimer = () => {
        this.setState({isPaused: true});
    }

    continueTimer = () => {
        this.setState({isPaused: false});
    }

    componentDidMount(){
        this.startTimer();
    }

    render(){
        return (
            <>
                <button className="pause-btn" onClick={() => 
                    {
                        this.state.isPaused ? this.continueTimer() : this.stopTimer(); 
                        this.props.onPaused(this.state.isPaused)
                    }}>Pause</button>
                    
                <h3>Current time</h3>
                <div className="value">
                    {pad('0',this.state.minutes)}:{pad('0',this.state.seconds)}
                </div>
            </>
        );
    }

}