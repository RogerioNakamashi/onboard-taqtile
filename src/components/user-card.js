import React from 'react'

class UserCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            role:""
        };
    }
  render() {
    return(

      <div>
        <h3>{this.props.name}</h3>
        <p>{this.props.role}</p>
        <p>{this.props.email}</p>
      </div>

    )
  }
}
  

export default UserCard