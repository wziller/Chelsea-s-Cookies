import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createReview, editReview, getReviews }from '../../store/review'
import "./edit_review_form.css";


const EditReviewForm = ({product, review, setShowModal}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([]);
    const [rating, setRating] = useState(review.rating)
    const [content, setContent] = useState(review.content)


    const updateRating = (e) => {
        setRating(e.target.value);
      };

      const updateContent = (e) => {
        setContent(e.target.value);
      };

    const handleReviewSubmit = async(e) => {
        e.preventDefault()
        const new_review = {
            id:review.id,
            user_id:user.id,
            product_id: product.id,
            rating:rating,
            content:content
        }

        await dispatch(editReview(new_review))
        await dispatch(getReviews())
        setShowModal(false)

    }
  return (
    <div>
      <form onSubmit={handleReviewSubmit}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <select
            placeholder="Rating"
            type="select"
            onChange={updateRating}
            value={rating}
          >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          </select>
        </div>
        <div>
          <input
            placeholder="Write your review here"
            type="text"
            name="review"
            onChange={updateContent}
            value={content}
          ></input>
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default EditReviewForm
