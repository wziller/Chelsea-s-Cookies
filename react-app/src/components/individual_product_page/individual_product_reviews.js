import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getReviews } from "../../store/review";
import DeleteCommentModal from "../delete_review_modal";
import { getUsers } from "../../store/user";
import AddReviewModal from "../add_review_modal/index";
import EditReviewModal from "../edit_review_modal/index";

const IndividualProductReviews = ({ product }) => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews());
  }, [createReview]);

  const { users } = useSelector((state) => state.users);
  const { reviews } = useSelector((state) => state.reviews);
  const selected_product_reviews = reviews?.filter(
    (review) => review.product_id === product.id
  );
  const getReviewerUsername = (id) => {
    const reviewer = users?.find((user) => user.id == id);
    return reviewer?.username;
  };

  return (
    <div id="reviews_container">
      <AddReviewModal product={product} />
      {selected_product_reviews?.map((review) => (
        <div key={review.id} className="review_card">
          <div className="review_date_user">
            <p className="reviewer_username">
              {getReviewerUsername(review.user_id)}
            </p>
            <p className="review_posted">{review.updated_on}</p>
            {[...Array(review.rating)].map((e, i) => <img className='rating_star' src='https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/structure/star_rating_pink.png'></img>)}
          </div>
          <div>
            <p>{review.content}</p>
          </div>
          <div>
            {review.user_id === user.id && <EditReviewModal product={product} review={review}/>}
            {review.user_id === user.id && <DeleteCommentModal review={review}/>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndividualProductReviews;
