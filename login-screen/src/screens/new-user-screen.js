import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {login, login2} from './authentication.js';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class NewUserScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name : "",
      email: "",
      password: "",
      confirmPassword : "",
      role : "",
      emailValid: false,
      passwordValid: false,
      nameValid : false,
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
    this.setState({isLoading : true});
    event.preventDefault();
    this.validateField();
    if(this.state.formValid){
      this.newUserRequest(this.state.name, this.state.email, this.state.password, this.state.role);
    }else{
      this.setState({isLoading : false})
      console.log("form invalido");
    }
  }

  validateField() {
    let emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    let nameValid = this.state.name.match(/^[a-zA-Z]+$/);
    let passwordValid = this.state.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) && (this.state.password == this.state.confirmPassword);
    // let emailValid = true;
    // let nameValid = true;
    // let passwordValid = true;
    
   
    this.setState({
                    nameValid: nameValid,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    formValid: emailValid && passwordValid && nameValid
                  });
  }
  
  async newUserRequest(name, email, password, role) {
    return axios('https://tq-template-server-sample.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization : localStorage.getItem("token")
      },
      data: ({
        'name': name,
        'email': email,
        'password': password,
        'role': role,
      })
    })
      .then((response) => {
        console.log (response);
        localStorage.setItem("token", response.headers.authorization);
        this.setState({isLoading : false})})
      .catch((error) => { 
        console.log("erro na request");
        console.log(error);
        this.setState({isLoading : false})})
  }

  
  render() {
    
    let redirect = null;
    if(this.state.authenticated){
      localStorage.setItem("email",this.state.email);
      localStorage.setItem("password",this.state.password);
      redirect = <Redirect to="/home"/>;
    }     
    return (
      
      <div className="NewUser">
        {redirect}  
        <h1>Create new user</h1>
        <form onSubmit={this.handleSubmit}>

          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              autoFocus
              value={this.state.name}
              onChange={this.handleChange}
            />                        
          </FormGroup>

          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              value={this.state.email}
              onChange={this.handleChange}
              />
          </FormGroup>

          <FormGroup controlId="role" bsSize="large">
            <ControlLabel>Role</ControlLabel>
            <FormControl 
              componentClass="select"
              value={this.state.role}
              onChange={this.handleChange}
              >
              <option>admin</option>
              <option>user</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </FormGroup>

          <Button
            block
            bsSize="large"
            bsStyle="primary"
            disabled={this.state.isLoading}
            type="submit"
          >
          {this.state.isLoading ? "Loading..." : "Create"}
          </Button>

        </form>
      </div>
    );
  }
}


export default NewUserScreen;
