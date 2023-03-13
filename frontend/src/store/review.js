import { csrfFetch } from "./csrf";
import { normalizingData } from "./spots";

// Action Type
const GET_SPOT_REVIEWS = "review/GET_SPOT_REVIEWS";
const CREATE_REVIEW_FOR_SPOT = "review/CREATE_REVIEW_FOR_SPOT";
const DELETE_SPOT_REVIEW = "review/DELETE_SPOT_REVIEW";

// Action Creator
export const loadSpotReviews = (reviews) => {
  return { type: GET_SPOT_REVIEWS, reviews };
};

export const creatReviewForSpot = (review) => {
  return {
    type: CREATE_REVIEW_FOR_SPOT,
    review,
  };
};

export const deletingSpotReview = (reviewId) => {
  return {
    type: DELETE_SPOT_REVIEW,
    reviewId,
  };
};

//Thunk
// GET /api/spots/:spotId/reviews
export const getSpotReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadSpotReviews(data));
    return data;
  }
};

// POST /api/spots/:spotId/reviews
export const createSpotReview = (review, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(creatReviewForSpot(data.review));
    return data;
  }
  return response;
};

// DELETE /api/reviews/:reviewId
export const deleteReviewFromSpot = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(deletingSpotReview(reviewId));
  }
  return data;
};

const initialState = { SpotReview: {} };

const reviewReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      const spotReviews = action.reviews;
      // console.log("review reducer: ====> ", spotReviews)
      newState.SpotReview = {...spotReviews};
      return newState;
    case CREATE_REVIEW_FOR_SPOT:
      // return {newState, [action.type.id]: {...action.review}}
      return newState;
    case DELETE_SPOT_REVIEW:
// delete newState[action.payload.id]
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
