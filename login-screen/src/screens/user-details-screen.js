import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import UserCard from '../components/user-card';
import { Redirect, Link } from 'react-router-dom';
import EditUserForm from './edit-user-form';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
 

class UserDetailsScreen extends Component {

  baseUrl = "https://tq-template-server-sample.herokuapp.com/users/";

  constructor(props) {
    super(props);
    this.state = {
        name : "",
        email : "",
        role : "",
        id : localStorage.getItem("searchId"),
        authenticated : true,
        idEmpty : true,
        hasData : true,
        edit : false
    };
  }

  componentWillMount(){
    this.getUserDetails(this.state.id); 
    console.log(window.location.href) 
    }

  async getUserDetails(id) {
    return axios(this.baseUrl + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization : localStorage.getItem("token")
      },
    })
      .then((response) => {
        console.log(response);
        
        this.setState({
          name : response.data.data.name, 
          email : response.data.data.email, 
          role : response.data.data.role, 
          authenticated : true});

        localStorage.setItem("token", response.headers.authorization);
        return (response.data)})

      .catch((error) =>       
      {
        console.log(error);
        this.setState({authenticated : false});
        return (error)}
      )
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({edit : true});
    localStorage.setItem("currentName", this.state.name);
    localStorage.setItem("currentEmail", this.state.email);
    localStorage.setItem("currentRole", this.state.role);
    localStorage.setItem("currentId", this.state.id);

  }

  displayCard(hasData){
    if(hasData){
        return(
            <div>
            <UserCard
            name={this.state.name} 
            email={this.state.email} 
            role={this.state.role}>
            </UserCard>
            </div>
        );
    }else{
        return <div/>
    }
  }

  render() {
    let redirect = null;
    if(this.state.edit){
      redirect = <Redirect to='/edit'/>
    }
    return (    
        <div>
          {redirect}
          {this.displayCard(true)}
          <Button
            onClick={this.handleSubmit}
            >{this.state.showForm ? "Cancel" : "Edit"}
          </Button> 
        </div>
    );
  }
}
export default UserDetailsScreen;
