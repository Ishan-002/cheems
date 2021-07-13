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

// var server = http.createServer(app);

// server.listen(PORT);
// require('./io/index')(io);

// io.on('connection', (socket) => {
//   let sessionUserId = '';
//   let action;
//   console.log('Connection established');
//   getMostRecentMessages(teamId)
//     .then((results) => {
//       io.sockets.in(teamId).emit('mostRecentMessages', results.reverse());
//     })
//     .catch((error) => {
//       socket.emit('mostRecentMessages', []);
//     });

// socket.on('join', (params, callback) => {
//   socket.join(params.teamId);
//   console.log('join here too');
//   callback();
// });

//   socket.on('newChatMessage', (data) => {
//     //send event to every single connected socket
//     try {
//       const message = new Message({
//         author: data.author,
//         text: data.text,
//       });

//       message
//         .save()
//         .then(() => {
//           io.emit('newChatMessage', { author: data.author, text: data.text });
//         })
//         .catch((error) => console.log('error: ' + error));
//     } catch (e) {
//       console.log('error: ' + e);
//     }
//   });
//   socket.on('disconnect', () => {
//     console.log('connection disconnected');
//   });
// });

// /**
//  * get 10 last messages
//  * @returns {Promise<Model[]>}
//  */
// async function getMostRecentMessages() {
//   return await Message.find().sort({ _id: -1 }).limit(10);
// }

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
app.use('/api/teams', teams);
// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

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
