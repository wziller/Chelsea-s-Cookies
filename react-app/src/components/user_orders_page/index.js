import './user_orders_display.css'
import UserOrdersDisplay from './user_orders_display'
import { getProducts } from "../../store/product";
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { deleteOrder } from '../../store/order';




const UserOrdersPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        (async()=>{
            await dispatch(getProducts())
        })()
    }, []);

    return (
        <UserOrdersDisplay/>
    )
}

export default UserOrdersPage
