import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../store/product";
import EditOrderModal from "../edit_order_modal/";
import "./user_orders_display.css";

const UserOrdersDisplay = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { products } = useSelector((state) => state.products);
  const pendingOrders = user.orders.filter(
    (order) => order.status === "pending"
  );
  const acceptedOrders = user.orders.filter(
    (order) => order.status === "accepted"
  );
  const completedOrders = user.orders.filter(
    (order) => order.status === "completed"
  );

  const calculateTotal = (order) => {
    let res = 0;

    Object.values(order.details_id).forEach((item) => {
      const product = products.find(
        (product) => product.id === item.product_id
      );
      res += product.price * item.quantity;
    });
    return res;
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return products ? (
    <div id="orders_display_window">
      <h1>{`${user.firstName}'s Orders`}</h1>
      <h2>Pending Orders</h2>

      {pendingOrders.length === 0 && <h3>You have no accepted orders...</h3>}
      {pendingOrders &&
        pendingOrders.map((order) => (
          <div>
            <div className="pending_orders_header">
              <h3>{`Order Id: ${order.id}`}</h3>
              <EditOrderModal order={order}/>
              <button>Cancel Order</button>
            </div>
            <p>{`Name: ${user.firstName} ${user.lastName}`}</p>
            <p>{`Delivery Address: ${order.delivery_address}`}</p>
            <p>{`Delivery Date: ${order.delivery_date}`}</p>
            <p>{`Total: $${calculateTotal(order)}`}</p>
            <hr></hr>
            {order.details_id.map((details) => (
              <div>
                <p>{`Item: ${
                  products.find((product) => product.id === details.product_id)
                    .name
                }`}</p>
                <p>{`Price: $${
                  products.find((product) => product.id === details.product_id)
                    .price
                }`}</p>
                <p>{`Quantity: ${details.quantity}`}</p>
                <hr></hr>
              </div>
            ))}
          </div>
        ))}

      <h2>Accepted Orders</h2>
      {acceptedOrders.length === 0 && <h3>You have no accepted orders...</h3>}
      {acceptedOrders.map((order) => (
        <div>
          <div className="accepted_orders_header">
            <h3>{`Order Id: ${order.id}`}</h3>
            <button>Cancel Order</button>
          </div>
          <p>{`Name: ${user.firstName} ${user.lastName}`}</p>
          <p>{`Delivery Address: ${order.delivery_address}`}</p>
          <p>{`Delivery Date: ${order.delivery_date}`}</p>
          <p>{`Total: $${calculateTotal(order)}`}</p>
          <hr></hr>
          {order.details_id.map((details) => (
            <div>
              <p>{`Item: ${
                products.find((product) => product.id === details.product_id)
                  .name
              }`}</p>
              <p>{`Price: $${
                products.find((product) => product.id === details.product_id)
                  .price
              }`}</p>
              <p>{`Quantity: ${details.quantity}`}</p>
              <hr></hr>
            </div>
          ))}
        </div>
      ))}
      <h2>Completed Orders</h2>
      {completedOrders.length === 0 && <h3>You have no completed orders...</h3>}
      {completedOrders.map((order) => (
        <div>
          <div className="completed_orders_header">
            <h3>{`Order Id: ${order.id}`}</h3>
            <button>Edit Order</button>
            <button>Cancel Order</button>
          </div>
          <p>{`Name: ${user.firstName} ${user.lastName}`}</p>
          <p>{`Delivery Address: ${order.delivery_address}`}</p>
          <p>{`Delivery Date: ${order.delivery_date}`}</p>
          <p>{`Total: $${calculateTotal(order)}`}</p>
          <hr></hr>
          {order.details_id.map((details) => (
            <div>
              <p>{`Item: ${
                products.find((product) => product.id === details.product_id)
                  .name
              }`}</p>
              <p>{`Price: $${
                products.find((product) => product.id === details.product_id)
                  .price
              }`}</p>
              <p>{`Quantity: ${details.quantity}`}</p>
              <hr></hr>
            </div>
          ))}
        </div>
      ))}
    </div>
  ) : (
    <h2>Orders are Loading...</h2>
  );
};

export default UserOrdersDisplay;
