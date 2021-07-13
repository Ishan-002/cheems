const { ObjectID } = require('mongodb');
const User = require('../models/user');
const Message = require('../models/message');
const Team = require('../models/team');

const utils = {};

utils.saveMessage = function saveMessage(io, data) {
  const username = data.username;
  console.log(data);
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        console.log('user not found');
        return;
      }
      const msg = {
        text: data.text,
        author: user._id,
      };
      Message.create(msg)
        .then((message) => {
          Team.findByIdAndUpdate(ObjectID(data.teamId))
            .then((team) => {
              team.messages.push(message);
              team.save();
              // io.to(data.channelID).emit("newMessage", msg);
              // io.to(data.teamId).emit('newMessage', message);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

utils.getMostRecentMessages = async () => {
  return await Message.find().sort({ _id: -1 }).limit(10);
};

module.exports = utils;
