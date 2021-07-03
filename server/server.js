const express = require('express');

const openVidu = require('openvidu-node-client').OpenVidu;
const openViduRole = require('openvidu-node-client').OpenViduRole;
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

// // Mock database
// var users = [
//   {
//     user: 'publisher1',
//     pass: 'pass',
//     role: OpenViduRole.PUBLISHER,
//   },
//   {
//     user: 'publisher2',
//     pass: 'pass',
//     role: OpenViduRole.PUBLISHER,
//   },
//   {
//     user: 'subscriber',
//     pass: 'pass',
//     role: OpenViduRole.SUBSCRIBER,
//   },
// ];

// app.post('/session', (req, res) => {
//   if (!isLogged(req.session)) {
//     req.session.destroy();
//     res.redirect('/');
//   } else {
//     // The nickname sent by the client
//     var clientData = req.body.data;
//     // The video-call to connect
//     var sessionName = req.body.sessionname;

//     // Role associated to this user
//     var role = users.find((u) => u.user === req.session.loggedUser).role;

//     // Optional data to be passed to other users when this user connects to the video-call
//     // In this case, a JSON with the value we stored in the req.session object on login
//     var serverData = JSON.stringify({ serverData: req.session.loggedUser });

//     console.log('Getting a token | {sessionName}={' + sessionName + '}');

//     // Build connectionProperties object with the serverData and the role
//     var connectionProperties = {
//       data: serverData,
//       role: role,
//     };

//     if (mapSessions[sessionName]) {
//       // Session already exists
//       console.log('Existing session ' + sessionName);

//       // Get the existing Session from the collection
//       var mySession = mapSessions[sessionName];

//       // Generate a new token asynchronously with the recently created connectionProperties
//       mySession
//         .createConnection(connectionProperties)
//         .then((connection) => {
//           // Store the new token in the collection of tokens
//           mapSessionNamesTokens[sessionName].push(connection.token);

//           // Return session template with all the needed attributes
//           res.render('session.ejs', {
//             sessionId: mySession.getSessionId(),
//             token: connection.token,
//             nickName: clientData,
//             userName: req.session.loggedUser,
//             sessionName: sessionName,
//           });
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     } else {
//       // New session
//       console.log('New session ' + sessionName);

//       // Create a new OpenVidu Session asynchronously
//       OV.createSession()
//         .then((session) => {
//           // Store the new Session in the collection of Sessions
//           mapSessions[sessionName] = session;
//           // Store a new empty array in the collection of tokens
//           mapSessionNamesTokens[sessionName] = [];

//           // Generate a new token asynchronously with the recently created connectionProperties
//           session
//             .createConnection(connectionProperties)
//             .then((connection) => {
//               // Store the new token in the collection of tokens
//               mapSessionNamesTokens[sessionName].push(connection.token);

//               // Return session template with all the needed attributes
//               res.render('session.ejs', {
//                 sessionName: sessionName,
//                 token: connection.token,
//                 nickName: clientData,
//                 userName: req.session.loggedUser,
//               });
//             })
//             .catch((error) => {
//               console.error(error);
//             });
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }
// });

// app.post('/leave-session', (req, res) => {
//   if (!isLogged(req.session)) {
//     req.session.destroy();
//     res.render('index.ejs');
//   } else {
//     // Retrieve params from POST body
//     var sessionName = req.body.sessionname;
//     var token = req.body.token;
//     console.log(
//       'Removing user | {sessionName, token}={' +
//         sessionName +
//         ', ' +
//         token +
//         '}'
//     );

//     // If the session exists
//     if (mapSessions[sessionName] && mapSessionNamesTokens[sessionName]) {
//       var tokens = mapSessionNamesTokens[sessionName];
//       var index = tokens.indexOf(token);

//       // If the token exists
//       if (index !== -1) {
//         // Token removed
//         tokens.splice(index, 1);
//         console.log(sessionName + ': ' + tokens.toString());
//       } else {
//         var msg = "Problems in the app server: the TOKEN wasn't valid";
//         console.log(msg);
//         res.redirect('/dashboard');
//       }
//       if (tokens.length == 0) {
//         // Last user left: session must be removed
//         console.log(sessionName + ' empty!');
//         delete mapSessions[sessionName];
//       }
//       res.redirect('/dashboard');
//     } else {
//       var msg = 'Problems in the app server: the SESSION does not exist';
//       console.log(msg);
//       res.status(500).send(msg);
//     }
//   }
// });
