import React from "react";


export default class GameTimer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hours: 0,
            minutes: 0,
            seconds: 0,
            timerId: '',
            isPaused: false,
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
        setInterval(timing, 1000);
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

    pad = (str,n) => (str+n).slice(-2);

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
                    {this.pad('0',this.state.minutes)}:{this.pad('0',this.state.seconds)}
                </div>
            </>
        );
    }

}