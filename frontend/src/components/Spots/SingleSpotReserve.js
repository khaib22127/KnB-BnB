import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useModal } from "../../context/Modal";
import NumReviewAvgRating from "../Card/ReviewNumAvgRating";
import BookingForm from "../Form/BookingForm";
import * as bookingActions from "../../store/booking";
import "./SingleSpotReserve.css";
import { useHistory, useParams, Redirect } from "react-router-dom";

const SingleSpotReserve = ({ singleSpot }) => {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

const {spotId} = useParams();

useEffect(() => {
dispatch(bookingActions.getSpotBooking(spotId))
}, [dispatch, spotId])


  const currentUser = useSelector((state) => state.session.user);

  console.log("current user ====> ", currentUser);

const singleSpotBooking = useSelector((state) => state.bookings.spotBookings.Bookings);
console.log("singleSpotBooking ====> ",singleSpotBooking);

let createNewBooking = {
  startDate: "",
  endDate: "",
}

  return (
    <>
      <div className="reserve-box_container">
        <div className="single-Spot_price">
          <span>
            {`$${singleSpot.price} `}
            <span>night</span>
          </span>

          <span>{<NumReviewAvgRating singleSpot={singleSpot} />}</span>
          <span>
            {singleSpot.numReviews === 0 && (
              <div className="no-review_yet">★New</div>
            )}
          </span>
        </div>
        <div>
          <button
            onClick={() => setModalContent(<BookingForm submitType="Create" booking={createNewBooking} spotId={spotId} spotBookings={singleSpotBooking} />)}
            id="reserve-btn"
          >
            Reserve
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleSpotReserve;
