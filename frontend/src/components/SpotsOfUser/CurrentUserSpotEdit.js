import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotsAction from "../../store/spots";
import SpotFormCard from "../Card/SpotFormCard";

const CurrentUserSpotEdit = () => {
  const { spotId } = useParams();

  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spots.singleSpot[spotId]);

  useEffect(() => {
    dispatch(spotsAction.getUserSpots());
  }, [dispatch, spotId]);

  if (!spots) return null;

  return (
    <div key={spots.id}>
      <SpotFormCard newSpot={spots} formType="Update" submitType="Edit" />
    </div>
  );
};

export default CurrentUserSpotEdit;
