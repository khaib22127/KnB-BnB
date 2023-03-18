const { Spot, Review, SpotImage} = require("../db/models");

const smallestIdSpotImages = async (spott) => {
  const spot = await Spot.findByPk(spott.id, {
    include: [
      {
        model: SpotImage,
      },
    ],
  });

  const spots = spot.toJSON();
  let arrID = [];
  let res;
  if (spots.SpotImages.length) {
    spots.SpotImages.forEach((image) => {
      arrID.push(image.id);
      let smallestId = Math.min(...arrID);
      if (image.id === smallestId) {
        res = image.url;
      }
    });
  }

  return res;
};

const spotAverageStarRating = async (spott) => {
  const spot = await Spot.findByPk(spott.id, {
    include: [
      {
        model: Review,
      },
    ],
  });
  const spots = spot.toJSON();

  let starAvg;
  let arrStars = [];
  if (spots.Reviews.length) {
    spots.Reviews.forEach((reviewStar) => {
      arrStars.push(reviewStar.stars);
      starAvg = arrStars.reduce((a, b) => (a + b) / arrStars.length);
    });
  }
  return starAvg;
};

module.exports = {
  smallestIdSpotImages,
  spotAverageStarRating,
};
