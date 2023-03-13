import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as reviewsActions from "../../store/review";

import { createSpotReview, getSpotReviews } from "../../store/review";
import { useModal } from "../../context/Modal";
import { Popup } from "./Reviews";
import { useParams } from "react-router-dom";

import { getSpotsBySpotId } from "../../store/spots";

const ReviewsCreate = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const [clicked, setClicked] = useState(false);

  const currentUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.oneSpot);

  const reviewsFromSpot = useSelector((state) => state.reviews.SpotReview);

  // console.log("looking for ++ currentUser ++ in create reviews: ===> ", currentUser.id);

  // console.log(
  //   "looking for ++ spot ++ in create reviews: ===> ",
  //   spot.ownerId !== currentUser.id
  // );

  let reviewUserId;
  Object.values(reviewsFromSpot).find((ele) => (reviewUserId = ele.userId));

  // console.log(
  //   "looking for ++ reviewUserId ++ in create reviews: ===> ",
  //   reviewUserId
  // );

  //   useEffect(() => {
  //   let err = [];
  //   //  if (reviewUserId === currentUser.id) {
  //   //        err.push("You already have a post review");
  //   //     }
  //   // if (stars < 0 || stars > 5) {
  //   //   err.push("Stars must be an integer from 1 to 5");
  //   // }
  //   dispatch(reviewsActions.getSpotReviews(+spotId))
  //   dispatch(reviewsActions.createSpotReview(spot.id))

  //   setErrors(err);
  // }, [dispatch, spotId]);

  const number = (num) => {
    return Number(num);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    // if (reviewUserId === currentUser.id) {
    //   setErrors(["You already have a post review"]);
    // }
    // if (stars < 0 || stars > 5) {
    //   setErrors(["Stars must be an integer from 1 to 5"]);
    //   setStars("");
    // }
    // if (errors.length === 0) {
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
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) return setErrors(data.errors);
      });
    // }
  };

  const togglePopup = () => {
    setClicked(!clicked);
    setReview("");
    setStars("");
    setErrors([]);
  };

  // if (!currentUser) return null;

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
      currentUser?.id === reviewUserId ||
      currentUser?.id === spot.ownerId ? null : (
        <div>
          <input
            id="post-your-review-btn"
            type="button"
            value="Post Your Review"
            onClick={togglePopup}
          />
        </div>
      )}

      {/* {errors.length > 0 && (
          <ul className="error-list">
            {Object.values(errors).map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )} */}

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
