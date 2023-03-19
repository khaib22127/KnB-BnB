import "./Card.css";

const NumReviewAvgRating = ({ singleSpot }) => {
 
  return (
    <>
      <span id="ul-review-card">
        <li style={{ listStyleType: "none" }}>
          {singleSpot.avgStarRating?.length !== 0
            ? `★${Number(singleSpot?.avgStarRating).toFixed(2)}`
            : null}
        </li>
        &nbsp;&nbsp;&nbsp;&nbsp;
        {/* {(singleSpot.numReviews > 0) ? <li>{`${singleSpot.numReviews} Reviews`}</li>  : <div className='no-review_yet'>★New</div> } */}
        {singleSpot.numReviews > 0 && (
          <li>
            {singleSpot.numReviews === 1
              ? `${singleSpot.numReviews} Review`
              : `${singleSpot.numReviews} Reviews`}
          </li>
        )}
      </span>
    </>
  );
};

export default NumReviewAvgRating;
