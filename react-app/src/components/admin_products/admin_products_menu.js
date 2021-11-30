import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editProduct, getCurrentMenu, getProducts } from "../../store/product";
import DeleteMenuItemModal from "../delete_menu_item_modal";


const AdminProductsMenu = () => {
const dispatch = useDispatch()
const {products} = useSelector(state=>state.products)

const add_to_menu = (product) => {
    const newProduct={
        id:product.id,
        name:product.name,
        description:product.description,
        price:product.price,
        image_link:product.image_link,
        category:product.category,
        on_menu:'true'
    }

    dispatch(editProduct(newProduct))
    dispatch(getCurrentMenu())
    dispatch(getProducts())
}

const remove_from_menu = (product) => {
    const newProduct={
        id:product.id,
        name:product.name,
        description:product.description,
        price:product.price,
        image_link:product.image_link,
        category:product.category,
        on_menu:'false'
    }

    dispatch(editProduct(newProduct))
    dispatch(getCurrentMenu())
    dispatch(getProducts())
}

useEffect(()=>{dispatch(getProducts())},[])
    return(
        <div>
            {products?.map((product) =>(
                <div>
                    <hr></hr>
                    <p>Product #{product.id}</p>
                    <img src={`${product.image_link}`}></img>
                    <br></br>
                    {product.on_menu === 'false' && <p>Item is not on the menu</p>}
                    {product.on_menu === 'false' && <button value={product} onClick={()=>add_to_menu(product)}>Add to Menu</button>}
                    {product.on_menu === 'true' && <p>Item is on the menu</p>}
                    {product.on_menu === 'true' && <button value={product} onClick={()=>remove_from_menu(product)}>Remove From Menu</button>}
                    <p>Name: {product.name}</p>
                    <p>Description: {product.description}</p>
                    <p>${product.price}</p>
                    <hr></hr>
                </div>
            ))}
        </div>
    )
}

export default AdminProductsMenu
