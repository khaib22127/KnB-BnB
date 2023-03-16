import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spots";
import * as reviewsActions from '../../store/review.js'
import AllSpotsCard from "../Card/AllSpotsCard";
import { Link, NavLink, useHistory } from "react-router-dom";

const AllSpots = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(spotsAction.getAllSpots())
      .then(() =>
      setIsLoaded(true))
      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) console.log(res);
      // });
  }, [dispatch]);

//   const onClickSubmitHandler = () => {
// dispatch(spotsAction.getSpotsBySpotId(spots.id));
// dispatch(reviewsActions.getSpotReviews(spots.id));
  // }

  if (!spots) return null;

    // console.log("spots:", spots.id)

  return (
    <div className="AllSpots_container">
      {Object.values(spots).map((spot) => (
        <Link
          key={`ka12: ${spot.id}`}
          to={`/spots/${spot.id}`}
          style={{ textDecoration: "none", color: "black" }}
        // onClick={onClickSubmitHandler}
        >
          <AllSpotsCard spot={spot} />
        </Link>
      ))}
    </div>
  );
};

export default AllSpots;
