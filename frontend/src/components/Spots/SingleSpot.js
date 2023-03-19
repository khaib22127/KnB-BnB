import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotsAction from "../../store/spots";
import SingleSpotDetail from "./SingleSpotDetail";
import "./SingleSpot.css";
import SingleSpotReserve from "./SingleSpotReserve";
import SingleSpotImages from "./SingleSpotImages";
import Reviews from "../Review/Reviews";


const SingleSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const singleSpot = useSelector((state) => state.spots.singleSpot);

  useEffect(() => {
    dispatch(spotsAction.getSpotsBySpotId(+spotId));
  }, [dispatch, spotId]);

  if (!singleSpot) return null;

  return (
    <div className="main-single-container" key={`single_spot-container${singleSpot.id}`}>

      <div key={`${singleSpot.id}-single_spot-image`}>
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
        {<Reviews spot={singleSpot}/> }

    </div>
  );
};

export default SingleSpot;
