import React, { Component } from 'react';
import {login} from '../data/requests.js';
import {Redirect} from 'react-router-dom';
import Validation from '../validation.js';
import Login from '../presentation/login';
import {Save} from '../data/storage.js'

type State  = {
  email: string,
  password: string,
  emailValid: boolean,
  passwordValid: boolean,
  formValid: boolean,
  authenticated: boolean,
  isLoading: boolean,
  [key: string]: any
}

class LoginControl extends Component<{}, State > {
  constructor(props : any) {
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
 
  handleChange = (event : any)  => {
    this.setState({[event.target.id] : event.target.value});
    this.validateForm();
  }   

  handleSubmit = (event : any) => {
    event.preventDefault();
    if(this.state.formValid){
      this.loginRequest(this.state.email, this.state.password);      
    };
  }

  componentDidMount(){
    console.log(this)
  }

  validateForm = () => { 
    this.setState({
      emailValid: Validation.email(this.state.email),
      passwordValid: true,
      formValid: this.state.emailValid});
    }
  
  loginRequest = (email : string, password : string) => {
    this.setState({isLoading : true});
    login(email, password)
      .then((response) => {
        Save.name(response.data.data.user.name);
        Save.token(response.data.data.token);
        this.setState({isLoading : false, authenticated : true});        
       })
      .catch(() => {
          console.log("erro na autenticacao")
          this.setState({isLoading : false, authenticated : false})}
      );
  }

  navigateHome = (authenticated: boolean) => {
    return (authenticated ? <Redirect to="/home"/> : <div/>)
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
