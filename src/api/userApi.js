import { removeCookie, setCookie } from '../utils/handleCookies';
import { axiosInstance } from './axiosInstance';

export function loginUserWithToken(token) {
  return axiosInstance
    .get('/users/login', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      console.log(response);
      console.log(res);
      return res;
    })
    .catch((error) => {
      throw error;
    });
}

// TODO: Use modals instead of alerts
export function loginUser(user) {
  return axiosInstance
    .post('/users/login', JSON.stringify(user))
    .then((response) => {
      console.log(response);
      const res = response.data;
      if (response.status == 200) {
        setCookie('token', res.token);
        window.location.href = '/';
      }
    })
    .catch((error) => {
      const response = error.response;
      const res = response.data;
      if (response.status == 400) {
        if (res) {
          let out = '';
          for (let keys in res) {
            out += res[keys] + '\n';
          }
          alert(out);
        } else {
          alert('Bad request, please try again.');
        }
      } else if (response.status == 500) {
        alert('There was some error with the server, please try again.');
      }
      console.log(error);
    });
}

export function RegisterUser(user) {
  return axiosInstance
    .post('/users/register', user)
    .then((response) => {
      console.log('before');
      console.log(response);
      console.log('after');
      // const res = JSON.parse(response.data);
      if (response.status == 200) {
        alert('Registration successful, redirecting you to login page');
        window.location.href = '/login';
      }
    })
    .catch((error) => {
      const response = error.response;
      console.log(error.response.data);
      const res = response.data;
      if (response.status == 400) {
        if (res) {
          let out = '';
          for (let keys in res) {
            out += res[keys] + '\n';
          }
          alert(out);
        } else {
          alert('Bad request, please try again.');
        }
      } else if (response.status == 500) {
        alert('There was some error with the server, please try again.');
      }
    });
}

export function getTeamDetails(teamId, username) {
  return axiosInstance
    .get(`/teams/${username}/${teamId}`)
    .then((response) => {
      console.log(response);
      if (response.status == 200) {
        return Promise(response.data);
      }
      return new Error();
    })
    .catch((error) => {
      const response = error.response;
      const res = response.data;
      console.log(res);
      console.log(error);
      return new Error();
    });
}
