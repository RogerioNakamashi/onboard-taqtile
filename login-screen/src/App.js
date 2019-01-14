import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginScreen from './screens/login-screen';
import WelcomeScreen from './screens/welcome-screen';
import UsersListScreen from './screens/users-list-screen';
import UserDetailsScreen from './screens/user-details-screen';
import NewUserScreen from './screens/new-user-screen';
import HeaderMaster from './components/header-master';

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/login' exact component={LoginScreen} />
            <Route path='/home' exact component={WelcomeScreen} />
            <Route path='/users' exact component={UsersListScreen} />
            <Route path='/user-details' exact component={UserDetailsScreen} />
            <Route path='/new-user' exact component={NewUserScreen} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
