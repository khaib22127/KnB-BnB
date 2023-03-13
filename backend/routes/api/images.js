const express = require('express')


const { Spot, Review, SpotImage, ReviewImage } = require('../../db/models');
const router = express.Router();


const { requireAuth } = require('../../utils/auth');



// Delete a Spot Image
// DELETE /api/spot-images/:imageId
router.delete('/spot-images/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId;
    const userId = req.user.id

    const spotImage = await SpotImage.findByPk(imageId, {
        include: [{
            model: Spot
        }]
    });

    if (!spotImage) {
        res.status(404)
        res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
        return;
    } else if (spotImage.Spot.ownerId !== userId) {
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
        return;
    }


    await spotImage.destroy();
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})




// Delete a Review Image
// DELETE  /api/review-images/:imageId
router.delete('/review-images/:imageId', requireAuth, async (req, res) => {
    const user = req.user.id;
    const imageId = req.params.imageId;

    const reviewImage = await ReviewImage.findByPk(imageId, {
        include: [{
            model: Review
        }]
    })

if (!reviewImage) {
    res.status(404)
    res.json({
        "message": "Review Image couldn't be found",
        "statusCode": 404
      })
    return;
} else if (reviewImage.Review.userId !== user) {
    res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
        return;
}

    await reviewImage.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
      return;
});


module.exports = router;
