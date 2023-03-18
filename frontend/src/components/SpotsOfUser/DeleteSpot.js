import { useState } from "react";
import { useModal } from "../../context/Modal";
import * as spotsAction from "../../store/spots";
import * as reviewsActions from "../../store/review";
import { useSelector, useDispatch } from "react-redux";
import '../Card/DeleteConfirmationForm.css'

const DeleteSpot = ({ spot }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const deleteButtonHandler = () => {
  dispatch(spotsAction.deleteSpot(spot.id)).then(() => {
      // dispatch(spotsAction.getUserSpots())
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
          Are you sure you want to remove this spot from the listings?
        </div>
        <div className="button-container">
          <button
            className="confirmation-button"
            onClick={() => deleteButtonHandler()}
          >
            Yes (Delete Spot)
          </button>
        </div>
        <div>
          <button className="cancel-button" onClick={() => cancelSubmit()}>
            No (Keep Spot)
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

export default DeleteSpot;
