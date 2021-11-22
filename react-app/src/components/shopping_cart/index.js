import { useEffect, useState } from "react";
import Cart_Menu_Display from "./shopping_cart";
import "./shopping_cart.css";

const Shopping_Cart = ({cartStatus}) => {

  return(<>

    <Cart_Menu_Display cartStatus={cartStatus}/>
  </>)
};

export default Shopping_Cart;
