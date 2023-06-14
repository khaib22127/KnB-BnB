import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteConfirmationForm from "../Card/DeleteConfirmationForm";
import { useModal } from "../../context/Modal";
import ReviewCreatePost from "./ReviewsCreatePost";
import ReviewForm from "../Form/ReviewForm";

const ReviewsItem = ({ ele }) => {
  const { spotId } = useParams();
//  const { closeModal } = useModal();
    const { setModalContent } = useModal();
  const currentUser = useSelector((state) => state.session.user);

  let reviewId;
  const review1 = useSelector((state) => state.reviews.User);

  // const userReview = useSelector(state=> state.reviews.User[spotId])
  // console.log("USER REVIEW:::", ele);

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
      {/* <div key={`reviews${ele.id}`} className={`review-from`}> */}
      <div className={`reviews${ele.id} newly-created-review`}>
        <div className="review_item-padding">{ele.User?.firstName}</div>

        <div className="review_item-padding date_">
          {new Date(ele.createdAt).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="review_item-padding">{ele.review}</div>
        {/* {currentUser && currentUser.id === ele.userId ? (
          <div>
            <OpenModalButton
              buttonText="DELETE"
              modalComponent={
                <DeleteConfirmationForm spotId={spotId} reviewId={reviewId} />
              }
            />
          </div>
        ) : null} */}
        {currentUser && currentUser.id === ele.userId && (
          <div>
            <button
            onClick={()=> setModalContent(<ReviewForm userReview={ele} submitType="Edit" formType="Edit your review" spotId={spotId} />)}
            >Edit</button>

              <OpenModalButton
                buttonText="DELETE"
                modalComponent={
                  <DeleteConfirmationForm spotId={spotId} reviewId={reviewId} />
                }
              />

          </div>
        )}
      </div>
    </div>
    // </div>
  );
};

export default ReviewsItem;
