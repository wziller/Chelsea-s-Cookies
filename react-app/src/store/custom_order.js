
const LOAD = "orders/LOAD";
const LOAD_ONE = "orders/LOAD_ONE"
const LOAD_USER_CUSTOM_ORDERS = "orders/LOAD_USER_ORDERS"
const ADD_ONE = "orders/ADD_ONE";
const REMOVE_ONE = "orders/REMOVE_ONE";

const load = (payload) => ({
    type: LOAD,
    payload,
});

const loadUserCustomOrders = (payload) => ({
  type: LOAD_CUSTOM_USER_ORDERS,
  payload,
});

const addOneCustomOrder = (payload) => ({
  type: ADD_ONE,
  payload,
});

const removeOneCustomOrder = (payload) => ({
  type: REMOVE_ONE,
  payload,
});

export const getCustomOrders = () => async (dispatch) => {
  const response = await fetch('/api/customOrders/')
  if (response.ok) {
    const allCustomOrdersList = await response.json();
    dispatch(load(allCustomOrdersList));
  }
}

export const getCustomOrdersByUserId = (id) => async (dispatch) => {
  const response = await fetch('/api/customOrders/')
  if (response.ok) {
    const allCustomOrdersList = await response.json();
    const userCustomOrdersList = allCustomOrdersList['orders'].filter(order=>order.user_id === id);
    dispatch(loadUserOrders(userCustomOrdersList));
  }
}

export const getCustomOrderbyId = (id) => async (dispatch) => {
  const response = await fetch(`/api/customOrders/${id}`);
  if (response.ok) {
    const customOrder = await response.json();

    dispatch(load(customOrder));
  }
};

export const createCustomOrder = (payload) => async (dispatch) => {
  const response = await fetch(`/api/customOrders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newOrder = await response.json();
    dispatch(addOneCustomOrder(newOrder));
    return newCustomOrder;
  }
};

export const deleteCustomOrder = (id) => async (dispatch) => {
  const response = await fetch(`/api/customOrders/delete/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedCustomOrder = await response.json();
    dispatch(removeOneCustomOrder(deletedOrder));
    return deletedCustomOrder;
  }
};

export const editCustomOrder = (updatedCustomOrder) => async (dispatch) => {

  const custom_order_id = updatedOrder.id;
  const response = await fetch(`/api/customOrders/edit/${custom_order_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCustomOrder),
  });
  if (response.ok) {
    const newCustomOrder = await response.json();
    dispatch(addOneCustomOrder(newCustomOrder));
    return newCustomOrder
  }
};


export const createCustomOrderOptions = (payload) => async (dispatch) => {
    const response = await fetch(`/api/custom_order_options/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const newCustomOrder = await response.json();
      dispatch(addOneCustomOrder(newCustomOrder));
      return newCustomOrder;
    }
  };

const initialState = {customOrders:[], user_custom_orders:[]};

const customOrdersReducer = (state = initialState, action) => {
  let newState;
  let newOrder;
  switch (action.type) {
    case LOAD: {
       const customOrders = action.payload.orders
      return {...state, customOrders }
    }
    case ADD_ONE: {
      return {...state, ...action.payload}
    }
    case LOAD_ONE: {
    }

    case LOAD_USER_ORDERS:{
      const user_custom_orders = action.payload
      return {...state, user_custom_orders }
    }

    case REMOVE_ONE: {
      newState=Object.assign({}, state)
      const custom_orders = newState.custom_orders.orders?.filter(
        (order) => custom_order.id !== action.payload.id
      );
      return {...state, custom_orders};
    }
    default:
      return state;
  }

};
export default customOrdersReducer;
