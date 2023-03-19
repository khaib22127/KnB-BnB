import NumReviewAvgRating from "../Card/ReviewNumAvgRating";
import './SingleSpotReserve.css'
const SingleSpotReserve = ({singleSpot}) => {
    return (
      <>
        <div className="reserve-box_container">
          <div className="single-Spot_price">
            <span>
              {`$${singleSpot.price} `}
              <span>night</span>
            </span>

            <span>{<NumReviewAvgRating singleSpot={singleSpot} />}</span>
            <span>
              {(singleSpot.numReviews === 0) && <div className='no-review_yet'>★New</div> }
            </span>
          </div>
          <div>
            <button onClick={()=> window.alert("Feature Coming Soon....")} id="reserve-btn">Reserve</button>
          </div>
        </div>
      </>
    );
}


export default SingleSpotReserve;
