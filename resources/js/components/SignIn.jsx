import React from 'react';
import axios from 'axios';
import appPath from '../appPath';

export default class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loginEmail: '',
            password: '',
            isLoading: false,
            loginMsg: '',
            password: '',
            passwordMsg: '',
            msg: '',
            msgTo: '',
            redirect: ''
        }
    }

    loginOnChange = (event) =>{
        this.setState({loginEmail: event.target.value});
        if(event.target.value.length > 30 || event.target.value.length < 3 
            && !/^[a-zA-z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(event.target.value))
        {
            this.setState({loginEmailMsg: 'Login length must be between 3 and 30 letters or email can be wrong'})
            this.setState({msgTo: false});
        }
        else{
            this.setState({loginEmailMsg: ''})
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

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({isLoading: true});
        axios
        .post(appPath('api/user-signin'), 
            {
                loginEmail: this.state.loginEmail, 
                password: this.state.password,
                msgTo: this.state.msgTo
            })
        .then((response) => {
            this.setState({isLoading: false});
            this.setState({msg: response.data.message});
            setTimeout(() => {this.setState({msg: ''});},3500);
            if(response.data.status === 200){
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userData", JSON.stringify(response.data.data));
                this.setState({redirect: true});
            }
        });
    };

    render()
    {
        const isLoading = this.state.isLoading;
        const login = localStorage.getItem('isLoggedIn');
        if(login && !this.props.withoutReload){
             window.location.reload();
        }
        return (
            <div className="sign-container">
                <button className='close-btn' onClick={this.props.closeOnClick}>✖</button>
                <div className='form-container'>
                    <div className="form-group">
                        <div className="form-control">
                            <label htmlFor="login">Login or Email:</label>
                            <input type="text" name="login" onChange={this.loginOnChange} value={this.state.loginEmail}/>
                        </div>
                        <span className='input-error'>{this.state.loginEmailMsg}</span>
                    </div>
                    <div className="form-group">
                        <div className="form-control">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" onChange={this.passwordOnChange} value={this.state.password}/>
                        </div>
                        <span className='input-error'>{this.state.passwordMsg}</span>
                    </div>
                    <div className="flex">
                        <button className="form-btn" onClick={this.onSubmitHandler} {...this.state.disabled}>
                            Sign in 
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