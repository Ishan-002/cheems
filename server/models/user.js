const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;

const saltRounds = 10;

const UserSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  teams: [
    {
      type: schema.Types.ObjectId,
      ref: 'Team',
    },
  ],
});

// Hashing password before storing it
UserSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

// // checks if the entered password is same as the saved one
// UserSchema.methods.isPasswordCorrect = (password, callback) => {
//   bcrypt.compare(password, this.password, (err, same) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(err, same);
//     }
//   });
// };

module.exports = mongoose.model('User', UserSchema);
