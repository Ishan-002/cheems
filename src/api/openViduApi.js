import { setCookie } from '../utils/handleCookies';
import { axiosInstance } from './axiosInstance';

export function createSession() {
  return axiosInstance
    .post('/api/session')
    .then((response) => {
      setCookie('connectionToken', response.data.connectionToken);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function joinSession() {}
