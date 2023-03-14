// backend/routes/api/review.js
const express = require("express");

const {
  Spot,
  Review,
  SpotImage,
  User,
  ReviewImage,
  sequelize,
} = require("../../db/models");

const router = express.Router();
const { check, body } = require("express-validator");
const {
  userValidationErrors,
  reviewValidationErrors,
} = require("../../utils/validation");

const { requireAuth, userReviewPermission } = require("../../utils/auth");

const validateUserReviews = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars", "Stars must be an integer from 1 to 5")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 }),
  userValidationErrors,
];
const validateReviews = [
  body("url").exists().withMessage("Invalid Input"),
  reviewValidationErrors,
];

// Get all Reviews of the Current User
// Returns all the reviews written by the current user
// GET  /api/reviews/current
router.get("/current", requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
        include: [
          {
            model: SpotImage,
            attributes: ["url", "preview"],
          },
        ],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  if (!reviews) {
    res.status(400);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  let review = [];
  for (let ele of reviews) {
    review.push(ele.toJSON());
  }

  if (!review) {
    return null;
  }

  review.forEach((spot) => {
    if (spot.Spot.SpotImages.length > 0) {
      for (let image of spot.Spot.SpotImages) {
        if (image.preview === true) {
          spot.Spot.SpotImages = image.url;
          spot.Spot.previewImage = spot.Spot.SpotImages;
          delete spot.Spot.SpotImages;
        }
      }
    } else {
      // spot.Spot.SpotImages = {};
      spot.Spot.previewImage = spot.Spot.SpotImages;
      delete spot.Spot.SpotImages;
    }
  });

  res.json({ Reviews: review });
});

// Get all Reviews by a Spot's id
// GET /api/spots/:spotId/reviews
router.get("/:spotId/reviews", async (req, res) => {
  const spotId = req.params.spotId;

  const reviews = await Review.findAll({
    where: { spotId: spotId },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  const spot = await Spot.findByPk(spotId, {
    attributes: [],

    include: [
      {
        model: Review,
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName"],
          },
          {
            model: ReviewImage,
            attributes: ["id", "url"],
          },
        ],
      },
    ],
  });

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  return res.json(reviews);
});

// Create a Review for a Spot based on the Spot's id
// POST /api/spots/:spotId/reviews
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateUserReviews,
  async (req, res) => {
    const { review, stars } = req.body;
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }

    const reviewSpot = await Review.findAll({
      where: {
        spotId: req.params.spotId,
        userId: req.user.id,
      },
      include: [
        {
          model: Spot,
        },
      ],
    });

    if (!review || !stars) {
      res.status(400);
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          review: "Review text is required",
          stars: "Stars must be an integer from 1 to 5",
        },
      });
    }

    for (let ret of reviewSpot) {
      if (ret.userId) {
        res.status(403);
        return res.json({
          message: "User already has a review for this spot",
          statusCode: 403,
        });
      }
    }

    const newReview = await Review.create({
      userId: req.user.id,
      spotId: spot.id,
      review,
      stars,
    });

    await newReview.save();
    res.json(newReview);
    return;
  }
);

// Create an image for a Review
// POST /api/reviews/:reviewId/images
router.post(
  "/:reviewId/images",
  requireAuth,
  userReviewPermission,
  async (req, res) => {
    const reviewId = req.params.reviewId;

    //   const { user } = req;
    const { url } = req.body;

    const review = await Review.findByPk(reviewId);

    //   if (!review) {
    //     res.status(404);
    //     return res.json({
    //       message: "Review couldn't be found",
    //       statusCode: 404,
    //     });
    //   }

    //   if (review.userId !== user.id) {
    //     res.status(403);
    //     res.json({
    //       message: "Forbidden",
    //       statusCode: 403,
    //     });
    //     return;
    //   }

    if (!url) {
      res.status(400);
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          url: "url is required",
        },
      });
    }

    const numReviewsImage = await ReviewImage.count({
      where: { reviewId: review.id },
    });

    if (numReviewsImage >= 10) {
      res.status(403);
      return res.json({
        message: "Maximum number of images for this resource was reached",
        statusCode: 403,
      });
    }

    const addImage = await ReviewImage.create({
      reviewId: reviewId,
      url,
    });

    await addImage.save();
    res.json({
      id: addImage.id,
      url: addImage.url,
    });
  }
);

// Edit a Review
// PUT /api/reviews/:reviewId
router.put(
  "/:reviewId",
  requireAuth,
  userReviewPermission,
  validateUserReviews,
  async (req, res) => {
    const { user } = req;
    const reviewId = req.params.reviewId;
    const reviews = await Review.findByPk(reviewId);

    // if (!reviews) {
    //   res.status(404);
    //   return res.json({
    //     message: "Review couldn't be found",
    //     statusCode: 404,
    //   });
    // }

    //   if (reviews.userId !== user.id) {
    //     res.status(403);
    //     res.json({
    //       message: "Forbidden",
    //       statusCode: 403,
    //     });
    //     return;
    //   }

    const { review, stars } = req.body;

    reviews.userId = user.id;
    reviews.review = review;
    reviews.stars = stars;

    await reviews.save();
    res.json(reviews);
  }
);

// Delete a Review
// /api/reviews/:reviewId
router.delete(
  "/:reviewId",
  requireAuth,
  userReviewPermission,
  async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);

    await review.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
);

module.exports = router;
