
import './AllSpotsCard.css'

const AllSpotsCard = ({ spot, isLoaded }) => {

  // console.log("<=== All spot card: ==> ", spot)

  if (!spot) return null

  return (
  <div className="SpotsCard_container">

      <div className="SpotCard-Image-container" key={`${spot.id}-allSpot`}>
        <img
        key={`house-image_${spot.id}`}
          src={spot.previewImage}
          alt={`some-${spot.id}-preview`}
          id="image-of-house"
          className={`splashPage-image${spot.id} AllSpotsCard-image`}
        />
      </div>
      <div className="city-state-rating-container" >
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
  );
};

export default AllSpotsCard;
