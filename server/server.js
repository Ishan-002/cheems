const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost/';
const cors = require('cors');

const users = require('./routes/users');
const sessions = require('./routes/open-vidu/session');

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
// use something like this. Refer: https://expressjs.com/en/5x/api.html
// app.all('*', requireAuthentication)
app.use(cors());
// app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// console.log('app is first');
app.get('/', (req, res) => {
  res.send('Welcome');
});
// Routes
app.use('/api/users', users);
app.use('/api/session', sessions);
// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
