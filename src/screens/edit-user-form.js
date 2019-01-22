import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class EditUserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name : localStorage.getItem("currentName"),
      email: localStorage.getItem("currentEmail"),
      role : localStorage.getItem("currentRole"),
      editId : localStorage.getItem("currentId"),
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
    // let emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    // let nameValid = this.state.name.match(/^[a-zA-Z]+$/);
    // let passwordValid = this.state.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) && (this.state.password == this.state.confirmPassword);
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
  
  render() {
    
    let redirect = null;
    if(this.state.returnToDetail){
      redirect = <Redirect to={"/user-details/" + this.state.editId}/>;
    }     
    return (
      
      <div className="NewUser">
        {redirect}  
        <h1>Edit user</h1>
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

          <Button
            block
            bsSize="large"
            bsStyle="primary"
            disabled={this.state.isLoading}
            type="submit"
          >
          {this.state.isLoading ? "Updating..." : "Update"}
          </Button>
          
          <Button
            block
            bsSize="large"
            bsStyle="primary"
            onClick={() => {this.setState({returnToDetail : true})}}
          >
          Cancel
          </Button>

        </form>
      </div>
    );
  }
}

export default EditUserForm;
