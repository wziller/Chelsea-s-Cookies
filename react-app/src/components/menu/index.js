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
        <div id="menu_page_container">
            <h3 className="menu_title">Menu</h3>
            <Menu/>
        </div>
    )
}
export default MenuPage
