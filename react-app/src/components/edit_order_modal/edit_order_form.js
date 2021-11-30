import "./edit_order_modal.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { editOrder, getOrdersByUserId } from "../../store/order";
import { deleteDetail, editDetail, createDetail } from "../../store/details";

const EditOrderForm = ({ order, setShowModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.session.user)
  const { products } = useSelector((state) => state.products);

  const [errors, setErrors] = useState([]);
  const [address, setAddress] = useState(order.delivery_address);
  const [date, setDate] = useState(order.delivery_date);
  const [currentItems, setCurrentItems] = useState(order.details_id);
  const [currentOrder, setCurrentOrder] = useState(order);

  const calculateTotal = (order) => {
    let res = 0;

    Object.values(order.details_id).forEach((item) => {
      const product = products?.find(
        (product) => product.id === item.product_id
      );
      res += product.price * item.quantity;
    });
    return res;
  };

  const [currentTotal, setCurrentTotal] = useState(calculateTotal(order));

  const updateDeliveryAddress = (e) => {
    setAddress(e.target.value);
  };
  const updateDate = (e) => {
    setDate(e.target.value);
  };

  const handlePlus = (item) => {
    item.quantity === 0
      ? (item.quantity = 0)
      : (item.quantity = item.quantity + 1);
    setCurrentTotal(calculateTotal(currentOrder));
  };

  const handleMinus = (item) => {
    item.quantity === 0
      ? (item.quantity = 0)
      : (item.quantity = item.quantity - 1);
    setCurrentTotal(calculateTotal(currentOrder));
  };

  const removeItem = (item) => {
    const new_items = currentItems.filter(
      (detail_item) => detail_item.product_id !== item.product_id
    );

    setCurrentItems(new_items);
    currentOrder.details_id = new_items;
    setCurrentTotal(calculateTotal(currentOrder));
  };

  const updateOrder = () => {
    order.details_id.forEach(async(detail)=>{
        await dispatch(deleteDetail(detail.id))
    })

    currentItems.forEach(async(detail)=>{
        await dispatch(createDetail(detail))
    })

    currentOrder.delivery_address = address
    currentOrder.delivery_date = date
    dispatch(editOrder(currentOrder));
    dispatch(getOrdersByUserId(user.id))
    setShowModal(false)
  };

  return (
    <div>
      <form onSubmit={updateOrder}>
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
            onChange={updateDeliveryAddress}
            value={address}
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
        <h3>Your Order:</h3>
        {currentItems.map((item) => (
          <li className="cart_items">
            <p className="cart_item_name">{item.name}</p>
            <p className="cart_item_price">{`$${
              products?.find((product) => product.id === item.product_id).price
            } x`}</p>
            <div id="individual_quantity_container">
              <i className="fas fa-minus" onClick={() => handleMinus(item)}></i>
              <p>{item.quantity}</p>
              <i className="fas fa-plus" onClick={() => handlePlus(item)}></i>
              <i class="fas fa-trash-alt" onClick={() => removeItem(item)}></i>
            </div>
          </li>
        ))}
        <p>{`Total: $${currentTotal}`}</p>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditOrderForm;
