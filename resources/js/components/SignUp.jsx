import React from 'react';
import axios from 'axios';
import appPath from '../appPath';

export default class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            login: '',
            password: '',
            email: '',
            isLoading: false,
            loginMsg: '',
            password: '',
            passwordMsg: '',
            repeatPassword: '',
            emailMsg: '',
            msg: '',
            msgTo: ''
        }
    }


    loginOnChange = (event) =>{
        this.setState({login: event.target.value});
        if(event.target.value.length > 30 || event.target.value.length < 3){
            this.setState({loginMsg: 'Login length must be between 3 and 30 letters'})
            this.setState({msgTo: false});
        }
        else{
            this.setState({loginMsg: ''})
            this.setState({msgTo: true});
        }
    }

    passwordOnChange = (event) => {
        this.setState({password: event.target.value});
        if(event.target.value.length > 30 || event.target.value.length < 5){
            this.setState({passwordMsg: 'Password length must be between 5 and 30 letters'});
            this.setState({msgTo: false});
        }
        else{
            this.setState({passwordMsg: ''});
            this.setState({msgTo: true});
        }
    }

    repeatPasswordOnChange = (event) => {
        this.setState({repeatPassword: event.target.value});
        if(event.target.value != this.state.password){
            this.setState({passwordMsg: 'Passwords must be equal'})
            this.setState({msgTo: false});
        }   
        else{
            this.setState({passwordMsg: ''});
            this.setState({msgTo: true});
        }
    }

    emailOnChange = (event) => {
        this.setState({email: event.target.value});
        if(!/^[a-zA-z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(event.target.value)){
            this.setState({emailMsg: 'Email is wrong'});
            this.setState({msgTo: false});
        }
        else{
            this.setState({emailMsg: ''});
            this.setState({msgTo: true});
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({isLoading: true});
        axios
        .post(appPath('api/user-signup'), 
            {
                msgTo: this.state.msgTo, 
                login: this.state.login, 
                password: this.state.password, 
                email: this.state.email
            })
        .then((response) => {
            this.setState({isLoading: false});
            this.setState({msg: response.data.message});

            if(this.props.signInAfter){
                this.setState({isLoading: true});
                axios
                .post(appPath('api/user-signin'), 
                    {
                        loginEmail: this.state.login, 
                        password: this.state.password,
                        msgTo: this.state.msgTo
                    })
                .then((response) => {
                    this.setState({isLoading: false});
                    this.setState({msg: response.data.message});
                    setTimeout(() => {this.setState({msg: ''});},2500);
                    if(response.data.status === 200){
                        setTimeout(() => {this.props.closeOnClick()},2500);
                        localStorage.setItem("isLoggedIn", true);
                        localStorage.setItem("userData", JSON.stringify(response.data.data));
                    }
                });
            }
            else
                setTimeout(() => {this.setState({msg: ''});},3500);
        });
    };

    render()
    {
        const isLoading = this.state.isLoading;
        // const login = localStorage.getItem('isLoggedIn');
        // if(login){
        //      window.location.reload();
        // }
        return (
            <div className="sign-container">
                <button className='close-btn' onClick={this.props.closeOnClick}>✖</button>
                <div className='form-container'>
                    <div className="form-group">
                        <div className="form-control">
                            <label htmlFor="login">Login:</label>
                            <input type="text" name="login" onChange={this.loginOnChange} value={this.state.login}/>
                        </div>
                        <span className='input-error'>{this.state.loginMsg}</span>
                    </div>
                    <div className="form-group">
                        <div className="form-control">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" onChange={this.passwordOnChange} value={this.state.password}/>
                        </div>
                        <span className='input-error'>{this.state.passwordMsg}</span>
                    </div>
                    <div className="form-group">
                        <div className="form-control">
                            <label htmlFor="rep-password">Repeat password:</label>
                            <input type="password" name="rep-password" onChange={this.repeatPasswordOnChange} value={this.state.repeatPassword}/>
                        </div>
                        <span className='input-error'>{this.state.passwordMsg}</span>
                    </div>
                    <div className="form-group">
                        <div className="form-control">
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" onChange={this.emailOnChange} value={this.state.email}/>
                        </div>
                        <span className='input-error'>{this.state.emailMsg}</span>
                    </div>
                    <div className="flex">
                        <button className="form-btn" onClick={this.onSubmitHandler} {...this.state.disabled}>
                            {this.props.signInAfter ? 'Sign up and in' : 'Sign up'} 
                        </button>
                        {isLoading ? 
                            ( <div className="spinner icon-spinner-5" aria-hidden="true"></div>) 
                                : 
                            ( <span></span> )
                        }
                    </div>
                    <div className="message">
                        {this.state.msg}
                    </div>
                </div>
            </div>
        );
    }
}