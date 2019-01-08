import axios from 'axios';

export function login() {
    return axios('https://tq-template-server-sample.herokuapp.com/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: ({
        'password': '1111',
        'email': 'admin@taqtile.com',
        'rememberMe': false
      })
    })
      .then((response) => { return (response.data) })
      .catch((error) => { throw (error.message) })
  }

  export default login;