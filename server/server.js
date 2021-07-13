const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost/';
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');

const users = require('./routes/users');
const sessions = require('./routes/open-vidu/session');
const teams = require('./routes/teams');
const { saveMessage } = require('./io/utils');
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

app.get('/', (req, res) => {
  res.send('Welcome');
});

// Routes
app.use('/api/users', users);
app.use('/api/session', sessions);
app.use('/api/teams', teams);

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// creating socket connection
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// socket listeners
io.on('connection', function (socket) {
  console.log('connect');

  socket.on('subscribe', function (room) {
    console.log('joining room', room);
    socket.join(room);
  });

  socket.on('unsubscribe', function (room) {
    console.log('leaving room', room);
    socket.leave(room);
  });

  socket.on('send', function (data) {
    console.log('sending message');
    console.log(data.teamId);
    saveMessage(io, data);
    io.sockets.in(data.teamId).emit('message', data);
  });
});
