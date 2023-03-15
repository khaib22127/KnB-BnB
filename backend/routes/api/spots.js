// backend/routes/api/spots.js
const express = require("express");

const { Op } = require("sequelize");
const { Spot, Review, SpotImage, User, sequelize } = require("../../db/models");
const router = express.Router();
const { check, query } = require("express-validator");
const { userValidationErrors } = require("../../utils/validation");
const { requireAuth, userPermission } = require("../../utils/auth");
const review = require("../../db/models/review");

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists()
    .isNumeric({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists()
    .isNumeric({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists()
    .isInt({ min: 0 })
    .withMessage("Price per day is required"),
  userValidationErrors,
];

const queryValidation = [
  query("page")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 1"),
  query("size")
    .optional({ checkFalsy: true })
    .isNumeric({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Size must be greater than or equal to 1"),
  query("maxLat")
    .optional({ checkFalsy: true })
    .isInt()
    // .isInt({ max: 90 })
    .withMessage("Maximum latitude is invalid"),
  query("minLat")
    .optional({ checkFalsy: true })
    .isInt()
    // .isInt({ min: -90 })
    .withMessage("Minimum latitude is invalid"),
  query("minLng")
    .optional({ checkFalsy: true })
    .isInt()
    // .isInt({ min: -180 })
    .withMessage("Maximum longitude is invalid"),
  query("maxLng")
    .optional({ checkFalsy: true })
    .isInt()
    // .isInt({ max: 180 })
    .withMessage("Minimum longitude is invalid"),
  query("minPrice")
    .optional({ checkFalsy: true })
    .isInt({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  query("maxPrice")
    .optional({ checkFalsy: true })
    .isInt({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  userValidationErrors,
];

// // Get all spots
// // GET /api/spots
// router.get('/', async (req, res, next) => {

//     let spots = await Spot.findAll({
//         include: [
//             {
//                 model: Review,
//                 attributes: []
//             },
//             {
//                 model: SpotImage,
//                 attributes: ['id', 'url', 'preview'],
//             },
//         ],
//         attributes: {
//             include: [
//                 [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'],
//             ],
//         },
//         group: ['Spot.id', 'SpotImages.id'],
//     });

//     let allSpots = [];

//     spots.forEach(spot => {
//         allSpots.push(spot.toJSON())
//     });

//     allSpots.forEach(spot => {

//         if (!spot.avgStarRating) {
//             delete spot.avgStarRating
//         } else if (!spot.SpotImages[0]) {
//             spot.SpotImages = []
//             spot.previewImage = spot.SpotImages
//             delete spot.previewImage;
//         }

//         spot.SpotImages.forEach(image => {
//
//             if (image.preview === true) {
//                 spot.previewImage = spot.preview
//                 spot.previewImage = image.url;
//             }

//         })
//         //     delete spot.Reviews
//         delete spot.SpotImages
//     })

//     res.json({ Spots: allSpots })

// });

// Get all spots
// GET /api/spots
router.get("/", queryValidation, async (req, res, next) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  // const rating = await Review.getAvgStarReview();

  if (!page) page = 1;
  if (!size) size = 20;

  page = parseInt(page);
  size = parseInt(size);

  const pagination = {};

  if (
    Number.isInteger(page) &&
    Number.isInteger(size) &&
    page > 0 &&
    size > 0 &&
    size <= 20
  ) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }

  let where = {};

  if (minLat) {
    where = {
      lat: {
        [Op.gte]: +minLat,
      },
    };
  }

  if (maxLat) {
    where = {
      lat: {
        [Op.lte]: +maxLat,
      },
    };
  }

  if (minLng) {
    where = {
      lng: {
        [Op.gte]: +minLng,
      },
    };
  }

  if (maxLng) {
    where = {
      lng: {
        [Op.lte]: +maxLng,
      },
    };
  }

  if (minPrice) {
    where = {
      price: {
        [Op.gte]: +minPrice,
      },
    };
  }

  if (maxPrice) {
    where = {
      price: {
        [Op.lte]: +maxPrice,
      },
    };
  }

  let spots = await Spot.findAll({
    where,
    include: [
      {
        model: Review,
      },
      {
        model: SpotImage,
      },
    ],

    ...pagination,
  });

  let allSpots = [...spots];

  let spot = [];
  allSpots.forEach((spot1) => {
    spot.push(spot1.toJSON());
  });

  for (let i = 0; i < spot.length; i++) {
    let spots = spot[i];

    let arrID = [];
    let arrStars = [];
    spots.Reviews.forEach((reviewStar) => {
      arrStars.push(reviewStar.stars);
    });

    const starAvg = arrStars.reduce((a, b) => (a + b) / arrStars.length , 0);

    if (!spots.Reviews) {
      return {};
    } else {
      spots.avgRating = starAvg;
      delete spots.Reviews;
    }
    spots.SpotImages.forEach((image) => {
      arrID.push(image.id);
    });

    let smallestId = Math.min(...arrID);

    let arry = spots.SpotImages.find((obj) => obj.id === smallestId);

    if (!spots.SpotImages) return {};
    if (arry.preview === true && arry.preview) {
      spots.previewImage = arry.url;
      delete spots.SpotImages;
    } else {
      return spots.SpotImages;
    }
  }



  // let allSpots = [];

  // spots.forEach((spot) => {
  //     allSpots.push(spot.toJSON());
  // });

  // allSpots.forEach((spot) => {
  //     if (!spot.Reviews[0]) {
  //         spot.Reviews = [];
  //         spot.avgRating = spot.Reviews;
  //     }
  //     if (!spot.SpotImages[0]) {
  //         spot.SpotImages = [];
  //         spot.previewImage = spot.SpotImages;
  //     }

  //     spot.Reviews.forEach((star) => {
  //         for (let id of rating) {
  //             if (star.spotId === id.spotId) {
  //                 spot.avgRating = id.dataValues.avgRating;
  //             }
  //             delete spot.Reviews;
  //         }
  //     });

  //     spot.SpotImages.forEach((image) => {
  //         if (image.preview === true) {
  //             spot.previewImage = spot.preview;
  //             spot.previewImage = image.url;
  //         }
  //     });
  //     delete spot.Reviews;
  //     delete spot.SpotImages;
  // });

  res.json({ Spots: spot, page, size });

});

// get spots of current user
// GET /api/spots/current
router.get("/current", requireAuth, async (req, res) => {
  const spot = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
    // attributes: {
    //   include: [
    //     [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
    //   ],
    // },
    include: [
      {
        model: Review,
        attributes: [
          [
            sequelize.fn("AVG", sequelize.col("Reviews.stars")),
            "avgRating",
          ],
        ],
      },
      {
        model: SpotImage,
        attributes: ["url", "preview"],
      },
    ],
    group: ["Spot.id", "SpotImages.id"],
  });

  let spots = [];
  spot.forEach((ele) => {
    spots.push(ele.toJSON());
  });

  spots.forEach((images) => {
    if (images.Reviews[0] === undefined) {
      images.Reviews[0] = 0;
      images.avgRating = images.Reviews[0];
    } else if (images.Reviews[0]) {
      images.avgRating = images.Reviews[0].avgRating;
    }

    if (images.SpotImages[0] === undefined) {
      images.SpotImages[0] = [];
      images.previewImage = images.SpotImages[0];
    }

    images.SpotImages.forEach((preImage) => {
      if (preImage.preview === true) {
        images.previewImage = images.preview;
        images.previewImage = preImage.url;
      }
    });
    delete images.SpotImages;
    delete images.Reviews;
  });

  res.json({ Spots: spots });
});

// Get details of a Spot from an id
// GET /api/spots/:spotId
router.get("/:spotId", async (req, res) => {
  // let spot = await Spot.findByPk(req.params.spotId, {
  //     attributes: {
  //         include: [
  //             [sequelize.fn('COUNT', sequelize.col('Reviews.review')), 'numReviews'],
  //             [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'],
  //         ],
  //     },
  //     include: [
  //         {
  //             model: Review,
  //             attributes: [],
  //         },
  //         {
  //             model: SpotImage,
  //             attributes: ['id', 'url', 'preview'],
  //         },
  //         {
  //             model: User,
  //             attributes: ['id', 'firstName', 'lastName'],
  //         }
  //     ],

  //     group: ['Spot.id', 'SpotImages.id', 'User.id'],
  // })

  // if (!spot) {
  //     res.status(404)
  //     return res.json({
  //         "message": "Spot couldn't be found",
  //         "statusCode": 404
  //     })
  // }

  // let p = [];
  // p.push(spot.toJSON())

  // p.forEach(ele => {
  //     if (!ele.avgStarRating) {
  //         ele.avgStarRating = []
  //     }
  //     ele.Owners = ele.User
  //     delete ele.User

  // })

  // res.json(p[0])

  let spot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
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

  const numReviews = await Review.count({
    where: { spotId: req.params.spotId },
  });

  let reviews = await Review.findAll({
    where: { spotId: req.params.spotId },
    attributes: [
      [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
    ],
  });

  if (!reviews) {
    return (reviews = []);
  }

  let result = [];
  for (let starRating of reviews) {
    result.push(starRating.toJSON());
  }
  if (!result[0].avgStarRating) {
    result[0].avgStarRating = [];
  }

  let data = {};

  data.spot = data;
  data = {
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    numReviews: numReviews,
    avgStarRating: result[0].avgStarRating,
    SpotImages: spot.SpotImages,
    Owner: spot.User,
  };

  res.json(data);
});

// Create a Spot
// Creates and returns a new spot
// POST /api/spots
router.post("/", requireAuth, validateSpot, async (req, res) => {
  const { user } = req;

  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  await spot.save();
  res.json(spot);
  return;
});

// Add an Image to a Spot based on the Spot's id
// Create and return a new image for a spot specified by id.
// POST  /api/spots/:spotId/images
router.post(
  "/:spotId/images",
  requireAuth,
  userPermission,
  async (req, res) => {
    const spotId = req.params.spotId;
    const ownerId = req.user.id;
    const spot = await Spot.findAll({
      where: {
        ownerId,
      },
    });

    if (!spot) {
      res.status(404);
      res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }
    const { url, preview } = req.body;

    const image = await SpotImage.create({
      spotId: spotId,
      url,
      preview,
    });

    return res.json({
      id: image.id,
      url: image.url,
      preview: image.preview,
    });
  }
);

// Edit a Spot
// PUT /api/spots/:spotId
router.put(
  "/:spotId",
  requireAuth,
  userPermission,
  validateSpot,
  async (req, res) => {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    let spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      res.status(404);
      res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }

    spot.ownerId = req.user.id;
    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    await spot.save();
    return res.json(spot);
  }
);

// Deletes an existing spot
// DELETE /api/spots/:spotId
router.delete("/:spotId", requireAuth, userPermission, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  await spot.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
