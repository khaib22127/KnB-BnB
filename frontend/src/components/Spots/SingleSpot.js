import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotsAction from "../../store/spots";
import NumReviewAvgRating from "../Card/ReviewNumAvgRating";
import SingleSpotDetail from "./SingleSpotDetail";
import "./SingleSpot.css";
import SingleSpotReserve from "./SingleSpotReserve";
import SingleSpotImages from "./SingleSpotImages";
import Reviews from "../Review/Reviews";

const SingleSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const singleSpot = useSelector((state) => state.spots.oneSpot);

  console.log("single spot121: ===> ", !singleSpot);
  useEffect(() => {
    dispatch(spotsAction.getSpotsBySpotId(+spotId));
  }, [dispatch]);

  if (!singleSpot) return null;

  return (
    <div className="main-single-container">

      <div>
        <SingleSpotImages spot={singleSpot} />
      </div>

      <div className="detail-reserve-container" >
        <div className="singleSpot-detail_container">
          <SingleSpotDetail singleSpot={singleSpot} />
        </div>
        <div className="singleSpot-reserve-container">
          <SingleSpotReserve singleSpot={singleSpot} />
        </div>
      </div>

      <div>
        {/* {<Reviews/>} */}
      </div>

    </div>
  );
};

export default SingleSpot;
