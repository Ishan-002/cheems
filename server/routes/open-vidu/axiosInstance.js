const axios = require('axios');

const creds = `OPENVIDUAPP:${process.env.SERVER_SECRET}`;
const encodedCreds = Buffer.from(creds).toString('base64');

const axiosInstance = axios.create({
  headers: {
    Authorization: `Basic ${encodedCreds}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: process.env.OPENVIDU_SERVER_URL,
});

module.exports = axiosInstance;
