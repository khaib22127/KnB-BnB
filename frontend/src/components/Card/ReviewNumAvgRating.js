import './Card.css'

const NumReviewAvgRating = ({ singleSpot }) => {
    // console.log("NumReviewSpot:;===>", spot )
  return (
    <>
        {/* <div id="review-card"> */}
      <span id='ul-review-card' >
          <li style={{listStyleType: "none"}}>
            {singleSpot.avgStarRating?.length !== 0
              ? `★${Number(singleSpot?.avgStarRating).toFixed(2)}`
              : null}
          </li>
          &nbsp;&nbsp;&nbsp;

          <li>{singleSpot.numReviews ? `${singleSpot.numReviews} Reviews` : "★New"}</li>

      </span>
        {/* </div> */}
    </>
  );
};

export default NumReviewAvgRating;
