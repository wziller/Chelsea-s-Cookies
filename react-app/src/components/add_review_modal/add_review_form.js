import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createReview }from '../../store/review'
import "./add_review_form.css";


const AddReviewForm = ({product}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([]);
    const [rating, setRating] = useState(5)
    const [content, setContent] = useState('')


    const updateRating = (e) => {
        setRating(e.target.value);
      };

      const updateContent = (e) => {
        setContent(e.target.value);
      };

    const handleReviewSubmit = async(e) => {
        e.preventDefault()
        const new_review = {
            user_id:user.id,
            product_id: product.id,
            rating:rating,
            content:content
        }

        console.log(new_review)
        await dispatch(createReview(new_review))

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

export default AddReviewForm
