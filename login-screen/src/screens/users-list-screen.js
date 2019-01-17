import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import UserCard from '../components/user-card';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';


class UsersListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users : [],
        authenticated : true
    };
  }

  componentWillMount(){
    this.getUsers();  
    }

  async getUsers() {
    return axios('https://tq-template-server-sample.herokuapp.com/users?pagination={"page": 0 , "window": 500}', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization : localStorage.getItem("token")
      },
    })
      .then((response) => {
        this.setState({users : response.data.data, authenticated : true});
        localStorage.setItem("token", response.headers.authorization);
        return (response.data)})

      .catch((error) =>       
      {
        console.log(error);
        this.setState({authenticated : false});
        return (error)}
      )
  }

  saveId(id){
    console.log("id salvo: " + id)
    localStorage.setItem("searchId", id);
  }

  render() {
    let redirect = null;
    if(!this.state.authenticated){
      redirect = <Redirect to="/login"/>;
    }    
    return (    
        <div>  
          {redirect}
        {this.state.users.map(user =>
            <div>
              <UserCard 
                name={user.name} 
                role={user.role}>
              </UserCard>
              <Link onClick={() => this.saveId(user.id)} to={'/user-details/' + user.id}>Details</Link>
            </div>
        )}
      </div>
    );
  }
}
export default UsersListScreen;
