import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {login, login2} from './authentication.js';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import '../style/new-user-screen.css';
class NewUserScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name : "",
      email: "",
      password: "",
      role : "admin",
      emailValid: false,
      passwordValid: false,
      nameValid : false,
      formValid: false,
      authenticated: false,
      isLoading: false,
      emailError: "",
      passwordError: "",
      userCreated : false
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
    console.log(this.state);
    if(this.state.formValid){
      this.newUserRequest(this.state.name, this.state.email, this.state.password, this.state.role);
    }else{
      this.setState({isLoading : false})
      console.log("form invalido");
    }
  }

  validateField() {
    let emailValid = true;
    let nameValid = true;
    let passwordValid = true;

    if(this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) == null){
      emailValid = false;
    }
    if(this.state.name.match(/^[a-zA-Z]+$/) == null){
      nameValid = false;
    };
    if(this.state.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) == null){
      passwordValid = false;
    };
     
    this.setState({
                    nameValid: nameValid,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    formValid: (emailValid && passwordValid && nameValid)
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
        this.setState({isLoading : false, userCreated : true})})
      .catch((error) => { 
        console.log("erro na request");
        console.log(error);
        this.setState({isLoading : false})})
  }
  
  render() {
    
    let redirect = null;
    if(this.state.userCreated){
      redirect = <Redirect to="/users"/>;
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