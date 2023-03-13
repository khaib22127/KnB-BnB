import * as reviewsActions from "../../store/review";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getSpotsBySpotId } from "../../store/spots";

const ReviewsItem = ({ reviews }) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);

  let reviewId;

  Object.values(reviews).forEach((ele) => {
    if (!currentUser) return null;
    if (currentUser.id === ele.userId) {
      reviewId = ele.id;
      return reviewId;
    }
    return (reviewId = ele.id);
  });

  const deleteButtonHandler = () => {
    dispatch(reviewsActions.deleteReviewFromSpot(reviewId)).then(() => {
      dispatch(reviewsActions.getSpotReviews(+spotId));
      dispatch(getSpotsBySpotId(+spotId));
    });
  };


  return (
    <div className="single-review-container">
      {Object.values(reviews).map((ele) => (
        <div key={`reviews${ele.id}`} className={`review-from`}>
          <div className={`reviews${ele.id} newly-created-review`}>
            <div>{ele.User?.firstName}</div>
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
        </div>
      ))}
    </div>
  );
};

export default ReviewsItem;
