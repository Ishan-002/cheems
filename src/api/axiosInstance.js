import axios from 'axios';
require('dotenv').config();

const { REACT_APP_SERVER_URL } = process.env;
console.log(REACT_APP_SERVER_URL);

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: `http://localhost:3001/api`,
});
