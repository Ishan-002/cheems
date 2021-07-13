const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TeamSchema = new schema({
  messages: [
    {
      type: schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
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
});

module.exports = mongoose.model('Team', TeamSchema);
