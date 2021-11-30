import { useSelector } from "react-redux";
import { useEffect, useState, } from "react";
import LoginModal from "../auth/login_modal";
import "./review_cart.css";
import { createOrder, createOrderDetails, getOrdersByUserId } from "../../store/order";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { updateUser } from "../../store/session";
import { getOrders } from "../../store/order";
import { getProducts } from "../../store/product";

const ReviewCartWindow = ({setShowModal}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user);
  const cart = JSON.parse(localStorage.getItem("currentCart"));
  const [errors, setErrors] = useState([]);
  const [address, setAddress] = useState("");
  const [aptNumber, setAptNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("")
  const [date, setDate] = useState("");
  const [currentCart, setCurrentCart] = useState(
    localStorage.getItem("currentCart", JSON.stringify(cart))
  );


  const calculateTotal = (shopping_cart) => {
    let res = 0

    Object.values(shopping_cart).forEach(item => {
      res += (item.price * item.quantity)
    })

    return res
  }

  const [currentTotal, setCurrentTotal] = useState(calculateTotal(cart));

  const handlePlus = (item) => {
    cart[item.id]?.quantity === 0
      ? (cart[item.id].quantity = 0)
      : (cart[item.id].quantity = cart[item.id].quantity + 1);
    localStorage.setItem("currentCart", JSON.stringify(cart));
    setCurrentCart(localStorage.getItem("currentCart", JSON.stringify(cart)));
    setCurrentTotal(calculateTotal(cart))
  };

  const handleMinus = (item) => {
    cart[item.id]?.quantity === 0
      ? (cart[item.id].quantity = 0)
      : (cart[item.id].quantity = cart[item.id].quantity - 1);
    localStorage.setItem("currentCart", JSON.stringify(cart));
    setCurrentCart(localStorage.getItem("currentCart", JSON.stringify(cart)));
    setCurrentTotal(calculateTotal(cart))
  };

  const removeItem = (item) => {
    delete cart[item.id];
    localStorage.setItem("currentCart", JSON.stringify(cart));
    setCurrentCart(cart);
    setCurrentTotal(calculateTotal(cart))
  };

  const placeOrder = async (e) => {
    e.preventDefault()

    const address_concat = `${address}, ${aptNumber} ${city}, ${state} ${zipCode}`
    await dispatch(updateUser())

    const newOrder = {
      user_id: user.id,
      delivery_date: date,
      delivery_address: address_concat,
      status: 'requested'
    }

    const submitted_order = await dispatch(createOrder(newOrder))


    Object.values(cart).forEach(async(item)=>{

      const newOrderDetails ={
        order_id:submitted_order.id,
        product_id:item.id,
        quantity:item.quantity
      }

      await dispatch(createOrderDetails(newOrderDetails))

      localStorage.setItem('currentCart', JSON.stringify({}))
      setShowModal(false)
      await dispatch(getProducts())
      await dispatch(getOrdersByUserId(user.id))
      history.push('/individualproduct/user_orders')

    })
  }

  useEffect(() => {}, [setCurrentCart, handlePlus, handleMinus]);

  const updateAddress = (e) => {
    setAddress(e.target.value);
  };

  const updateAptNumber = (e) => {
    setAptNumber(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const updateState = (e) => {
    setState(e.target.value);
  };

  const updateZipCode = (e) => {
    setZipCode(e.target.value);
  };

  const updateDate = (e) => {
    setDate(e.target.value);
  };
  return ( Object.keys(cart).length !== 0 ? (
    <div>
      <div id="order_details">
        <h3>Your Order:</h3>
        {Object.values(cart).map((item) => (
          <li className="cart_items">
            <p className="cart_item_name">{item.name}</p>
            <p className="cart_item_price">{`$${item.price} x`}</p>
            <div id="individual_quantity_container">
              <i className="fas fa-minus" onClick={() => handleMinus(item)}></i>
              <p>{item.quantity}</p>
              <i className="fas fa-plus" onClick={() => handlePlus(item)}></i>
              <i class="fas fa-trash-alt" onClick={() => removeItem(item)}></i>
            </div>
          </li>
        ))}
        <hr></hr>
        <li>{`Cart Total: $${currentTotal}`}</li>
      </div>
      <div id="customer_info">
        <ul>
          <li>{`Name: ${`${user.firstName} ${user.lastName}`}`}</li>
          <li>{`Username: ${user.username}`}</li>
          <li>{`Email: ${user.email}`}</li>
          <li>{`Phone: ${user.phone}`}</li>
        </ul>
      </div>
      <form onSubmit={placeOrder}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <input
            placeholder="delivery address"
            type="text"
            name="delivery address"
            onChange={updateAddress}
            value={address}
          ></input>
        </div>
        <div>
          <input
            placeholder="apt number"
            type="text"
            name="apt number"
            onChange={updateAptNumber}
            value={aptNumber}
          ></input>
        </div>
        <div>
          <input
            placeholder="city"
            type="text"
            name="city"
            onChange={updateCity}
            value={city}
          ></input>
        </div>
        <div>
          <input
            placeholder="state"
            type="text"
            name="state"
            onChange={updateState}
            value={state}
          ></input>
        </div>
        <div>
          <input
            placeholder="ZIP Code"
            type="text"
            name="zip code"
            onChange={updateZipCode}
            value={zipCode}
          ></input>
        </div>
        <div>
          <input
            placeholder="delivery date"
            type="date"
            name="delivery date"
            onChange={updateDate}
            value={date}
          ></input>
        </div>
        <button type="submit">Checkout</button>
      </form>
    </div>
  ) : (
    <>
      <h3>Your Cart is Empty...</h3>
      <img src="https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/sad-cookie.png"></img>
    </>
  ));
};

export default ReviewCartWindow;
