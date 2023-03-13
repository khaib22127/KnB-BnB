//frontend/src/store/spots.js

import { csrfFetch } from "./csrf";

// Action Type
const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const GET_SPOT_BY_ID = "spots/GET_SPOT_BY_ID";
const GET_SPOTS_OF_USER = "spots/GET_SPOTS_OF_USER";
const UPDATE_SPOT_OF_USER = "spots/UPDATE_SPOT_OF_USER";
const ADD_SPOT = "spot/ADD_SPOT"
const CREATE_SPOT_IMAGE = "spotImages/CREATE_SPOT_IMAGE";

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
    spotId
  }
}


const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot
  }
}

export const addImage = (image) => {
  return {
    type: CREATE_SPOT_IMAGE,
  image
  }
}


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
  }
  return response;
};

//Thunk
// GET "/api/spots/current"
export const getUserSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadUserSpots(data));
  }
  return response;
};

//Thunk
// POST "/api/spots"
export const createSpot = (spot, spotId) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: "POST",
    body: JSON.stringify(spot)
  })
  const data = await response.json();
  if (response.ok) {
    // dispatch(addSpot(data.spot))
    await dispatch(getSpotsBySpotId(data.id));
    return data;
  }
  return response;
}



//Thunk
// POST "/api/spots/:spotId/images"
export const createSpotImages = (image, spotId) => async (dispatch) => {
  // let {url, preview} = image;
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify(image)
  });
  const data = await response.json()
  if(response.ok) {
    await dispatch(getSpotsBySpotId(spotId));
    return data;
  }
  return response
}

//Thunk
// PUT "/api/spots/spotId"
export const editUserSpot = (spot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify(spot)
  })
  const data = await response.json();
  if (response.ok) {
    dispatch(updateUserSpot(data));
  }
  return response;
}


// initial state
let initialState = { allSpots: {}, oneSpot: {} };

//Spots Reducer
const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_SPOTS:
      const allSpots = normalizingData(action.spots.Spots);
      // console.log("reducer spots:=====> ", action.spots)
      // const spots = {...newState, [action.spots.Spots.id]: action.spots}
      newState.allSpots = allSpots;
      return newState;

    case GET_SPOT_BY_ID:
      const oneSpot = action.spotId;
      newState.oneSpot = oneSpot;
      return newState;

      case GET_SPOTS_OF_USER:
        const userSpot = normalizingData(action.spots.Spots);
        newState.oneSpot = {...userSpot};
        return newState;

        case UPDATE_SPOT_OF_USER:
          return newState;

    //       case ADD_SPOT:
    //       console.log("=========>  oneSpot:::::========> ", action)
    //       return newState;

    //       case CREATE_SPOT_IMAGE:
    //         const spotImg = ([action.image])
    //       newState.spots.oneSpot.SpotImages = spotImg
    // console.log("**************   new State   :====> ", newState)
    //       return newState;

    default:
      return state;
  }
};


export const normalizingData = (data) => {
  const obj = {};
  (data).forEach((ele) => (obj[ele.id] = ele));
  return obj;
};


export default spotsReducer;
