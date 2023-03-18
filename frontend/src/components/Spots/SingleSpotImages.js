import './SingleSpotImages.css'

const SingleSpotImages = ({spot}) => {


  if (!spot) return null
    return (
      <>
        <div>
          <h1>{spot.name}</h1>
          <span>
            {spot.city}, {spot.state}, {spot.country}
          </span>
        </div>
        <div className="all-image-container1">
          {spot.SpotImages
            ? spot.SpotImages.map((spotUrl, i) => (
                <div key={spotUrl.id} className={`spotIdImage${i}`}>
                  <img
                    className={`gallery__img `}
                    id={`spotImage-${spotUrl.id}`}
                    src={spotUrl.url}
                    alt={`spot-${spotUrl.id}-i`}
                  ></img>
                </div>
              ))
            : null}
        </div>
      </>
    );
};

export default SingleSpotImages;
