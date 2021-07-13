const mongoose = require('mongoose');
const schema = mongoose.Schema;

const MessageSchema = new schema({
  text: {
    type: String,
  },
  author: {
    type: schema.Types.ObjectId,
    ref: 'User',
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model('Message', MessageSchema);
