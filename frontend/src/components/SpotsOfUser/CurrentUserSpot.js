import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotsAction from "../../store/spots";
import AllSpotsCard from "../Card/AllSpotsCard";
import "./CurrentUserSpot.css";
import OpenModalButton from "../OpenModalButton";
import DeleteSpot from "./DeleteSpot";

const CurrentUserSpot = () => {
  let spotId;
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  const spots = useSelector((state) => state.spots.singleSpot);

  Object.values(spots).map((ele) => (spotId = ele.id));


  useEffect(() => {
    dispatch(spotsAction.getUserSpots())
      .then(() => {
        setIsLoaded(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }, [dispatch, errors]);

  const createClickHandler = async () => {
    history.push("/spots/new")
    setIsLoaded(true);
  };

  const editClickHandler = async (spot) => {
    history.push(`/spots/${spot.id}/edit`);
    setIsLoaded(true);
  };


  if (!spots) return null;

  return (

 isLoaded && <div className="current-user-manage-spot-page">
        <div className="manage-title-page">
          <h2>Mangage Your Spots</h2>

          <button
            className="create-new-spot-button"
            onClick={createClickHandler}
          >
            Create a New Spot
          </button>
        </div>

        <div className="current-user_spot-Image" key={spotId}>
          {Object.values(spots).map((spot) => (
            <div key={`user-Spot_${spot.id}`}>
              <div
                key={`${Math.random(spots.createdAt)}-user-spot `}
                className="current-user-spot-image-container"
              >
                <AllSpotsCard
                  spot={spot}
                  // key={`${spots.id}-user_spot`}
                  isLoaded={isLoaded}
                />

                <div className="update-delete-spot-btn">
                  <span id="edit-spot-btn">
                    <button
                      key={`${spot.id}-spot_btnnn`}
                      className="edit-user-spot-btnn d-btn"
                      onClick={() => editClickHandler(spot)}
                    >
                      Update
                    </button>
                  </span>
                  <span>
                      <OpenModalButton
                        buttonText="DELETE"
                        modalComponent={
                          <DeleteSpot
                            spot={spot}

                          />
                        }
                      />

                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default CurrentUserSpot;
