import { useState } from "react";
import { useModal } from "../../context/Modal";
import * as spotsAction from "../../store/spots";
import * as reviewsActions from "../../store/review";
import { useSelector, useDispatch } from "react-redux";
import "./DeleteConfirmationForm.css";

const DeleteConfirmationForm = ({ reviewId, spotId }) => {
  const [delTask, setDelTask] = useState(false);
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  console.log("reviewId::: ", reviewId);

  const deleteButtonHandler = () => {
    dispatch(reviewsActions.deleteReviewFromSpot(reviewId)).then(() => {
      dispatch(reviewsActions.getSpotReviews(+spotId));
      dispatch(spotsAction.getSpotsBySpotId(+spotId));
      closeModal();
    });
  };

  const cancelSubmit = () => {
    closeModal();
  };

  return (
    <>
      <div className="container">
        <div className="title_text">
          Confirm Delete
        </div>
        <div className="confirmation-text">
          Are you sure you want to delete this review?
        </div>
        <div className="button-container">
          <button
            className="confirmation-button"
            onClick={() => deleteButtonHandler()}
          >
            Yes (Delete Review)
          </button>
        </div>
        <div>
          <button className="cancel-button" onClick={() => cancelSubmit()}>
            No (Keep Review)
          </button>
        </div>
      </div>

      {/* <div>
    <h1>Confirm Delete</h1>
    <button onClick={() => deleteButtonHandler()}>Yes</button>
</div> */}
    </>
  );
};

export default DeleteConfirmationForm;
