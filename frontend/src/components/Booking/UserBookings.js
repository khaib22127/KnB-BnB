import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import * as bookingActions from "../../store/booking";
import "./UserBooking.css";
import { Link } from "react-router-dom";
import { useModal } from "../../context/Modal";
import DeleteConfirmationForm from "../Card/DeleteConfirmationForm";

const UserBookings = () => {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const userBookings = useSelector(
    (state) => state.bookings.userBooking.Bookings
  );

  // userBookings.map((bookings) => (
  //     console.log(bookings)
  // ))
  console.log("user book", userBookings);

  useEffect(() => {
    dispatch(bookingActions.getUserBookings());
  }, [dispatch]);

  if (!userBookings) return null;
  return (
    <div className="user_booking-container">
      {userBookings.map((bookings) => (
        <div className="user_inner-booking-container" key={bookings.id}>
          <div>{bookings.Spot.name}</div>
          <div>{`${bookings.Spot.address}, ${bookings.Spot.city}, ${bookings.Spot.state}`}</div>
          <Link to={`/spots/${bookings.Spot.id}`}>
            <img
              className="user-booking_pic"
              src={bookings.Spot.previewImage}
              alt=""
            />
          </Link>

          <div>{`Price: $${bookings.Spot.price} / Night`}</div>
          <div>{`Start:  ${new Date(bookings.startDate).toLocaleString(
            "en-US",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          )}`}</div>
          <div>
            {`End:  ${new Date(bookings.endDate).toLocaleString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}`}
          </div>
          <div>
            <button
              onClick={() =>
                setModalContent(<DeleteConfirmationForm deleteType="Booking" spotId={bookings}/>)
              }
            >
              Delete
            </button>
            <button>Edit</button>
          </div>
          <div></div>
        </div>
      ))}
    </div>
  );
};

export default UserBookings;
