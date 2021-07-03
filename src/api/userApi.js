import { setCookie } from '../utils/handleCookies';
import { axiosInstance } from './axiosInstance';
import { useHistory } from 'react-router';

export function loginUserWithToken(token) {
  return axiosInstance
    .get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export function loginUser(user) {
  return axiosInstance
    .post('/login', JSON.stringify(user))
    .then((response) => {
      const res = JSON.parse(response.data);
      console.log(response);
      setCookie('token', res.token); // tbs
    })
    .catch(() => {});
}

export function RegisterUser(user) {
  // console.log('eiw');
  console.log(axiosInstance.defaults);
  return axiosInstance
    .post('/users/register', user)
    .then((response) => {
      alert('Registration successful, redirecting you to login page');
      window.location.href = '/login';
    })
    .catch((error) => {
      console.log(error);
    });
}
