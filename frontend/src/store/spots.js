//frontend/src/store/spots.js

import { csrfFetch } from "./csrf";

// Action Type
const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const GET_SPOT_BY_ID = "spots/GET_SPOT_BY_ID";
const GET_SPOTS_OF_USER = "spots/GET_SPOTS_OF_USER";
const UPDATE_SPOT_OF_USER = "spots/UPDATE_SPOT_OF_USER";
const ADD_SPOT = "spot/ADD_SPOT";
const CREATE_SPOT_IMAGE = "spotImages/CREATE_SPOT_IMAGE";
const REMOVE_SPOT = "spot/REMOVE_SPOT";

// Action Creator
export const loadSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

export const loadSpotById = (spotId) => {
  return {
    type: GET_SPOT_BY_ID,
    spotId,
  };
};

export const loadUserSpots = (spots) => {
  return {
    type: GET_SPOTS_OF_USER,
    spots,
  };
};

export const updateUserSpot = (spotId) => {
  return {
    type: UPDATE_SPOT_OF_USER,
    spotId,
  };
};

export const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

export const addImage = (image) => {
  return {
    type: CREATE_SPOT_IMAGE,
    image,
  };
};

export const removeSpot = (spotId) => {
  return {
    type: REMOVE_SPOT,
    spotId,
  };
};

//Thunk
// GET "/api/spots"
export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const data = await response.json();
    dispatch(loadSpots(data));
  }
  return response;
};

//Thunk
// GET "/api/spots/spotId"
export const getSpotsBySpotId = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadSpotById(data));
    return data;
  }
  return response;
};

//Thunk
// GET "/api/spots/current"
export const getUserSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);
  const data = await response.json();
  if (response.ok) {
    dispatch(loadUserSpots(data));
    return data;
  }
  return response;
};

// //Thunk
// // POST "/api/spots"
// export const createSpot = (spot) => async (dispatch) => {
//   const response = await csrfFetch("/api/spots", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(spot),
//   });
//   const data = await response.json();
//   if (response.ok) {
//     dispatch(addSpot(data.spot))
// // dispatch(createSpotImages(data.id));
//     // await dispatch(getSpotsBySpotId(data.id));
//     return data;
//   }
//   return response;
// };

//Thunk
// POST "/api/spots"
export const createSpot = (spot, image) => async (dispatch) => {
  let {url, preview} = image
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addSpot(data));
    const createSpotImages = await csrfFetch(`/api/spots/${data.id}/images`, {
      method: "POST",
      body: JSON.stringify({url, preview}),
    });
    if (createSpotImages.ok) {
      return data;
    } else {
      throw createSpotImages;
    }
  } else {
    return response;
  }
};

// //Thunk
// // WORKING
// // POST "/api/spots"
// export const createSpot = (spot, image) => async (dispatch) => {
//   const response = await csrfFetch("/api/spots", {
//     method: "POST",
//     body: JSON.stringify(spot),
//   });
//   const data = await response.json();
//   if (response.ok) {
//     dispatch(addSpot(data.spot));
//     const createSpotImages = await csrfFetch(`/api/spots/${data.id}/images`, {
//       method: "POST",
//       body: JSON.stringify(image),
//     });
//     if (createSpotImages.ok) {
//       return data;
//     }
//     // dispatch(getSpotsBySpotId(data.id))
//   }
//   return response;
// };

//Thunk
// POST "/api/spots/:spotId/images"
// export const createSpotImages = (image) => async (dispatch) => {
//   let {spotId, url, preview} = image;
//   if (!preview) preview = false
//   const response = await csrfFetch(`/api/spots/${spotId}/images`, {
//     method: "POST",
//     body: JSON.stringify({url, preview}),
//   });
//   const data = await response.json();
//   if (response.ok) {
//     dispatch(addImage(data))
//     // await dispatch(getSpotsBySpotId(spot.id));
//     return data;
//   }
//   return response;
// };

//Thunk
// PUT "/api/spots/spotId"
export const editUserSpot = (spot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(updateUserSpot(data));
    // dispatch(getSpotsBySpotId(spotId))
    return data;
  }
  return response;
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeSpot(spotId));
  }
  dispatch(getUserSpots());
  return response;
};

// initial state
let initialState = { allSpots: {}, singleSpot: {} };

//Spots Reducer
const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_SPOTS:
      const allSpots = normalizingData(action.spots.Spots);
      newState.allSpots = { ...allSpots };
      return newState;

    case GET_SPOT_BY_ID:
      const oneSpot = action.spotId;
      newState.singleSpot = { ...oneSpot };
      return newState;

    case GET_SPOTS_OF_USER:
      const userSpot = normalizingData(action.spots.Spots);
      newState.singleSpot = { ...userSpot };
      return newState;

    case UPDATE_SPOT_OF_USER:
      return newState;

    case CREATE_SPOT_IMAGE:
      // newState.getSpotsBySpotId.SpotImages.concat([action.image])

      // newState.spots.singleSpot.SpotImages = ([action.image])
      return newState;

    case REMOVE_SPOT:
      return newState;

    default:
      return state;
  }
};

export const normalizingData = (data) => {
  const obj = {};
  data.forEach((ele) => (obj[ele.id] = ele));
  return obj;
};

export default spotsReducer;
