import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as spotsAction from "../../store/spots";
import AllSpotsCard from "../Card/AllSpotsCard";
import SpotFormCard from "../Card/SpotFormCard";
import "./CurrentUserSpot.css";

const CurrentUserSpot = () => {
  // const {spotId} = useParams()
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  const spots = useSelector((state) => state.spots.singleSpot);

  console.log("spots: ===> ", spots);

  Object.values(spots).map(ele=>
console.log("ellllleeee:", ele)
    )

  useEffect(() => {
    dispatch(spotsAction.getUserSpots())
      .then(setIsLoaded(true))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }, [dispatch, errors]);

  const createClickHandler = async () => {
    history.push("/spots/new").then(()=> {
      setIsLoaded(true);
    })
  };

  const editClickHandler = async (spot) => {
    // dispatch(spotsAction.getUserSpots())
    // .then(() => {
    //  dispatch(spotsAction.editUserSpot(spot.id))
    //    history.push(`spots/${spot.id}/edit`)
    //  })
    history.push(`/spots/${spot.id}/edit`);
  };

  const deleteClickHandler = async (spot) => {
    // spot.preventDefault();
    await dispatch(spotsAction.deleteSpot(spot.id)).then(()=> {

      // dispatch(spotsAction.getUserSpots())
    }
    );
  };

  if (!spots) return null;

  return (

    <div className="current-user-manage-spot-page">
      <div className="manage-title-page">
        <h2>Mangage Your Spots</h2>

        <button className="create-new-spot-button" onClick={createClickHandler}>
          Create a New Spot
        </button>
      </div>

      <div className="current-user_spot-Image">
        {Object.values(spots).map((spot) => (
          <div >
            <div key={`${spots.id}-user-spot`} className="current-user-spot-image-container">
              <AllSpotsCard spot={spot} key={`${spots.id}-user_spot`} />
              <div className="update-delete-spot-btn">
                <span id="edit-spot-btn">
                  <button
                    className="edit-user-spot-btnn d-btn"
                    onClick={() => editClickHandler(spot)}
                  >
                    Update
                  </button>
                </span>
                <span>
                  <button
                    className="delete-user-spot-btn d-btn"
                    onClick={() => deleteClickHandler(spot)}
                  >
                    Delete
                  </button>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* {Object.values(spots).map((spot) => (
        <div
          className="current-user-spot-previewImg"
          key={`current-user-spot${spot.id}`}
        >
          {isLoaded ? (
            <button
              className="create-new-spot-button"
              onClick={createClickHandler}
            >
              Create a New Spot
            </button>
          ) : (
            <SpotFormCard spot={spot} />
          )}

          <div>
            <img
              src={spot.previewImage}
              alt={`img-of-a-house`}
              className={`owner${spot.id}-previewImage`}
            ></img>
          </div>
          <div>
            <span>{`${spot.city}, ${spot.state}`}</span>
            <span>
              {spot.avgStarRating !== 0
                ? ` ★ ${Number(spot.avgStarRating).toFixed(2)} `
                : ` ★New`}
            </span>
          </div>

          <div>
            <span>{`$${spot.price} night`}</span>
            <span id="update-delete-spot-btn">
              <button
                className="edit-user-spot-btnn"
                onClick={() => editClickHandler(spot)}
              >
                Update
              </button>
              <button>Delete</button>
            </span>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default CurrentUserSpot;
