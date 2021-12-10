import { useSelector, useDispatch } from "react-redux"
import AdminOrderCard from "./admin_orders_menu"
import { getUserbyId } from "../../store/user"
import { useEffect } from "react"
import { getOrders } from "../../store/order"

const AdminOrdersDisplay = () =>{
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getOrders())
    })

    return(
    <AdminOrderCard/>
    )
}

export default AdminOrdersDisplay
