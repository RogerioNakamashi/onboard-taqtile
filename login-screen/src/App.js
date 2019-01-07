import React, { Component } from 'react';
import './App.css';
import NameForm from './forms/nameForm'
import EmailForm from './forms/emailForm'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailValid: false,
      passwordValid: false,
      formValid: false,
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
  }

  validateField() {
    let email = this.state.email;
    let password = this.state.password; 
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let emailError = this.state.emailError;
    let passwordError = this.state.passwordError;
    emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    passwordValid = password.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

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
                    passwordError: passwordError
                  });
  }
  
  //validateForm() {
  //  this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  //}

  render() {
    return (
      <div className="Login">
        
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            
            <div>{this.state.emailError}</div>
            
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
            //disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}


export default App;