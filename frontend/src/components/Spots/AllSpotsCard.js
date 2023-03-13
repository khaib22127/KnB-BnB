
import './AllSpotsCard.css'

const AllSpotsCard = ({ spot }) => {
  console.log("spot:", spot.id);

  return (
    <div className="SpotsCard_container">

      <div className="SpotCard-Child" key={spot.id}>
        <img
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
      <div>{`$${(spot.price).toFixed(2)} night`}</div>

    </div>
  );
};

export default AllSpotsCard;
