import { csrfFetch } from "./csrf";

// Action Type
const GET_SPOT_BOOKINGS = "booking/GET_SPOT_BOOKINGS";
const GET_USER_BOOKINGS = "booking/GET_USER_BOOKINGS";
const CREATE_BOOKING_FOR_SPOT = "booking/CREATE_BOOKING_FOR_SPOT";
const UPDATE_BOOKING = "booking/UPDATE_BOOKING";
const DELETE_SPOT_BOOKING = "booking/DELETE_SPOT_BOOKING";

// Action Creator
export const loadSpotBookingsAction = (booking) => {
  return {
    type: GET_SPOT_BOOKINGS,
    booking,
  };
};

export const loadUserBookingsAction = (booking) => {
  return {
    type: GET_USER_BOOKINGS,
    booking,
  };
};

export const loadCreateBookingAction = (booking) => {
  return {
    type: CREATE_BOOKING_FOR_SPOT,
    booking,
  };
};

export const loadUpdateBookingAction = (bookingId) => {
  return {
    type: UPDATE_BOOKING,
    bookingId,
  };
};

export const loadDeleteBookingAction = (bookingId) => {
  return {
    type: DELETE_SPOT_BOOKING,
    bookingId,
  };
};

//Thunk
export const getSpotBooking = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadSpotBookingsAction(data));
  }
  return response;
};

export const getUserBookings = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/current");
  if (response.ok) {
    const data = await response.json();
    dispatch(loadUserBookingsAction(data));
  }
  return response;
};

export const createSpotBooking = (booking, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    body: JSON.stringify(booking),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(loadCreateBookingAction(data.booking));
    return data;
  }
  return response;
};

export const updateSpotBooking = (booking, bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    body: JSON.stringify(booking),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(loadUpdateBookingAction(data.booking));
  }
};

export const deleteSpotBooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(loadDeleteBookingAction(bookingId));
    return data;
  }
  return response;
};

// Initial State
let initialState = { spotBookings: {}, userBooking: {} };

const bookingReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_SPOT_BOOKINGS:
      const spotBooked = action.booking;
      newState.spotBookings = spotBooked;
      return newState;

    case GET_USER_BOOKINGS:
      const userBooked = action.booking;
      newState.userBooking = userBooked;
      return newState;

    case CREATE_BOOKING_FOR_SPOT:
      return newState;

    case UPDATE_BOOKING:
      return newState;

    case DELETE_SPOT_BOOKING:
      return newState;

    default:
      return state;
  }
};

export default bookingReducer;
