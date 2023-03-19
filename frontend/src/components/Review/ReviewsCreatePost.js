import { useModal } from "../../context/Modal";
import { useState} from "react";
import { useDispatch } from "react-redux";
import * as reviewsActions from "../../store/review";
import * as spotsAction from "../../store/spots";
import ReviewsCreatePostStarInput from "./ReviewsCreatePostStarInput";
import "./ReviewsCreatePost.css";

const ReviewCreatePost = ({spot }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);


  const number1 = (num) => {
    return Number(num);
  };

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
        closeModal();
        dispatch(reviewsActions.getSpotReviews(spot.id));
        dispatch(spotsAction.getSpotsBySpotId(spot.id));
        dispatch(reviewsActions.getUserReviews());
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) return setErrors(data.errors);
      });
  };

  const onChange = (stars) => {
 setStars(number1(stars))
  };

  let isDisable;
  if (errors.length > 0 || !review || !stars || review.length < 10) {
    isDisable = true;
  } else {
    isDisable = false;
  }

  return (
    <div>
      <div className="create-review-container">
        <p>How was your stay?</p>
        <form onSubmit={submitReviewHandler} className="Review-pop_Up" id="myPopup">
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
            <ReviewsCreatePostStarInput
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
        </form>
      </div>
    </div>
  );
};

export default ReviewCreatePost;
