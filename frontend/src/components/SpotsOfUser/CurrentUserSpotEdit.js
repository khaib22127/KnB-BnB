import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as spotsAction from "../../store/spots";
import SpotFormCard from "../Card/SpotFormCard";

const CurrentUserSpotEdit = () => {
  const { spotId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const spots = useSelector((state) => state.spots.singleSpot[spotId]);

// console.log("Spots in create spot:::", typeof spotId)

  useEffect(() => {
    // dispatch(spotsAction.editUserSpot(spots))
    dispatch(spotsAction.getUserSpots())
      // setIsLoaded(true);
  }, [dispatch, spotId]);

  const editSubmitFormHandler = (e) => {
    e.preventDefault();
    setErrors([]);
  };

  if (!spots) return null;

  return (
    <div key={spots.id}>
      <SpotFormCard newSpot={spots} formType="Update" submitType="Edit"/>
    </div>
  );
};

export default CurrentUserSpotEdit;
