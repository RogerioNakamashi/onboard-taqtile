import React from 'react'
import { Card, Image } from 'semantic-ui-react'

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
        <Card>
        <Image src={this.props.image} />
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>
            <span className='date'>{this.props.role}</span>
          </Card.Meta>
          <Card.Description>{this.props.email}</Card.Description>
        </Card.Content>
      </Card>
    )
  }
}
  

export default UserCard