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

console.log("Spots in create spot:::", spots)

  useEffect(() => {
    dispatch(spotsAction.getUserSpots())
         dispatch(spotsAction.editUserSpot(+spotId))
      .then(setIsLoaded(true));
  }, [dispatch]);

  const editSubmitFormHandler = (e) => {
    e.preventDefault();
    setErrors([]);
  };

  return (
    <div key={spots.id}>
      {/* <form className="edit-spot-form" onSubmit={editSubmitFormHandler}>
        <div>
          <h1>Update Your Spot</h1>
          <h2>Where's your place located?</h2>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
        </div>
        {Object.values(spots).map((spot) => (
          <div>
            <label>Country</label>

            <input></input>
            <label>Street Address</label>

            <input></input>
          </div>
        ))}
      </form> */}
      <SpotFormCard newSpot={spots} formType="Update"/>
    </div>
  );
};

export default CurrentUserSpotEdit;
