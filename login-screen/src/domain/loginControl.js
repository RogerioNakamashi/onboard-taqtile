import React, { Component } from 'react';
import {login} from '../data/requests.js';
import { Redirect } from 'react-router-dom';
import Validation from '../validation.js';
import Login from '../presentation/login.js';

class LoginControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailValid: false,
      passwordValid: false,
      formValid: false,
      authenticated: false,
      isLoading: false
    };
  }
 
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    this.validateForm();
  }   

  handleSubmit = event => {
    event.preventDefault();
    if(this.state.formValid){
      this.loginRequest(this.state.email, this.state.password);      
    };
  }

  validateForm = () => { 
    this.setState({
      emailValid: Validation.email(this.state.email),
      passwordValid: true,
      formValid: this.state.emailValid});
    }
  
  loginRequest = (email, password) => {
    this.setState({isLoading : true});
    login(email, password)
      .then(() => {
        this.setState({isLoading : false, authenticated : true});        
       })
      .catch(() => {
          console.log("erro na autenticação")
          this.setState({isLoading : false, authenticated : false})}
      );
  }

  navigateHome = (authenticated) => {
    if(authenticated){
      return <Redirect to="/home"/>;
    }
    else{
        return <div></div>
    }
  }
 
  render() {
    return ( 
            <div>
                {this.navigateHome(this.state.authenticated)}
                <Login
                    handleChange = {this.handleChange}
                    handleSubmit = {this.handleSubmit}
                    isLoading = {this.state.isLoading}>
                </Login>
            </div>
    );
  }
}


export default LoginControl;
