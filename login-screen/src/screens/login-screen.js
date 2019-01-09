import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import login from './authentication.js';
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
  }

  handleSubmit = event => {
    event.preventDefault();
    this.validateField();
    if(this.state.formValid){
      this.loginRequest(this.state.email, this.state.password);
      
    }
  }

  validateField() {
    let email = this.state.email;
    //let password = this.state.password; 
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let emailError = this.state.emailError;
    let passwordError = this.state.passwordError;
    emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    passwordValid = true;
    //passwordValid = password.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    if(emailValid){
      emailError = "";
    }
    else{
      emailError = "email inválido"
    }

    if(passwordValid){
      passwordError = "";
    }
    else{
      passwordError = "password inválido"
    }
    this.setState({
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    emailError: emailError,
                    passwordError: passwordError,
                    formValid: emailValid && passwordValid
                  });
  }
  
  //validateForm() {
  //  this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  //}

  loginRequest(email, password) {
    this.setState({isLoading : true})
    login(email, password)
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
      redirect = <Redirect to="/welcome"/>;
    }     
    return (
      
      <div className="Login">
        {redirect}  
  
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
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
            <div>{this.state.passwordError}</div>
          </FormGroup>
          <Button
            block
            bsSize="large"
            bsStyle="primary"
            disabled={this.state.isLoading}
            type="submit"
          >
          {this.state.isLoading ? "loading..." : "Login"}
          </Button>
        </form>
      </div>
    );
  }
}


export default LoginScreen;
