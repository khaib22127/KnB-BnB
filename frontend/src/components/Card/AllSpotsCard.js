import { useState } from "react";
import { Link } from "react-router-dom";
import "./AllSpotsCard.css";

const AllSpotsCard = ({ spot, isLoaded }) => {
  if (!spot) return null;

  return (
    isLoaded && (
      <div className="SpotsCard_container">
        <Link
          key={`ka12: ${spot.id}`}
          to={`/spots/${spot.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="SpotCard-Image-container">
            <img
              src={spot.previewImage}
              alt={`some-${spot.id}-preview`}
              id="image-of-house"
              className={`splashPage-image${spot.id} AllSpotsCard-image`}
            />
          </div>
          <div className="city-state-rating-container">
            <span>
              {spot.city}, {spot.state}
            </span>
            <span>
              {spot.avgRating !== 0
                ? ` ★ ${Number(spot.avgRating).toFixed(2)} `
                : ` ★New`}
            </span>
          </div>
          <div>{`$${spot.price} night`}</div>
        </Link>
      </div>
    )
  );
};

export default AllSpotsCard;
