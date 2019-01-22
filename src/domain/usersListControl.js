import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UsersList from '../presentation/usersList';
import {Get, Save} from '../data/storage'
import {getUsers} from '../data/requests'

class UsersListControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users : [],
        authenticated : true
    };
  }

  componentWillMount(){
     getUsers().then((response) => {
        this.setState({users : response.data.data})
     }
     );
  }
 
  handleClick = (user) => {    
    Save.id(user.id)
  }

  returnToLogin(authenticated){
      if(!authenticated){
          return <Redirect to="/login"/>;
      }else{
          return <div/>
      }
  }
  render() {    
    return (    
        <div>  
          {this.returnToLogin(this.state.authenticated)}
          <UsersList 
            users={this.state.users}
            handleClick={this.handleClick}>
          </UsersList>
        </div>
    );
  }
}
export default UsersListControl;
