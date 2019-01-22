import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import EditUser from '../presentation/editUser'
class EditUserControl extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name : localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      role : localStorage.getItem("role"),
      editId : localStorage.getItem("id"),
      emailValid: false,
      nameValid : false,
      formValid: false,
      authenticated: false,
      isLoading: false,
      returnToDetail : false
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
    this.setState({isLoading : true});
    event.preventDefault();
    this.validateField();
    localStorage.setItem("searchId",this.state.editId)
    if(this.state.formValid){
      this.editUserRequest(this.state.name, this.state.email, this.state.role, this.state.editId);
    }else{
      this.setState({isLoading : false})
      console.log("form invalido");
    }
  }

  cancelEdit(){
    localStorage.setItem("searchId", this.state.editId);
    this.setState({returnToDetail : true});
  }

  validateField() {
    let emailValid = true;
    let nameValid = true;
    this.setState({
                    nameValid: nameValid,
                    emailValid: emailValid,
                    formValid: emailValid && nameValid
                  });
  }
  
  async editUserRequest(name, email, role, id) {
    console.log("URL de request: "+"https://tq-template-server-sample.herokuapp.com/users/" + id)
    return axios('https://tq-template-server-sample.herokuapp.com/users/' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization : localStorage.getItem("token")
      },
      data: ({
        'name': name,
        'email': email,
        'role': role,
      })
    })
      .then((response) => {
        console.log (response);
        localStorage.setItem("token", response.headers.authorization);
        this.setState({isLoading : false, returnToDetail : true})})
      .catch((error) => { 
        console.log("erro na request do form");
        console.log(error);
        this.setState({isLoading : false})})
  }

  redirect(returnToDetail){
      if(returnToDetail){ return <Redirect to={"/user-details/" + this.state.editId}/>}
      else{return <div/>}
  }
  
  render() {
    return (
      
      <div className="NewUser">
        {this.redirect}  
        
      </div>
    )
  }
}
    
export default EditUserControl;
