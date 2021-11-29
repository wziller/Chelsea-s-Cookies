import './delete_review_form.css'
import { useDispatch } from 'react-redux'
import { deleteReview, getReviews } from '../../store/review'
import { useEffect } from 'react'

const DeleteReviewForm = ({review, setShowModal}) => {
    const dispatch=useDispatch()

    const deleteCurrentReview = async() => {
        await dispatch(deleteReview(review.id))
        await dispatch(getReviews())
        setShowModal(false)
    }

    const handleCancel = () =>{
        setShowModal(false)
    }
    useEffect(()=>{

    },[])
    return(


        <div>
            <h2>Are you sure you wish to cancel?</h2>
            <p>Deleting comments are permanent are you sure you want to delete this review?</p>
            <div id='button_container'>
                <button id="delete_button" onClick={deleteCurrentReview}>Delete Review</button>
                <button id="cancel_button" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteReviewForm
