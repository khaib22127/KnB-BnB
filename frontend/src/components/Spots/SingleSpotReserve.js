import NumReviewAvgRating from "../Card/ReviewNumAvgRating";
import './SingleSpotReserve.css'
const SingleSpotReserve = ({singleSpot}) => {
    return (
      <>
      <div className="reserve-box_container" >
        <div className="single-Spot_price">
             <span>{`$${singleSpot.price} `}
 <span>night</span>
             </span>

        <span>{<NumReviewAvgRating singleSpot={singleSpot} />}</span>
        </div>
        <div>
        <button id="reserve-btn">Reserve</button>
        </div>
      </div>

      </>
    );
}


export default SingleSpotReserve;
