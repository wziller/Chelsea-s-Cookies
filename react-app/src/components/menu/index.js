import Menu from "./menu"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getProducts } from "../../store/product"

const MenuPage =()=>{
    const dispatch = useDispatch()
    useEffect(async ()=>{
        await dispatch(getProducts())
    },[dispatch])


    return(
        <div>
            <h3>Menu</h3>
            <Menu/>
        </div>
    )
}
export default MenuPage
