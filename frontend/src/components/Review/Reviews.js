import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NumReviewAvgRating from "../Card/ReviewNumAvgRating";
import ReviewsItem from "./ReviewsItem";
import * as reviewsActions from "../../store/review";
import ReviewCreatePost from "./ReviewsCreatePost";
import { useModal } from "../../context/Modal";
import './Reviews.css'


const Reviews = ({ spot }) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.reviews.SpotReview);

  const currentUser = useSelector((state) => state.session.user);
  const { setModalContent } = useModal();

  useEffect(() => {
    dispatch(reviewsActions.getSpotReviews(+spotId));
    if (currentUser) {
      dispatch(reviewsActions.getUserReviews());
    }
  }, [dispatch, spotId, currentUser]);

  let reviewUserId;
  Object.values(reviews).forEach((ele) => {
    if (!currentUser) return null;
    if (currentUser.id === ele.userId) {
      reviewUserId = ele.userId;
      return reviewUserId;
    }
    return (reviewUserId = ele.userId);
  });

  // if (!reviews) return null;

  return (
    <div className="post-delete_and-posted-review-container">
      <div key={spot.id} className={`post-your-review-container`}>
        {spot.numReviews === 0 && (
          <div>
            <div className="no-review_yet">★New</div>
            <div id="be-the-first-to-post" >Be the first to post a review!</div>
          </div>
        )}
        {<NumReviewAvgRating singleSpot={spot} />}
      </div>

      <div>
        {!currentUser ||
        currentUser.id === reviewUserId ||
        currentUser?.id === spot?.ownerId ? null : (
          <div id="post-your-review-btn-container">
            <button
              id="post-your-review-btn"
              onClick={() => setModalContent(<ReviewCreatePost spot={spot} />)}
            >
              Post Your Review
            </button>
          </div>
        )}
      </div>
      <div className="ReviewItem-review-container">
        {Object.values(reviews).map((ele) => (
          <ReviewsItem ele={ele} key={ele.id} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
