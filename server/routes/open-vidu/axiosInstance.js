const axios = require('axios');
require('dotenv').config();
const creds = `OPENVIDUAPP:${process.env.SERVER_SECRET}`;
const encodedCreds = Buffer.from(creds).toString('base64');

// console.log('axios is first');
const axiosInstance = axios.create({
  headers: {
    Authorization: `Basic ${encodedCreds}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: process.env.SERVER_URL,
});
// console.log(axiosInstance);
module.exports = axiosInstance;
