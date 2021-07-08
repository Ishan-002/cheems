const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Load input validation
const validateRegistration = require('../auth/validateRegistration');
const validateLogin = require('../auth/validateLogin');

// Load User model
const User = require('../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  // Form validation
  console.log('Registration of the form has started');

  const { formErrors, isValid } = validateRegistration(req.body);
  // Check validation
  console.log('Errors in the validation are...');
  console.log(formErrors);
  console.log(`The form is valid: ${isValid}`);

  if (!isValid) {
    return res.status(400).json({ error: 'Bad request, please try again.' });
  }

  User.findOne({
    $or: [
      {
        email: req.body.email,
      },
      {
        username: req.body.username,
      },
    ],
  })
    .then((user) => {
      if (user) {
        let error = {};
        if (user.username === req.body.username) {
          error.username = 'Username already exists.';
        } else if (user.email === req.body.email) {
          error.email = 'Email already exists.';
        }
        console.log('email/username already used');
        return res.status(400).json(error);
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        console.log(newUser);
        newUser
          .save()
          .then(() => {
            res.status(200).send();
          })
          .catch((err) => {
            console.log(err);
            res
              .status(500)
              .json({ error: 'Internal server error, please try again.' });
          });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'Internal server error, please try again.' });
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation
  const { formErrors, isValid } = validateLogin(req.body);

  // Check validation
  console.log('Errors in the validation are...');
  console.log(formErrors);
  console.log(`The form is valid: ${isValid}`);
  if (!isValid) {
    return res.status(400).json({ error: 'Bad request, please try again.' });
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    .then((user) => {
      // Check if user exists
      if (!user) {
        return res.status(400).json({ error: 'Email not found' });
      }

      // Check password
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // User matched
            // Creating JWT payload
            const payload = {
              email: user.email,
              name: user.username,
            };
            // Sign JWT token
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {
                expiresIn: '12h',
              },
              (err, token) => {
                res.status(200).json({
                  success: true,
                  token: token,
                  user: user,
                });
              }
            );
          } else {
            return res.status(400).json({ error: 'Incorrect Password' });
          }
        })
        .catch(() => res.status(500).json({ error: 'Internal server error' }));
    })
    .catch(() => res.status(500).json({ error: 'Internal server error' }));
});

// @route GET api/users/login
// @desc Login user and return JWT token
// @access Public
router.get('/login', (req, res) => {
  let header = req.header('authorization');
  let headerArray = header.split(' ');
  const decodedJWT = jwt.verify(headerArray[1], process.env.JWT_SECRET);
  try {
    const email = decodedJWT.email;
    User.findOne({ email })
      .then((user) => {
        if (user) {
          res.status(200).json({ user });
        } else {
          res.status(400).send();
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  } catch {
    res.status(400).send();
  }
});

module.exports = router;
