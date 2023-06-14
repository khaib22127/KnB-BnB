import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as reviewsActions from "../../store/review";
import * as spotsAction from "../../store/spots";
import ReviewStarInput from "./ReviewStarInput";
import "./ReviewForm.css"

const ReviewForm = ({ spot, userReview, submitType, formType, spotId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [review, setReview] = useState(userReview.review);
  const [stars, setStars] = useState(userReview.stars);
  const [errors, setErrors] = useState([]);

  const number1 = (num) => {
    return Number(num);
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (submitType === "Create") {
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
        closeModal();
        // dispatch(reviewsActions.getSpotReviews(spot.id));
        // dispatch(spotsAction.getSpotsBySpotId(spot.id));
        // dispatch(reviewsActions.getUserReviews());
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) return setErrors(data.errors);
      });
    }

     if (submitType === "Edit") {
      userReview = await dispatch(
        reviewsActions.editReview(
          {
            review,
            stars,
          },
         userReview.id
        )
      )
        .then(() => {
          closeModal();
          dispatch(spotsAction.getSpotsBySpotId(spotId));
          dispatch(reviewsActions.getSpotReviews(spotId));
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) return setErrors(data.errors);
        });
    }
  };

  const onChange = (stars) => {
    setStars(number1(stars));
  };

  let isDisable;
  if (errors.length > 0 || !review || !stars || review.length < 10) {
    isDisable = true;
  } else {
    isDisable = false;
  }

  return (
    <div className="Review_form-main-container">
        <form
          onSubmit={submitReviewHandler}
        >
      <div className="review-form-inner-container">
        <h1>{formType}</h1>
        <p>How was your stay?</p>
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
            <ReviewStarInput
              clicked={false}
              onChange={onChange}
              setStars={setStars}
              stars={stars}
            />
            &nbsp;
            <label> Stars</label>
          </div>

          <br />
          <div className="review-submit-button">
            <button type="submit" disabled={isDisable}>
              Submit Your Review
            </button>
          </div>
      </div>
        </form>
    </div>
  );
};

export default ReviewForm;
