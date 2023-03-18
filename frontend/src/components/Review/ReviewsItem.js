
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteConfirmationForm from "../Card/DeleteConfirmationForm";


const ReviewsItem = ({ ele }) => {
  const { spotId } = useParams();

  const currentUser = useSelector((state) => state.session.user);

  let reviewId;
  const review1 = useSelector((state) => state.reviews.User);


  if (!review1) return null;

  Object.values(review1).forEach((elle) => {
    if (!currentUser) return null;
    if (currentUser.id === elle.userId) {
      reviewId = elle.id;
      return reviewId;
    }

    return (reviewId = elle.id);
  });


if (!ele) return null;

  return (
    <div className="single-review-container">
      <div key={`reviews${ele.id}`} className={`review-from`}>
        <div className={`reviews${ele.id} newly-created-review`}>
          <div>{ele.User?.firstName}</div>
          <div>{ele.createdAt.slice(0, 10)}</div>
          <div>{ele.review}</div>
          {currentUser &&
            currentUser.id ===
              ele.userId ? (
                <div>
                   <OpenModalButton
                buttonText="DELETE"
                modalComponent={<DeleteConfirmationForm spotId={spotId}  reviewId={reviewId}/>}
              />

                </div>
              ): null}
        </div>
      </div>
    </div>
  );
};

export default ReviewsItem;
