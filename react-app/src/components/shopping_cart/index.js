import { useEffect, useState } from "react";
import Cart_Menu_Display from "./shopping_cart";
import "./shopping_cart.css";

const Shopping_Cart = ({cartStatus, setCartStatus}) => {

  return(<>

    <Cart_Menu_Display cartStatus={cartStatus} setCartStatus={setCartStatus}/>
  </>)
};

export default Shopping_Cart;
