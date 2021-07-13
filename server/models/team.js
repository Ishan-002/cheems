const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TeamSchema = new schema({
  messages: [
    {
      type: schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  //   creator: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //   },
  participants: [
    {
      type: schema.Types.ObjectId,
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


module.exports = mongoose.model('Team', TeamSchema);
