import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {login} from '../screens/authentication.js';
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
    this.setState({isLoading : true})
    login(email, password)
      .then(
       (response) => {
        this.setState({isLoading : false});
        if(response.data != null){
          this.setState({authenticated : true});
        }
       })
      .catch(
        () => {
          console.log("erro na autenticação")
          this.setState({authenticated : false, isLoading : false})}
      );
  }

  navigateHome = () => {
    let redirect = null;
    if(this.state.authenticated){
      localStorage.setItem("email",this.state.email);
      localStorage.setItem("password",this.state.password);
      redirect = <Redirect to="/home"/>;
    }
    return redirect; 
  }
 
  render() {
    return ( 
            <div>
                {this.navigateHome()}
                <Login
                    handleChange = {this.handleChange}
                    handleSubmit = {this.handleSubmit}
                    validateForm = {this.validateForm}
                    loginRequest = {this.loginRequest}
                    navigateHome = {this.navigateHome}
                    isLoading = {this.state.isLoading}>
                </Login>
            </div>
    );
  }
}


export default LoginControl;
