import React, { Component } from 'react';
import Welcome from '../presentation/welcome';
import {Get} from '../data/storage'

class WelcomeControl extends Component {
  constructor(props) {
    super(props);
  }
  
  welcomeMessage = "Welcome, " + Get.name() + "!"; 
  
  render() {    
    return (      
      <Welcome message={this.welcomeMessage}></Welcome>
    );
  }
}
export default WelcomeControl;
