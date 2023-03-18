import { useModal } from "../../context/Modal";
import * as spotsAction from "../../store/spots";
import * as reviewsActions from "../../store/review";
import { useDispatch } from "react-redux";
import "./DeleteConfirmationForm.css";

const DeleteConfirmationForm = ({ reviewId, spotId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

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
        <div className="title_text">Confirm Delete</div>
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
    </>
  );
};

export default DeleteConfirmationForm;
