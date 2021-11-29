
const LOAD = "orders/LOAD";
const LOAD_ONE = "orders/LOAD_ONE"
const ADD_ONE = "orders/ADD_ONE";
const REMOVE_ONE = "orders/REMOVE_ONE";

const load = (payload) => ({
    type: LOAD,
    payload,
});

const addOneOrder = (payload) => ({
  type: ADD_ONE,
  payload,
});

const removeOneOrder = (payload) => ({
  type: REMOVE_ONE,
  payload,
});

export const getOrders = () => async (dispatch) => {
  const response = await fetch('/api/orders/')
  if (response.ok) {
    const allOrdersList = await response.json();
    dispatch(load(allOrdersList));
  }
}

export const getOrdersByUserId = (id) => async (dispatch) => {
  const response = await fetch('/api/orders/')
  if (response.ok) {
    const allOrdersList = await response.json();
    const userOrdersList = allOrdersList['orders'].filter(order=>order.user_id === id);
    console.log("orderTest===============>",userOrdersList)
    dispatch(load({userOrdersList}));
  }
}

export const geOrderbyId = (id) => async (dispatch) => {
  const response = await fetch(`/api/orders/${id}`);
  if (response.ok) {
    const order = await response.json();

    dispatch(load(order));
  }
};

export const createOrder = (payload) => async (dispatch) => {
  const response = await fetch(`/api/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newOrder = await response.json();
    dispatch(addOneOrder(newOrder));
    return newOrder;
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  const response = await fetch(`/api/orders/delete/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedOrder = await response.json();
    dispatch(removeOneOrder(deletedOrder));
    return deletedOrder;
  }
};

export const editOrder = (updatedOrder) => async (dispatch) => {

  const order_id = updatedOrder.id;
  const response = await fetch(`/api/orders/edit/${order_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedOrder),
  });
  if (response.ok) {
    const newOrder = await response.json();
    dispatch(addOneOrder(newOrder));
    return newOrder
  }
};


export const createOrderDetails = (payload) => async (dispatch) => {
    const response = await fetch(`/api/order_details/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const newOrder = await response.json();
      dispatch(addOneOrder(newOrder));
      return newOrder;
    }
  };

const initialState = {};

const ordersReducer = (state = initialState, action) => {
  let newState;
  let newOrder;
  switch (action.type) {
    case LOAD: {
       const orders = action.payload['orders']
      return {...state, orders }
    }
    case ADD_ONE: {

      return {...state, ...action.payload}
    }
    case LOAD_ONE: {
    }
    case REMOVE_ONE: {
      newState = Object.assign({}, ...state)
      newState.user_orders.orders = newState.user_orders.orders.filter(order => order !== action.payload)
      return newState
    }
    default:
      return state;
  }
};
export default ordersReducer;
