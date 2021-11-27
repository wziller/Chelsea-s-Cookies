import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../store/product";


const AdminProductsMenu = () => {
const dispatch = useDispatch()
const {products} = useSelector(state=>state.products)

useEffect(()=>{dispatch(getProducts())},[])
    return(
        <div>
            {products?.map((product) =>(
                <div>
                    <hr></hr>
                    <p>Product #{product.id}</p>
                    <img src={`${product.image_link}`}></img>
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
