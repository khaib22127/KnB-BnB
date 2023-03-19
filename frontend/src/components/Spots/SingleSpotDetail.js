
const SingleSpotDetail = ({ singleSpot }) => {

if (!singleSpot) return null;


  return (

        <div className="description-container">
          <h2>
            Hosted by {singleSpot.Owner?.firstName} {singleSpot.Owner?.lastName}
          </h2>

          <p>
            {singleSpot.description}
          </p>
        </div>
  );
};

export default SingleSpotDetail;
