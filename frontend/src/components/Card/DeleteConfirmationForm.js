import { useModal } from "../../context/Modal";
import * as spotsAction from "../../store/spots";
import * as reviewsActions from "../../store/review";
import * as bookingActions from "../../store/booking";
import { useDispatch } from "react-redux";
import "./DeleteConfirmationForm.css";

const DeleteConfirmationForm = ({ reviewId, deleteType, spotId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const onDeleteClick = () => {

    if (deleteType === "Review") {
      dispatch(reviewsActions.deleteReviewFromSpot(reviewId)).then(() => {
        dispatch(reviewsActions.getSpotReviews(+spotId));
        dispatch(spotsAction.getSpotsBySpotId(+spotId));
        closeModal();
      });
    }

if (deleteType === "Booking") {
dispatch(bookingActions.deleteSpotBooking(spotId.id))
.then(() => {
  dispatch(bookingActions.getUserBookings())
closeModal();
})

}
  };

  const cancelSubmit = () => {
    closeModal();
  };

console.log("Submit", spotId)

  return (
    <>
      <div className="container">
        <div className="title_text">Confirm Delete</div>
        <div className="confirmation-text">
          {`Are you sure you want to delete this ${deleteType}?`}
        </div>
        <div className="button-container">
          <button
            className="confirmation-button"
            onClick={() => onDeleteClick()}
          >
            {`Yes (Delete ${deleteType})`}
          </button>
        </div>
        <div>
          <button className="cancel-button" onClick={() => cancelSubmit()}>
            {`No (Keep ${deleteType})`}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationForm;
