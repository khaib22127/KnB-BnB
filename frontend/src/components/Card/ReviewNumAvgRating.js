import './Card.css'

const NumReviewAvgRating = ({ singleSpot }) => {

  return (
    <>
      <span id='ul-review-card' >
          <li style={{listStyleType: "none"}}>
            {singleSpot.avgStarRating?.length !== 0
              ? `★${Number(singleSpot?.avgStarRating).toFixed(2)}`
              : null}
          </li>
          &nbsp;&nbsp;&nbsp;&nbsp;

          {(singleSpot.numReviews > 0) ? <li>{`${singleSpot.numReviews} Reviews`}</li>  : "★New"}
{}
      </span>

    </>
  );
};

export default NumReviewAvgRating;
