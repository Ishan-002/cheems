const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const Team = require('../models/team');
const User = require('../models/user');

const middleware = {};

middleware.isLogedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send();
  }
  next();
};

middleware.isTeamParticipant = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send();
  }
  const username = req.params.username;
  console.log(username);
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(400).send('user not found');
      }
      Team.findById(ObjectID(req.params.id))
        .then((team) => {
          if (!team) {
            return res.status(400).send('team not found');
          }
          for (let i = 0; i < team.participants.length; i++) {
            if (team.participants[i].equals(ObjectID(user._id))) {
              return next();
            }
          }
          return res.status(400).send('user not in team');
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).send();
        });
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).send();
    });
};

module.exports = middleware;
