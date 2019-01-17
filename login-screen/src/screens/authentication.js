import axios from 'axios';

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
      .then((response) => {return (response.data)})
      .catch((error) => { return (error)})
  }


export async function login2(email, password){
  const response = await axios('https://tq-template-server-sample.herokuapp.com/authenticate', {
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
  return response.data;
}

  export default login;

  