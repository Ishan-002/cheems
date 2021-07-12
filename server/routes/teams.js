const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const middleware = require('../middleware/middleware');

const Team = require('../models/team');
const User = require('../models/user');

// @route POST api/teams/new
// @desc Create a new team
// @access Public
router.post('/new', (req, res) => {
  console.log(req.body.username);
  const username = req.body.username;
  User.findOne({ username }).then((user) => {
    if (!user) {
      return res.status(400).send();
    }

    const newTeam = new Team({
      creator: req.body.username,
      teamName: req.body.teamName,
      participants: [user._id],
    });
    console.log(newTeam);

    Team.create(newTeam)
      .then((team) => {
        user.teams.push(team._id);
        user.save();
        console.log(user);
        // team.participants.push(user._id);
        // rChannel.online
        console.log(team);
        team.save();
        // res.redirect(`/channel/${rChannel._id}`);
        return res.status(200).json({ teamId: team._id });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send();
      });
  });
});

// @route GET api/teams/join/:id
// @desc Gets the team details and maybe join it?
// @access Public
router.get('/join/:id', (req, res) => {
  console.log('heelo');
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send();
  }

  Team.findById(ObjectID(req.params.id))
    .populate('participants')
    .then((team) => {
      if (!team) {
        return res.status(500).send();
      }
      return res.status(200).json({ team: team });
      //   res.render('join', { channel: rChannel, title: 'join' });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send();
    });
});

// @route POST api/teams/join/:id
// @desc Join an already created team
// @access Public
router.post('/join/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send();
  }
  const username = req.body.username;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return req.status(400).send('User does not exist');
      }

      Team.findById(ObjectID(req.params.id))
        .then((team) => {
          if (!team) {
            return res.status(400).send('Team does not exist');
          }
          // if problem comes in getting the id of the user, then do .findOne() and then get the user
          const numberOfUsers = team.participants.length;
          for (let i = 0; i < numberOfUsers; i++) {
            if (team.participants[i].equals(ObjectID(user._id))) {
              return res.status(200).json({ teamId: team._id });
              // return res.redirect(`/channel/${rChannel._id}`);
            }
          }
          user.teams.push(team._id);
          user.save();

          team.participants.push(user._id);
          team.save();
          return res.status(200).json({ teamId: team._id });
          // return res.redirect(`/channel/${rChannel._id}`);
        })
        .catch((e) => {
          console.log(e);
          res.status(500).send();
          // res.redirect('/');
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
});

// @route GET api/teams/:id
// @desc Get the content to load in the team page
// @access Public
router.get(
  '/:id',
  // middleware.isLogedIn,
  middleware.isTeamParticipant,
  (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).send();
      // return res.redirect('/');
    }

    Team.findById(ObjectID(req.params.id))
      .populate({ path: 'message', populate: { path: 'author' } })
      .populate('participants')
      .limit(10)
      .sort({ date: -1 })
      .then((team) => {
        if (!team) {
          return res.status(400).send('Team not found');
          // return res.redirect('/');
        }
        const username = req.body.username;
        User.findOne({ username })
          .populate('teams')
          .then((user) => {
            res.status(200).json({ team: team, userTeams: user.teams });
            res.render('chat', {
              channel: rChannel,
              channels: rUser.channels,
              title: rChannel.channel_name,
              // moment, something related to measuring the time at this point
            });
          });
      })
      .catch((error) => {
        // res.redirect('/');
        res.status(500).send();
        console.log(error);
      });
  }
);

module.exports = router;
