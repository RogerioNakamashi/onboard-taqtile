import axios from 'axios';
import {Get, Save} from '../data/storage.js'

export async function login(email, password) {
    return axios('https://tq-template-server-sample.herokuapp.com/authenticate', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: ({
        'password': password,
        'email': email,
        'rememberMe': false
      })
    })
      .then((response) => {
        Save.name(response.data.data.user.name);
        Save.token(response.data.data.token);
        return (response.data)})
  }

  export async function getUsers() {
    const response = await axios('https://tq-template-server-sample.herokuapp.com/users?pagination={"page": 0 , "window": 500}', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization : Get.token()
      },
    })
    return response
  }

  export async function getUserDetails(id) {
    return axios(this.baseUrl + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization : localStorage.getItem("token")
      },
    })
      .then((response) => {
        console.log(response);
        
        this.setState({
          name : response.data.data.name, 
          email : response.data.data.email, 
          role : response.data.data.role, 
          authenticated : true});

        localStorage.setItem("token", response.headers.authorization);
        return (response.data)})

      .catch((error) =>       
      {
        console.log(error);
        this.setState({authenticated : false});
        return (error)}
      )
  }