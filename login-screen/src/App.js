import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginScreen from './screens/login-screen';
import WelcomeScreen from './screens/welcome-screen';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Container } from 'semantic-ui-react';

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/login' exact component={LoginScreen} />
            <Route path='/welcome' exact component={WelcomeScreen} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
