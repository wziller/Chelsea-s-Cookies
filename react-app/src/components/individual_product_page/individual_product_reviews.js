import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../../store/user"
import AddReviewModal from "../add_review_modal/index"

const IndividualProductReviews = ({product}) => {
    const dispatch = useDispatch()

    const {users} = useSelector((state)=> state.users)
    const {reviews} = useSelector((state)=>state.reviews)
    const selected_product_reviews = reviews?.filter((review)=>review.product_id === product.id)
    const getReviewerUsername = (id) =>{
        const reviewer = users?.find(user=>user.id == id)
        return reviewer?.username
     }

return(
<div id= 'reviews_container'>
    <AddReviewModal product={product}/>
    {selected_product_reviews?.map(review=>(
        <div key={review.id} className='review_card'>
            <div className='review_date_user'>
                <p className='reviewer_username'>{getReviewerUsername(review.user_id)}</p>
                <p className='review_posted'>{review.updated_on}</p>
            </div>
            <div>
                <p>{review.content}</p>
            </div>
        </div>
    ))}
</div>)
}

export default IndividualProductReviews
