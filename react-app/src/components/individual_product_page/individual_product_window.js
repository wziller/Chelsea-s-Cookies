import { useEffect } from "react"
import { useState } from "react"
import { getProductbyId, getProducts } from "../../store/product"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

const IndividualProductWindow = ({product, setCartStatus}) => {
    const dispatch = useDispatch()
    const [currentQuantity, setCurrentQuantity] = useState(0)
    const handlePlus = () =>{
        setCurrentQuantity(currentQuantity + 1)
    }

    const handleMinus = () =>{
      currentQuantity === 0 ? setCurrentQuantity(0) : setCurrentQuantity(currentQuantity - 1)
    }

    const addToCart = () => {
        const cart  = JSON.parse(localStorage.getItem('currentCart'))
        cart[product.id]? cart[product.id].quantity= cart[product.id].quantity += currentQuantity : cart[product.id]  = {'name': product.name, 'quantity':currentQuantity, 'price':product.price}
        localStorage.setItem('currentCart', JSON.stringify(cart))
        setCartStatus('visible')
        setCurrentQuantity(0)
    }
    return(
        <div id="individual_product_container">
            <div id="individual_product_window">
                <h3 id= "individual_product_name">{product.name}</h3>
                <img id= "individual_product_image" src={product.image_link}></img>
                <div id="individual_product_description_container">
                    <p id="individual_product_description">{product.description}</p>
                </div>
                <div id= "individual_product_buttons_container">
                    <p id= "individual_product_price">{`Price per dozen: $${product.price}`}</p>
                    <div id= "individual_quantity_container">
                        <i className="fas fa-minus" onClick= {handleMinus}></i>
                        <p>{currentQuantity}</p>
                        <i className="fas fa-plus" onClick= {handlePlus}></i>
                    </div>
                    <p>{`Total: $${(product.price * currentQuantity)}`}</p>
                    <button id= "individual_product_add_to_cart_btn" onClick={addToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default IndividualProductWindow
