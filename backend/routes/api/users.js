// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check, body } = require('express-validator');
const { handleValidationErrors, userValidationErrors } = require('../../utils/validation');


const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  userValidationErrors
];



const validateUserInput = [
  body('email')
  .isEmail()
  .withMessage("Invalid email"),
  body('username')
  .exists({ checkFalsy: true })
  .withMessage('Username is required'),
  body('firstName')
  .exists({ checkFalsy: true })
  .withMessage('First Name is required'),
  body('lastName')
  .exists({ checkFalsy: true })
  .withMessage('Last Name is required'),
  userValidationErrors
];



router.post('/', validateUserInput, validateSignup, async (req, res, next) => {

  const { firstName, lastName, email, username, password } = req.body;

  const usernames = await User.findOne({ where: { username } })

  const emails = await User.findOne({ where: { email } })

  if (emails) {
      res.status(403)
      return res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
              "email": "User with that email already exists"
          }
      })
  };

  if (usernames) {
      res.status(403)
      return res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
              "username": "User with that username already exists"
          }
      })
  };

  const user = await User.signup({ firstName, lastName, email, username, password });

  const token = await setTokenCookie(res, user);

  // if (password) {
  //   token = password
  //   token = ""
  // }



  let data = {}
  data = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    token : ''
  }

    return res.json(data);
  });



module.exports = router;
