import React, { Component } from 'react';
import UserCard from '../components/user-card';
import { Button} from 'react-bootstrap';

class UserDetails extends Component {
  render() {
    return (    
        <div>
          <div>
            <UserCard
            name={this.props.name} 
            email={this.props.email} 
            role={this.props.role}>
            </UserCard>
          </div>
          <Button
            onClick={this.props.handleSubmit}
            >Edit
          </Button> 
        </div>
    );
  }
}
export default UserDetails;
