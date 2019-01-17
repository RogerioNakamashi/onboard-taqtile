import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {login} from './authentication.js';
import './login-screen.css';
import { Redirect } from 'react-router-dom';
import Validation from '../validation.js'
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
    }  
  }

  validateForm() { 
    this.setState({
      emailValid: Validation.email(this.state.email),
      passwordValid: true,
      formValid: this.state.emailValid});
    }
  
  loginRequest(email, password){
    this.setState({isLoading : true})
    login(email, password)
      .then(
       (response) => {
        this.setState({isLoading : false});
        if(response.data != null){
          this.setState({authenticated : true})
        }
       })
      .catch(
        () => {
          console.log("erro na autenticação")
          this.setState({authenticated : false, isLoading : false})}
      );
  }

  navigateHome(){
    let redirect = null;
    if(this.state.authenticated){
      localStorage.setItem("email",this.state.email);
      localStorage.setItem("password",this.state.password);
      redirect = <Redirect to="/home"/>;
    }
    return redirect; 
  }
 
  render() {    
    let redirect = this.navigateHome();    
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
