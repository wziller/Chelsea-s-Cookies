import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { getOrdersByUserId } from "../../store/order"

const ThankYouDisplay = ({setShowModal}) =>{
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)

    const handleOrderClick = () =>{
        dispatch(getOrdersByUserId(user.id))
        history.push('/individualproduct/user_orders')
        setShowModal(false)
    }

    const handleHomeClick = () => {
        history.push('/')
        setShowModal(false)
    }
    return(
        <div id='thank_you_card'>
            <h1>Thank You For Your Order</h1>
            <p id='thank_you_message'> Thank you for buying from Chelsea's Cookies. Small business's need customers like you to keepo doing what we love. Check back later to see if your order has been accepted. Fell free to contact us with any further questions.</p>
            <div id='thank_you_button_container'>
                <button onClick={handleOrderClick}>View Orders</button>
                <button onClick={handleHomeClick}>Return to Home</button>
            </div>
        </div>
    )
}

export default ThankYouDisplay
