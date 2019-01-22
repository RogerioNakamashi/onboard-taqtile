import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserDetails from '../presentation/userDetails' 
import {getUserDetails} from '../data/requests' 
import { Save, Get } from '../data/storage';

class UserDetailsControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name : "",
        email : "",
        role : "",
        id : Get.id(),
        authenticated : true,
        idEmpty : true,
        edit : false
    };
  }

  componentWillMount(){
    getUserDetails(this.state.id)
        .then((response) => {
            this.setState({name : response.data.data.name, email : response.data.data.email , role : response.data.data.role, authenticated : true })
        }); 
    }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({edit : true});
    Save.name(this.state.name);
    Save.email(this.state.email);
    Save.role(this.state.role);
    Save.id(this.state.id);
  }

  redirect(edit){
      if(edit) return <Redirect to='/edit'/>;
      else return <div/>
  }
  render() {
    return (    
        <div>
          {this.redirect(this.state.edit)}
          <UserDetails
            name={this.state.name}
            email={this.state.email}
            role={this.state.role}
            handleSubmit={this.handleSubmit}>
          </UserDetails>
        </div>
    );
  }
}
export default UserDetailsControl;
