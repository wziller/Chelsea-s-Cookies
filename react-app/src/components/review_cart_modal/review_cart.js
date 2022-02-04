import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ThankYouDisplay from "../thank_you_modal/thank_you_window";
import LoginModal from "../auth/login_modal";
import "./review_cart.css";
import {
  createOrder,
  createOrderDetails,
  getOrdersByUserId,
} from "../../store/order";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { updateUser } from "../../store/session";
import { getOrders } from "../../store/order";
import { getProducts } from "../../store/product";

const ReviewCartWindow = ({ setShowModal }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const cart = JSON.parse(localStorage.getItem("currentCart"));
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 3);

  const orderSchema = Yup.object().shape({
    address: Yup.string()
      .max(100, "Must be 100 characters or less.")
      .required("A delivery address is required."),
    aptNumber: Yup.string().max(10, "Must be 10 characters or less."),
    city: Yup.string()
      .max(50, "Must be 50 characters or less.")
      .required("A city is required."),
    state: Yup.string()
      .max(2, "Please use the two-letter abbreviation.")
      .required("A state is required."),
    zipCode: Yup.string()
      .max(7, "Zip Code must be 7 numbers")
      .min(7, "Zip Code must be 7 numbers")
      .required("A Zip Code is required."),
    date: Yup.date()
      .min(tomorrow, "All orders must be placed at least 3 days in advance.")
      .required("A delivery date is required."),
  });

  const formik = useFormik({
    initialValues: {
      address: "",
      aptNumber: "",
      city: "",
      state: "",
      zipCode: "",
      date: "",
    },

    validationSchema: Yup.object().shape({
      address: Yup.string()
        .max(100, "Must be 100 characters or less.")
        .required("A delivery address is required."),
      aptNumber: Yup.string().max(10, "Must be 10 characters or less."),
      city: Yup.string()
        .max(50, "Must be 50 characters or less.")
        .required("A city is required."),
      state: Yup.string()
        .max(2, "Please use the two-letter abbreviation.")
        .required("A state is required."),
      zipCode: Yup.string()
        .max(7, "Zip Code must be 7 numbers")
        .min(5, "Zip Code must be 7 numbers")
        .required("A Zip Code is required."),
      date: Yup.date()
        .min(tomorrow, "All orders must be placed at least 3 days in advance.")
        .required("A delivery date is required."),
    }),
    onSubmit: async (values) => {
      const address_concat = `${values.address}, ${values.aptNumber} ${values.city}, ${values.state} ${values.zipCode}`;
      dispatch(updateUser());

      const newOrder = {
        user_id: user.id,
        delivery_date: values.date,
        delivery_address: address_concat,
        status: "requested",
      };

      const submitted_order = await dispatch(createOrder(newOrder));
      
      Object.values(cart).forEach(async (item) => {
        const newOrderDetails = {
          order_id: submitted_order.id,
          product_id: item.id,
          quantity: item.quantity,
        };
        dispatch(createOrderDetails(newOrderDetails));
      });

        localStorage.setItem("currentCart", JSON.stringify({}));
        setShowModal(false);
        dispatch(getProducts());
        dispatch(getOrdersByUserId(user.id));
        history.push("/");
    },
  });

  const [errors, setErrors] = useState([]);
  const [currentCart, setCurrentCart] = useState(
    localStorage.getItem("currentCart", JSON.stringify(cart))
  );

  const calculateTotal = (shopping_cart) => {
    let res = 0;

    Object.values(shopping_cart).forEach((item) => {
      res += item.price * item.quantity;
    });

    return res;
  };

  const [currentTotal, setCurrentTotal] = useState(calculateTotal(cart));

  const handlePlus = (item) => {
    cart[item.id]?.quantity === 0
      ? (cart[item.id].quantity = 0)
      : (cart[item.id].quantity = cart[item.id].quantity + 1);
    localStorage.setItem("currentCart", JSON.stringify(cart));
    setCurrentCart(localStorage.getItem("currentCart", JSON.stringify(cart)));
    setCurrentTotal(calculateTotal(cart));
  };

  const handleMinus = (item) => {
    cart[item.id]?.quantity === 0
      ? (cart[item.id].quantity = 0)
      : (cart[item.id].quantity = cart[item.id].quantity - 1);
    localStorage.setItem("currentCart", JSON.stringify(cart));
    setCurrentCart(localStorage.getItem("currentCart", JSON.stringify(cart)));
    setCurrentTotal(calculateTotal(cart));
  };

  const removeItem = (item) => {
    delete cart[item.id];
    localStorage.setItem("currentCart", JSON.stringify(cart));
    setCurrentCart(cart);
    setCurrentTotal(calculateTotal(cart));
  };

  useEffect(() => {}, [setCurrentCart, handlePlus, handleMinus]);

  return Object.keys(cart).length !== 0 ? (
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
      <form onSubmit={formik.handleSubmit}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <input
            placeholder="delivery address"
            type="text"
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          ></input>
        </div>
        {formik.touched.address && formik.errors.address ? (
          <p className="cart_error">{formik.errors.address}</p>
        ) : null}
        <div>
          <input
            placeholder="apt number"
            type="text"
            name="aptNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.aptNumber}
          ></input>
        </div>
        {formik.touched.aptNumber && formik.errors.aptNumber ? (
          <p className="cart_error">{formik.errors.aptNumber}</p>
        ) : null}
        <div>
          <input
            placeholder="city"
            type="text"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          ></input>
        </div>
        {formik.touched.city && formik.errors.city ? (
          <p className="cart_error">{formik.errors.city}</p>
        ) : null}
        <div>
          <input
            placeholder="state"
            type="text"
            name="state"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.state}
          ></input>
        </div>
        {formik.touched.state && formik.errors.state ? (
          <p className="cart_error">{formik.errors.state}</p>
        ) : null}
        <div>
          <input
            placeholder="ZIP Code"
            type="text"
            name="zipCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.zipCode}
          ></input>
        </div>
        {formik.touched.zipCode && formik.errors.zipCode ? (
          <p className="cart_error">{formik.errors.zipCode}</p>
        ) : null}
        <div>
          <input
            placeholder="delivery date"
            type="date"
            name="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          ></input>
        </div>
        {formik.touched.date && formik.errors.date ? (
          <p className="cart_error">{formik.errors.date}</p>
        ) : null}
        <button type="submit">Checkout</button>
      </form>
    </div>
  ) : (
    <>
      <h3>Your Cart is Empty...</h3>
      <img src="https://wziller-chelseas-cookies.s3.us-east-2.amazonaws.com/sad-cookie.png"></img>
    </>
  );
};

export default ReviewCartWindow;
