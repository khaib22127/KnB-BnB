import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import * as bookingActions from "../../store/booking";
import "./UserBooking.css"


const UserBookings = () => {
  const dispatch = useDispatch();

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
    <div>
      {userBookings.map((bookings) => (
        <div className="user_booking-container" key={bookings.id}>
          <div>{bookings.Spot.name}</div>
          <div>{`${bookings.Spot.address}, ${bookings.Spot.city}, ${bookings.Spot.state}`}</div>
         
          <img
            className="user-booking_pic"
            src={bookings.Spot.previewImage}
            alt=""
          />
          <div>{`Price: $${bookings.Spot.price} / Night`}</div>
          <div>{`Start:  ${new Date(bookings.startDate).toLocaleString(
            "en-US",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          )}`}</div>
          <div>{`End:  ${new Date(bookings.endDate).toLocaleString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}`}</div>
        </div>
      ))}
    </div>
  );
};

export default UserBookings;
