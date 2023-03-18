import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewsCreate from "./ReviewsCreate";
import NumReviewAvgRating from "../Card/ReviewNumAvgRating";
import ReviewsItem from "./ReviewsItem";
import * as reviewsActions from "../../store/review";

export const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};

const Reviews = ({spot}) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.reviews.SpotReview);


  const currentUser = useSelector((state) => state.session.user);


  useEffect(() => {
    dispatch(reviewsActions.getSpotReviews(+spotId));
    if (currentUser) {

      dispatch(reviewsActions.getUserReviews())
    }
  }, [dispatch, spotId, currentUser]);

  if (!reviews) return null;

  return (
    <>
      <div key={spot.id} className={`post-your-review-container`}>
        {<NumReviewAvgRating singleSpot={spot} />}
      </div>
      <div>{<ReviewsCreate reviews={reviews} />}</div>
      <div className="ReviewItem-review-container">
        {Object.values(reviews).map((ele) => (
          <ReviewsItem ele={ele} key={ele.id}/>
        ))}
      </div>
    </>
  );
};

export default Reviews;
