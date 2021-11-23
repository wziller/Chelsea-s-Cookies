import { useEffect, useState } from "react";
import ReviewCartModal from '../review_cart_modal'
import "./shopping_cart.css";

const Cart_Menu_Display = ({cartStatus, setCartStatus}) => {
    const [currentTotal, setCurrentTotal] =useState(0)
    let total = 0

    const cart =JSON.parse(localStorage.getItem("currentCart"))
    {Object.values(cart).map((item) =>{
        total += (item.price * item.quantity)
    })}
    if(currentTotal !== total) setCurrentTotal(total)

    useEffect(()=>{
    },[setCartStatus, cartStatus])

    return cartStatus === 'visible' ? (
    <div>
      <ul id="cart_menu">
        <h3>In Your Cart...</h3>
        {Object.values(cart).map((item) => (
          <li className="cart_items">
            <p className="cart_item_name">{item.name}</p>
            <p className="cart_item_quantity">{`${item.quantity} x`}</p>
            <p className="cart_item_price">{`$${item.price}`}</p>
          </li>
        ))}
        <hr></hr>
        <li>{`Cart Total: $${currentTotal}`}</li>
        <ReviewCartModal/>
      </ul>

    </div>
  ) : (<></>);
};

export default Cart_Menu_Display;
