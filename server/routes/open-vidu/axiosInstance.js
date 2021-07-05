const axios = require('axios');
require('dotenv').config();

const secret = `OPENVIDUAPP:${process.env.SERVER_SECRET}`;
const encodedSecret = Buffer.from(secret).toString('base64');

// axios instance for sending request to the OpenVidu server
const axiosInstance = axios.create({
  headers: {
    Authorization: `Basic ${encodedSecret}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: process.env.SERVER_URL,
});

module.exports = axiosInstance;
