import './user_orders_display.css'
import UserOrdersDisplay from './user_orders_display'
import { getProducts } from "../../store/product";
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getOrdersByUserId } from '../../store/order';
import { getUsers } from '../../store/user';
import { deleteOrder } from '../../store/order';
import { useSelector } from 'react-redux';




const UserOrdersPage = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.session.user);
    // useEffect(()=>{
    //     getUsers()
    //     getProducts()
    //     // getOrdersByUserId(user.id)
    // },[])
    useEffect(() => {
        (async()=>{
            await dispatch(getProducts())
            await dispatch(getOrdersByUserId(user.id))
        })()
    }, []);

    return (
        <UserOrdersDisplay/>
    )
}

export default UserOrdersPage
