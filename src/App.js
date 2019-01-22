import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import EditUserForm from './screens/edit-user-form';
import NewUserScreen from './screens/new-user-screen';
import LoginControl from './domain/loginControl.js'
import UsersListControl from './domain/usersListControl.js'
import WelcomeControl from './domain/welcomeControl.js'
import UserDetailsControl from './domain/userDetailsControl'
class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/login' exact component={LoginControl} />
            <Route path='/home' exact component={WelcomeControl} />
            <Route path='/users' exact component={UsersListControl} />
            <Route path='/user-details' component={UserDetailsControl} />
            <Route path='/edit' component={EditUserForm} />
            <Route path='/new-user' exact component={NewUserScreen} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
