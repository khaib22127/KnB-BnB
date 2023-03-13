
import { useSelector, useDispatch } from "react-redux";
import { getSpotReviews } from "../../store/review";
import { useEffect} from "react";
import { useParams } from "react-router-dom";
import ReviewsCreate from "./ReviewsCreate";
import NumReviewAvgRating from "../Card/ReviewNumAvgRating";
import ReviewsItem from "./ReviewsItem";

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

const Reviews = () => {

  const { spotId } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots.singleSpot);

  const reviews = useSelector((state) => state.reviews.SpotReview);


  useEffect(() => {
    dispatch(getSpotReviews(+spotId));
  }, [dispatch, spotId]);

  return (
    <>
      <div key={spot.id} className={`post-your-review-container`}>
        {<NumReviewAvgRating singleSpot={spot} />}
      </div>
      <div>{<ReviewsCreate reviews={reviews} />}</div>
      <div className="ReviewItem-review-container">
        {<ReviewsItem reviews={reviews}/>}
      </div>
    </>
  );
};

export default Reviews;
