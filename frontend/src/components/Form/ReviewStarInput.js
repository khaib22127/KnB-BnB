import { useEffect, useState } from "react";

const ReviewStarInput = ({ stars, onChange, clicked }) => {
  const [starRating, setStarRating] = useState(stars);

  useEffect(() => {
    setStarRating(stars);
  }, [stars]);

  const pawsIcon = (number) => {
    const starIcon = {};
    if (!clicked) {
      starIcon.onMouseEnter = () => setStarRating(number);
      starIcon.onMouseLeave = () => setStarRating(stars);
      starIcon.onClick = () => onChange(number);
    }
    return (
      <div
        key={number}
        className={
          starRating >= number ? "fa-solid fa-star" : "fa-regular fa-star"
        }
        {...starIcon}
      >
        {/* <i className="fa-regular fa-star"></i> */}
      </div>
    );
  };
  return (
    <div className="rating-input">
      {[1, 2, 3, 4, 5].map((number) => pawsIcon(number))}
    </div>
  );
};

export default ReviewStarInput;
