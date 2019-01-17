import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {login, login2} from './authentication.js';
import './login-screen.css';
import { Redirect } from 'react-router-dom';
class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailValid: false,
      passwordValid: false,
      formValid: false,
      authenticated: false,
      isLoading: false,
      emailError: "",
      passwordError: ""
    };
  }

  validateForm() {
    return this.state.emailValid && this.state.passwordValid;
  }
 
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    this.validateField();
  }

  handleSubmit = event => {
    console.log(this.state);
    event.preventDefault();
    this.verifyErrors();
    if(this.state.formValid){
      this.loginRequest(this.state.email, this.state.password);      
    }
  }

  verifyErrors(){
     if(!this.state.emailValid){
      this.setState({emailError : "invalid email"});
    }

    if(!this.state.passwordValid){
      this.setState({passworError : "invalid password"});
    }
  }
  validateField() {
    let email = this.state.email;
    //let password = this.state.password; 
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let emailError = this.state.emailError;
    let passwordError = this.state.passwordError;
    let formValid = true;

    if(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) == null){
      emailValid = false;
      console.log("email invalido")
    }else{
      emailValid = true;
      console.log("email valido")
    };
    passwordValid = true;

   
    this.setState({
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    emailError: emailError,
                    passwordError: passwordError,
                    formValid: emailValid //&& passworValid
                  });

  }
  
  loginRequest(email, password) {
    this.setState({isLoading : true})
    login2(email, password)
      .then(response => {
        console.log(response);
        localStorage.setItem("name",response.data.user.name);
        localStorage.setItem("token",response.data.token);
        this.setState({authenticated : true, isLoading : false});  
      })
      .catch(error => {
        console.log(error);
        this.setState({authenticated : false, isLoading : false});  
      });
  }
  
  render() {
    
    let redirect = null;
    if(this.state.authenticated){
      localStorage.setItem("email",this.state.email);
      localStorage.setItem("password",this.state.password);
      redirect = <Redirect to="/home"/>;
    }     
    return (
      
      <div className="Login">
        {redirect}  
        <h1>Sign in</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              value={this.state.email}
              onChange={this.handleChange}
            />            
            <div className="EmailError">{this.state.emailError}</div>            
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
            <div >{this.state.passwordError}</div>
          </FormGroup>
          <Button
            block
            bsSize="large"
            bsStyle="primary"
            disabled={this.state.isLoading}
            type="submit"
          >
          {this.state.isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    );
  }
}


export default LoginScreen;
