import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { useModal } from "../../context/Modal";
import * as bookingActions from "../../store/booking";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingForm.css";
// import moment from "moment";

function BookingForm({ submitType, spotBookings, booking, spotId }) {
  //   const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(booking.startDate);
  const [endDate, setEndDate] = useState(booking.endDate);
  const [errors, setErrors] = useState({});
  const [isClearable, setIsClearable] = useState(false);

  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    if (!errors) return;

    if (submitType === "Create") {
      await dispatch(
        bookingActions.createSpotBooking(
          {
            startDate,
            endDate,
          },
          spotId
        )
      )
        .then(() => {
          closeModal();
        })
        .catch(async (response) => {
          const data = await response.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
  };

  let startBookedDate;
  let endBookedDate;

  spotBookings.forEach((booking) => {
    startBookedDate = new Date(booking.startDate).toUTCString();
    endBookedDate = new Date(booking.endDate).toUTCString();
  });

  const excludeEndDates = [startDate];

  const excludeIntervals = [
    { start: new Date(startBookedDate), end: new Date(endBookedDate) },
  ];

  const handleStartChange = (date) => {
    setStartDate(date);
    setIsClearable(true);
  };

   const handleEndChange = (date) => {
     setEndDate(date);
     setIsClearable(true);
   };

  return (
    <div className="datepicker-class_container">
      <form onSubmit={handleSubmit}>
        <p id="book-form-title">{submitType} Booking</p>

        <div className="datepicker">
          Start Date:
          <DatePicker
            selectsStart
            placeholderText="Select Start Date"
            selected={startDate}
            onChange={handleStartChange}
            startDate={startDate}
            minDate={new Date()}
            excludeDateIntervals={excludeIntervals}
            isClearable={isClearable}
          />
        </div>

        <div className="datepicker">
          End Date:
          <DatePicker
            placeholderText="Select End Date"
            selectsEnd
            selected={endDate}
            onChange={handleEndChange}
            endDate={endDate}
            startDate={startDate}
            minDate={new Date()}
            excludeDateIntervals={excludeIntervals}
            excludeDates={excludeEndDates}
            isClearable={isClearable}
          />
        </div>

        <button id="booking_button" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BookingForm;
