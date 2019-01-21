import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './style/login.css'
class Login extends Component {

  constructor(props) {
    super(props);
  }
   
  render() {    
    return (      
      <div className="Login"> 
        <h1>Sign in</h1>
        <form onSubmit={this.props.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              onChange={this.props.handleChange}
            />            
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              onChange={this.props.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            bsStyle="primary"
            disabled={this.props.isLoading}
            type="submit"
          >
          {this.props.isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    );
  }
}


export default Login;
