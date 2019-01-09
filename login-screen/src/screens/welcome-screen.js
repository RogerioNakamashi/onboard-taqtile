import React, { Component } from 'react';
class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {    
    let welcomeMessage = "Welcome, " + localStorage.getItem("name") + "!";  
    return (      
      <div className="Welcome">
        <h1>{welcomeMessage}</h1>
      </div>
    );
  }
}
export default WelcomeScreen;
