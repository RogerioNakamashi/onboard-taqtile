import axios from 'axios';

export function login(email, password) {
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
      .then((response) => { return (response.data) })
      .catch((error) => { throw (error.message) })
  }

  export default login;