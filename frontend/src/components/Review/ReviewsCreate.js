import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as reviewsActions from "../../store/review";
import { Popup } from "./Reviews";
import "./ReviewsCreate.css";
import { getSpotsBySpotId } from "../../store/spots";

const ReviewsCreate = ({ reviews }) => {
  const dispatch = useDispatch();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const [clicked, setClicked] = useState(false);

  const currentUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.singleSpot);

  const reviewsFromSpot = useSelector((state) => state.reviews.SpotReview);


  const number = (num) => {
    return Number(num);
  };

  let reviewUserId;
  Object.values(reviews).forEach((ele) => {
    if (!currentUser) return null;
    if (currentUser.id === ele.userId) {
      reviewUserId = ele.userId;
      return reviewUserId;
    }
    return (reviewUserId = ele.userId);
  });


  const submitReviewHandler = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(
      reviewsActions.createSpotReview(
        {
          review,
          stars,
        },
        spot.id
      )
    )
      .then(() => {
        setClicked(!clicked);
        // reset();
        dispatch(reviewsActions.getSpotReviews(spot.id));
        dispatch(getSpotsBySpotId(spot.id));
        dispatch(reviewsActions.getUserReviews())
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) return setErrors(data.errors);
      });
  };

  const togglePopup = () => {
    setClicked(!clicked);
    setReview("");
    setStars("");
    setErrors([]);
  };

  if (!reviewsFromSpot) return null;

  let isDisable;
  if (errors.length > 0 || !review || !stars || review.length < 10) {
    isDisable = true;
  } else {
    isDisable = false;
  }

  return (
    <div>
      {!currentUser ||
(currentUser.id === reviewUserId) ||
      currentUser?.id === spot?.ownerId ? null : (
        <div>
          <input
            id="post-your-review-btn"
            type="button"
            value="Post Your Review"
            onClick={togglePopup}
          />
        </div>
      )}

      {currentUser && (
        <div>
          {clicked && (
            <Popup
              content={
                <>
                  <div className="create-review-container">
                    <b>How was your stay</b>
                    <form
                      onSubmit={submitReviewHandler}
                      className="popUp"
                      id="myPopup"
                    >
                      <ul>
                        {Object.values(errors).map((error, idx) => (
                          <li style={{ color: "red" }} key={idx}>
                            {error}
                          </li>
                        ))}
                      </ul>
                      <div>
                        <label>
                          <textarea
                            className="text-box"
                            type="text"
                            placeholder="Leave a comment..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                          ></textarea>
                        </label>
                      </div>

                      <br />

                      <div className="star-container">
                        <input
                          id="star-input"
                          type="number"
                          // min="1"
                          // max="5"
                          value={stars}
                          onChange={(e) => setStars(number(e.target.value))}
                          required
                        ></input>
                        &nbsp;
                        <label> Stars</label>
                      </div>

                      <br />
                      <div className="review-submit-button">
                        <button type="submit" disabled={isDisable}>
                          Submit Your Review
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              }
              handleClose={togglePopup}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewsCreate;
