import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import UserCard from '../components/user-card';
import { Redirect } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
 

class UserDetailsScreen extends Component {

  baseUrl = "https://tq-template-server-sample.herokuapp.com/users/";

  constructor(props) {
    super(props);
    this.state = {
        name : "",
        email : "",
        role : "",
        id : "",
        authenticated : true,
        idEmpty : true,
        hasData : true
    };
  }

  componentWillMount(){
    this.getUserDetails(this.state.id);  
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
        this.setState({name : response.data.data.name, email : response.data.data.email, role : response.data.data.role, authenticated : true});
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
    this.getUserDetails(this.state.id);

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
    
    return (    
        <div>
          <form onSubmit={this.handleSubmit}>
            <FormGroup  controlId="id">
              <ControlLabel>Search user by id</ControlLabel>
              <FormControl
                value={this.state.id}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button
              onClick={this.handleSubmit}
              >Search
            </Button> 
            {this.displayCard(this.state.hasData)}

          </form>
      </div>
    );
  }
}
export default UserDetailsScreen;
