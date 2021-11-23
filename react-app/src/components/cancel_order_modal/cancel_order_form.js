import './cancel_order_form.css'
import { useDispatch } from 'react-redux'
import { deleteOrder } from '../../store/order'
import { useEffect } from 'react'

const CancelOrderForm = ({order, setShowModal,setOrderCount, orderCount}) => {
    const dispatch=useDispatch()
    const deleteCurrentOrder = async() => {
        await dispatch(deleteOrder(order.id))
        setShowModal(false)
        const newOrderCount = orderCount - 1
        setOrderCount(newOrderCount)
    }

    const handleCancel = () =>{
        setShowModal(false)
    }
    useEffect(()=>{

    },[])
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
