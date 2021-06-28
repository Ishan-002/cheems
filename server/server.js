const express = require('express');

const openVidu = require('openvidu-node-client').OpenVidu;
const openViduRole = require('openvidu-node-client').OpenViduRole;
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost/';

const users = require('./routes/users');

// loading env file
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// connecting mongoDB to server
mongoose.connect(
  mongo_uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  function (err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${mongo_uri}`);
    }
  }
);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welcome');
});
// Routes
app.use('/api/users', users);

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
