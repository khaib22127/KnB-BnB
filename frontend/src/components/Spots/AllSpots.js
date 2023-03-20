import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spots";
import AllSpotsCard from "../Card/AllSpotsCard";
import { Link} from "react-router-dom";

const AllSpots = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(spotsAction.getAllSpots())
      .then(() =>
      setIsLoaded(true))
  }, [dispatch]);


  if (!spots) return null;

  return (
    <div className="AllSpot_main-conainter1">
       <div className="AllSpots_container">
      {Object.values(spots).map((spot) => (
        <Link
          key={`ka12: ${spot.id}`}
          to={`/spots/${spot.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {<AllSpotsCard spot={spot} isLoaded={isLoaded} />}
        </Link>
      ))}
    </div>
    </div>

  );
};

export default AllSpots;
