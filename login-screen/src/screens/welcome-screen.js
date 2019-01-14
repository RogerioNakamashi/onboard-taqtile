import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'


class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {    
    let welcomeMessage = "Welcome, " + localStorage.getItem("name") + "!"; 
    return (      
      <div className="Home">
        <h1 align="center" margin-top="100px">{welcomeMessage}</h1>
        <Menu fixed='top' inverted color='blue' pointing size='large'>

        <Link to='/users'>
          <Menu.Item
            name='users'
            active={true}
          />
        </Link>

        <Link to='/user-details'>
          <Menu.Item
            name='Search user by id'
            active={true}
          />
        </Link>

        <Link to='/new-user'>
          <Menu.Item
            name='Create new user'
            active={true}
          />
        </Link>

      </Menu>
      </div>
    );
  }
}
export default WelcomeScreen;
