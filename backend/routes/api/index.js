// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");

const spotsRouter = require('./spots.js');

const reviewsRouter = require('./reviews.js');
const spotsReviewsRouter = require('./reviews.js')

const bookingsRouter = require('./bookings.js')
const spotsBookingsRouter = require('./bookings.js')

const deleteSpotsImagesRouter = require('./images.js');

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

router.use('/spots', spotsRouter)

router.use('/spots', spotsReviewsRouter)
router.use('/reviews', reviewsRouter)

router.use('/bookings', bookingsRouter)
router.use('/spots', spotsBookingsRouter)

router.use('/', deleteSpotsImagesRouter)
module.exports = router;
