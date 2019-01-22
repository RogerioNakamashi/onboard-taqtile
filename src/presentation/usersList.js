import React, { Component } from 'react';
import UserCard from '../components/user-card';
import {Link} from 'react-router-dom';

class UsersList extends Component {
  constructor(props) {
    super(props);
  }
  render() {  
    return (    
        <div> 
        {this.props.users.map(user =>
            <div>
              <UserCard 
                name={user.name} 
                role={user.role}>
              </UserCard>
              <Link onClick={() => this.props.handleClick(user)} to={'/user-details/' + user.id}>Details</Link>
            </div>
        )}
      </div>
    );
  }
}
export default UsersList;
