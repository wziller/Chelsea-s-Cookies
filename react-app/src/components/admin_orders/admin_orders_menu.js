import { useEffect } from "react"
import { Provider } from "react-redux"
import { useSelector, useDispatch  } from "react-redux"
import { editOrder, getOrders } from "../../store/order"
import AdminDeleteOrderModal from '../admin_cancel_order_modal'
import './admin_orders.css'

const AdminOrderCard = () => {
    const dispatch = useDispatch()
    const {products} = useSelector(state=>state.products)
    const {users} = useSelector(state=>state.users)
    const {orders} = useSelector(state=>state.orders)

    const findProduct= (id) => {
        return products.find(product=> product.id === id)
    }

    const findUser= (id) => {
        return users.find(user=> user.id === id)
    }

    const findOrderTotal = (order) =>{
        let total = 0
        order.details_id.forEach(detail =>
            total += findProduct(detail.product_id).price * detail.quantity)
        return total
    }

    const findOrderQuantity = (order) =>{
        let quantity = 0
        order.details_id.forEach(detail =>
            quantity += detail.quantity)
        return quantity
    }

    const acceptOrder= (order) => {
        order.status = 'accepted'
        dispatch(editOrder(order))
        dispatch(getOrders())
    }

    const completeOrder = async(order) => {
        order.status = 'completed'
        dispatch(editOrder(order))
    }

    useEffect(()=>{dispatch(getOrders())},[editOrder])

    return orders ? (
    <div className="admin_order_card">
        {orders.map(order=>{
            const user = findUser(order.user_id)
            return (
        <div className="order_user_info">
            <p>{`name: ${user.firstName} ${user.lastName}`}</p>
            <p>{`username: ${user.lastName}`}</p>
            <p>{`email: ${user.email}`}</p>
            <p>{`phone: ${user.phone}`}</p>
            <p>delivery date: {order.delivery_date}</p>
            <p>delivery address: {order.delivery_address}</p>
            <p>order status: {order.status}</p>
            <div className="order_status_button_container">
                {order.status === 'requested' && <button onClick={()=>acceptOrder(order)}>Accept Order</button>}
                {order.status === 'accepted' &&<button onClick={()=>completeOrder(order)}>Complete Order</button>}
                {(order.status === 'requested' || order.status === 'accepted') && <AdminDeleteOrderModal order={order}/>}
            </div>
            <table id="simple-board">
                <tbody>
                <tr className='row'>
                    <td className='cell'>Product</td>
                    <td className='cell'>Quantity</td>
                    <td className='cell'>Price</td>
                    </tr>
                {order?.details_id.map(item=>{
                    const product = findProduct(item.product_id)
                    return(
                <tr className='row'>
                    <td className='cell'>{`${product?.name}`}</td>
                    <td className='cell'>{item.quantity} dzn</td>
                    <td className='cell'>${product?.price}</td>
                </tr>
                )})}
                <tr className='row'>
                    <td className='cell'>Total ${findOrderTotal(order)}</td>
                    <td className='cell'>Total {findOrderQuantity(order)} dzn</td>
                </tr>
                </tbody>
            </table>
        </div>
        )})}
        </div>) : (<p>orders are loading...</p>)
}

export default AdminOrderCard
