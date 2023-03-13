// backend/routes/api/booking.js
const express = require('express')


const { Spot, SpotImage, User, Booking, sequelize } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { userValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');


const validateSpot = [
    check('endDate')
        .toDate(),
    check('startDate').toDate().custom((startDate, { req }) => {
        if (startDate.getTime() > req.body.end.getTime()) {
            throw new Error('start date must be before end date');
        }
        return true
    }),
    userValidationErrors
];

// Get all of the Current User's Bookings 
// GET /api/bookings/current
router.get('/current', requireAuth, async (req, res) => {

    // let { id, spotId, userId, startDate, endDate, createdAt, updatedAt } = req.body;

    let booking = await Booking.findAll({
        where: {
            userId: req.user.id,
        },
        include: [{
            model: Spot,
            attributes: {
                exclude: ["createdAt","updatedAt"]
            },
            include: [
                {
                    model: SpotImage,
                    attributes: ['url', 'preview'],
                },
            ],
        }]
    });



    let userBooking = [];
    for (let i of booking) {
        userBooking.push(i.toJSON());
    }


    for (let b = 0; b < userBooking.length; b++) {
        let userBook = userBooking[b]

        userBook.Bookings = {
            id: userBook.id,
            spotId: userBook.spotId,
            Spot: userBook.Spot,
            userId: userBook.userId,
            startDate: userBook.startDate,
            endDate: userBook.endDate,
            createdAt: userBook.createdAt,
            updatedAt: userBook.updatedAt,
        }
    }


    const data = []
    userBooking.forEach(result => {
        data.push(result.Bookings)
    })

    data.forEach(element => {
        if (element.Spot.SpotImages[0] === undefined) {
            element.Spot.SpotImages = [];
            element.Spot.previewImage = element.Spot.SpotImages
            delete element.Spot.SpotImages
        } else {
            element.Spot.SpotImages.forEach(result => {
                if (result.preview === true) {
                    element.Spot.SpotImages = result.url
                    element.Spot.previewImage = element.Spot.SpotImages
                    delete element.Spot.SpotImages
                }
            })
        }
    })

    res.json({ Bookings: data })

})


// Get all Bookings for a Spot based on the Spot's id
// GET /api/spots/:spotId/bookings
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const user = req.user.id;

    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    });


    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })

    }
    const booking = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })

    let spotResult = [];
    for (let i of booking) {
        spotResult.push(i.toJSON());
    }

    for (let i of spotResult) {

        i.spotOwner = {
            User: i.User,
            id: i.id,
            spotId: i.spotId,
            userId: i.userId,
            startDate: i.startDate,
            endDate: i.endDate,
            createdAt: i.createdAt,
            updatedAt: i.updatedAt,
        }

        i.notSpotOwner = {
            spotId: i.spotId,
            startDate: i.startDate,
            endDate: i.endDate,
        }
    }

    const spotOwnerData = [];
    const notSpotOwnerData = [];
    for (let result of spotResult) {
        spotOwnerData.push(result.spotOwner)
        notSpotOwnerData.push(result.notSpotOwner)
    }



    if (user === spot.ownerId) {

        res.json({ Bookings: spotOwnerData })
    } else {

        res.json({ Bookings: notSpotOwnerData })
    }
})


// Create a Booking from a Spot based on the Spot's id
//  /api/spots/:spotId/bookings
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {

    const { endDate, startDate } = req.body;

    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Booking
            }
        ]
    });
    const booking = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    });

    const todayDate = new Date().getTime();

    if (!spot) {
        const err = {}
        err.message = 'Spot couldn\'t be found';
        err.status = 404;
        err.title = 'Spot couldn\'t be found';
        err.statusCode = 404;
        return next(err);
    } else if (spot.ownerId === req.user.id) {
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
        return;
    } else if (startDate >= endDate) {
        const err = {}
        err.title = 'endDate cannot come before startDate';
        err.status = 400;
        err.message = "Validation error",
            err.statusCode = 400;
        err.errors = { "endDate": "endDate cannot come before startDate" }
        return next(err);
    }


    for (let book of booking) {

        let currentBookingStartDate = book.startDate.getTime()
        let currentBookingEndDate = book.endDate.getTime();

        newBookingStartDate = new Date(startDate).getTime()
        newBookingEndDate = new Date(endDate).getTime()

        if (!newBookingStartDate || !newBookingEndDate) {
            res.status(404);
            return res.json({
                "message": "The input date does not exist!!",
                "statusCode": 404
            })
        }
        // else if (newBookingStartDate < todayDate) {
        //     res.status(404);
        //     return res.json({
        //         "message": "Can not book date in the past!!",
        //         "statusCode": 404
        //     })
        // }

        if (newBookingStartDate >= currentBookingStartDate
            && newBookingStartDate <= currentBookingEndDate
            && newBookingEndDate >= currentBookingStartDate) {
            const err = {}
            err.title = 'Sorry, this spot is already booked for the specified dates';
            err.status = 403;
            err.message = "Sorry, this spot is already booked for the specified dates",
                err.statusCode = 403;
            err.errors = {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
            return next(err);
        }
    }

    const newBooking = await Booking.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        startDate,
        endDate
    })

    await newBooking.save();
    res.json(newBooking)
})





// Edit a Booking
// /api/bookings/:bookingId
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { endDate, startDate } = req.body;

    const booking = await Booking.findByPk(req.params.bookingId)


    if (!booking) {
        res.status(404);
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        });
        return;
    }

    if (booking.userId !== req.user.id) {
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
        return;
    }


    const currentBookingStartDate = booking.startDate.getTime()
    const currentBookingEndDate = booking.endDate.getTime();

    const newBookingStartDate = new Date(startDate).getTime()
    const newBookingEndDate = new Date(endDate).getTime()

    const todayDate = new Date().getTime();

    if (newBookingEndDate <= newBookingStartDate) {
        res.status(400);
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
        return;
    }

    if (!newBookingStartDate || !newBookingEndDate) {
        res.status(404);
        return res.json({
            "message": "Invalid Date",
            "statusCode": 404
        })
    }

    if (currentBookingEndDate <= todayDate) {
        res.status(403)
        res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        });
        return;
    }

    if (newBookingStartDate >= currentBookingStartDate
        && newBookingStartDate <= currentBookingEndDate
        && newBookingEndDate >= currentBookingStartDate) {
        res.status(403);
        res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        });
        return;
    }






    booking.startDate = startDate
    booking.endDate = endDate
    await booking.save();

    res.json(booking)
})



// Delete a Booking
// DELETE /api/bookings/:bookingId
router.delete('/:bookingId', requireAuth, async (req, res, next) => {

    const booking = await Booking.findByPk(req.params.bookingId);


    if (!booking) {
        res.status(404)
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
        return;
    }


    const todayDate = new Date().getTime();
    const currentBookingStartDate = booking.startDate.getTime()
    const currentBookingEndDate = booking.endDate.getTime();

    if (booking.userId !== req.user.id) {
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
        return;
    } else if (currentBookingStartDate <= todayDate && currentBookingEndDate >= todayDate) {
        res.status(403);
        res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })
        return;
    }

    await booking.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})



module.exports = router;
