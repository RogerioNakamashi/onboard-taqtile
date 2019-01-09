import React, { Component } from 'react';
import { Item, Container } from 'semantic-ui-react';
class UsersListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users : [
            {"name":"Rogério", "role":"Estagiário 1"},
            {"name":"Diogo", "role":"Estagiário 2"}, 
            {"name":"João", "role":"Estagiário 3"}
        ]
    };
  }
  render() {    
    return (    
        <div>
        {this.state.users.map(user =>
          <Container>
            <Item.Content style={{ marginTop: 20, marginBottom: 20 }} >
              <Item.Header as='h3'>
                {user.name}
              </Item.Header>
              <Item.Description style={{ marginTop: 15 }}><p>{user.role}</p></Item.Description>
            </Item.Content> 
          </Container>
        )}
      </div>
    );
  }
}
export default UsersListScreen;
