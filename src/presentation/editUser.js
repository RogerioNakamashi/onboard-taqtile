import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
class EditUser extends Component {

  constructor(props) {
    super(props);
  }
  render() { 
    return (
      
      <div className="NewUser">
        {redirect}  
        <h1>Edit user</h1>
        <form onSubmit={this.props.handleSubmit}>

          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              autoFocus
              value={this.props.name}
              onChange={this.props.handleChange}
            />                        
          </FormGroup>

          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              value={this.props.email}
              onChange={this.props.handleChange}
              />
          </FormGroup>

          <FormGroup controlId="role" bsSize="large">
            <ControlLabel>Role</ControlLabel>
            <FormControl 
              componentClass="select"
              value={this.props.role}
              onChange={this.props.handleChange}
              >
              <option>admin</option>
              <option>user</option>
            </FormControl>
          </FormGroup>

          <Button
            block
            bsSize="large"
            bsStyle="primary"
            disabled={this.props.isLoading}
            type="submit"
          >
          {this.props.isLoading ? "Updating..." : "Update"}
          </Button>
          
          <Button
            block
            bsSize="large"
            bsStyle="primary"
            onClick={() => {this.setState({returnToDetail : true})}}
          >
          Cancel
          </Button>

        </form>
      </div>
    );
  }
}

export default EditUser;
