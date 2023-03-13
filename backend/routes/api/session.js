// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { userValidationErrors } = require('../../utils/validation');


const validateLogin = [
  check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Email or username is required'),
  check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required'),
  userValidationErrors
];



// Log in
// POST /api/session
router.post('/', validateLogin, async (req, res, next) => {

        const { credential, password } = req.body;

  const user = await User.login({ credential, password });
        if (!user) {
          res.status(401);
          return res.json({
                  "message": "Invalid credentials",
                  "statusCode": 401
          })
        }


  await setTokenCookie(res, user);

  return res.json({
      user: user,
  });
}
);


// Log out
// DELETE /api/session
router.delete('/', (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);


// Restore session user
// GET /api/session
  // router.get(
  //   '/',
  //   restoreUser,
  //   (req, res) => {
  //     const { user } = req;
  //     if (user) {
  //       return res.json(
  //        {user: user.toSafeObject()}
  //       );
  //     } else return res.json({ user: null });
  //   }
  // );
  router.get("/", restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({ user: user.toSafeObject() });
    } else return res.json({ user: null });
  });





module.exports = router;
