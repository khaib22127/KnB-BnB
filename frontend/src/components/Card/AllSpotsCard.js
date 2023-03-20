import "./AllSpotsCard.css";

const AllSpotsCard = ({ spot, isLoaded}) => {



  if (!spot) return null;

  return (
    isLoaded && (
      <div className="SpotsCard_container mouse-over_text">
        <div className="SpotCard-Image-container">
          <span className="mouse-over_text-tool">{spot.name}</span>
          <img
            className={`splashPage-image${spot.id} AllSpotsCard-image`}
            id="image-of-house"
            src={spot.previewImage}
            alt={`some-${spot.id}-preview`}
            onError={(currentTarget) => {
              currentTarget.target.src =
                "https://w7.pngwing.com/pngs/507/64/png-transparent-dashboard-default-home-house-main-page-outline-style-icon-thumbnail.png";
              currentTarget.onerror = null;
            }}
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
      </div>
    )
  );
};

export default AllSpotsCard;
