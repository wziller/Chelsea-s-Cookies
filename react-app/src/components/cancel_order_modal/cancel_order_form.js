import './cancel_order_form.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, getOrdersByUserId } from '../../store/order'
import { useEffect } from 'react'
import { updateUser } from '../../store/session'

const CancelOrderForm = ({order, setShowModal,setOrderCount, orderCount}) => {
    const dispatch=useDispatch()
    const user = useSelector(state=> state.session.user)
    const deleteCurrentOrder = () => {
        dispatch(deleteOrder(order.id))
        dispatch(updateUser(user.id))
        setShowModal(false)
        const newOrderCount = orderCount - 1
        dispatch(getOrdersByUserId(user.id))
        setOrderCount(newOrderCount)
    }

    const handleCancel = () =>{
        setShowModal(false)
    }
    return(


        <div>
            <h2>Are you sure you wish to cancel?</h2>
            <p>Cancellations are permanent and any product will have to be re-ordered. No refunds will be issued for paid orders without prior consent fromn the owner.</p>
            <div id='button_container'>
                <button id="delete_button" onClick={deleteCurrentOrder}>Cancel Order</button>
                <button id="cancel_button" onClick={handleCancel}>Return to Orders</button>
            </div>
        </div>
    )
}

export default CancelOrderForm
