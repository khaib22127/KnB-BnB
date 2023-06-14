import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { useModal } from "../../context/Modal";
import * as bookingActions from "../../store/booking";
import "react-datepicker/dist/react-datepicker.css";
// import moment from "moment";

function BookingForm({ submitType, spotBookings, booking, spotId }) {
//   const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(booking.startDate);
  const [endDate, setEndDate] = useState(booking.endDate);
  const [errors, setErrors] = useState({});




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

  spotBookings.forEach(booking => {
    startBookedDate = new Date(booking.startDate).toUTCString();
     endBookedDate = new Date(booking.endDate).toUTCString();
  })


  const excludeEndDates = [startDate];
  console.log("booking start date====> ", startBookedDate)
  console.log("exclude end date ===> ", spotBookings.startDate);
  //   const handleStartDateChange = (date) => {
  //     setStartDate(date);
  //   };

  //   const handleEndDateChange = (date) => {
  //     setEndDate(date);
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("Booking Start Date:", startDate);
  //     console.log("Booking End Date:", endDate);
  //   };

  //   // set minimum selectable date 2 days after the start date
  //   const minEndDate = new Date(endDate.setDate(startDate.getDate() + 1));

  const excludeIntervals = [
    { start: new Date(startBookedDate), end: new Date(endBookedDate) },

  ];


  return (
    <form onSubmit={handleSubmit}>
      {/* <div>
        Start Date:
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
        />
      </div>
      <div>
        End Date:
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={minEndDate}
        />
      </div> */}

      {/* <div>
        Start Date:
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
        />
      </div>

      <div>
        End Date:
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={minEndDate}
        />
      </div> */}

      <p id="book-form-title">{submitType} Booking</p>

      <div>
        Start Date:
        <DatePicker
          selectsStart
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          startDate={startDate}
          minDate={new Date()}
          excludeDateIntervals={excludeIntervals}
          //   excludeDates={spotBookings.map(
          //     (bookedDate) => new Date(bookedDate.endDate)
          //   )}
        />
      </div>

      <div>
        End Date:
        <DatePicker
          selectsEnd
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          endDate={endDate}
          startDate={startDate}
          minDate={startDate}
          excludeDates={excludeEndDates}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default BookingForm;
