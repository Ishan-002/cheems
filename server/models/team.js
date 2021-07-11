const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  //   creator: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //   },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  teamName: {
    type: String,
    required: true,
  },
  //   created_at: {
  //     type: Date,
  //     default: Date.now,
  //   },
  //   channel_picture: {
  //     type: String,
  //     default: '/img/placeholder.png',
  //   },
});

module.exports = mongoose.model('Channel', ChannelSchema);
