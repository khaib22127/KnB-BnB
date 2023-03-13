import * as reviewsActions from "../../store/review";
import { useSelector, useDispatch } from "react-redux";
import { getSpotReviews } from "../../store/review";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReviewsCreate from "./ReviewsCreate";
import { getSpotsBySpotId } from "../../store/spots";
import NumReviewAvgRating from "../Card/ReviewNumAvgRating";

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
  const history = useHistory();
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState([]);

  const currentUser = useSelector((state) => state.session.user);
  let reviewId;
  //   console.log("spot in reviews: ====> ", spot.id);
  const spot = useSelector((state) => state.spots.oneSpot);
  useEffect(() => {
    dispatch(getSpotReviews(+spotId));
  }, [dispatch, spotId]);
  const reviews = useSelector((state) => state.reviews.SpotReview);
  const spotReview1 = Object.values(reviews);
  //   const reviews = Object.values(thisSpotreviews);

  spotReview1.forEach((ele) => {
    if (!currentUser) return;
    if (currentUser.id === ele.userId) {
      return (reviewId = ele.id);
    }
  });

  // console.log("reviewId in reviews: ====> ", normalizingReviewData(spotReview1));
  // console.log("this is the user id: ===> ", currentUser)

  // let reviewUserId;
  // spotReview1.find((ele) => (reviewUserId = ele.userId));

  // console.log("reviewId in reviews: ====> ", reviewId);

  const deleteButtonHandler = () => {
    dispatch(reviewsActions.deleteReviewFromSpot(reviewId)).then(() => {
      dispatch(reviewsActions.getSpotReviews(+spotId));
      dispatch(getSpotsBySpotId(+spotId));
    });
  };

  // if (!currentUser) {
  //     return null;
  //     // history.push("/");
  //   }
  // if (!currentUser) return;
  if (!reviews) return "No review yet, go look at Reviews.js";
  if (!spotReview1) return "No review yet, go look at Reviews.js2222";
  return (
    <>
      <div key={spot.id} className={`post-your-review-container`}>
        {/* <span>
          {spot.avgStarRating.length !== 0
            ? `★${Number(spot.avgStarRating).toFixed(2)} `
            : null}
        </span> */}
        {<NumReviewAvgRating singleSpot={spot}/>}
        {/* <span style={{ fontSize: "40px" }}> . </span> */}
        <span>{spot.numReviews ? `  ${spot.numReviews} Reviews` : "★New"}</span>
      </div>
      <div>{<ReviewsCreate />}</div>
      <div className="single-review-container">
        {spotReview1
          ? spotReview1.map((ele) => (
              <div key={`reviews${ele.id}`} className={`review-from`}>
                {/* <div>{new Date(ele.createdAt).toLocaleDateString()}</div> */}

                <div className={`reviews${ele.id} newly-created-review`}>
                  <div>{ele.User.firstName}</div>
                  <div>{ele.createdAt.slice(0, 10)}</div>
                  <div>{ele.review}</div>
                  {currentUser && currentUser.id === ele.userId && (
                    <div>
                      <button type="submit" onClick={deleteButtonHandler}>
                        DELETE
                      </button>
                    </div>
                  )}
                </div>

                {/* <ReviewCard spotReviews={ele} /> */}
              </div>
            ))
          : "Be the first to post a review"}
      </div>
    </>
  );
};

export default Reviews;
