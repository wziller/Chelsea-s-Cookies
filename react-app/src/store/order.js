
const LOAD = "orders/LOAD";
const LOAD_ONE = "orders/LOAD_ONE"
const ADD_ONE = "orders/ADD_ONE";

const load = (payload) => ({
    type: LOAD,
    payload,
});

const addOneOrder = (payload) => ({
  type: ADD_ONE,
  payload,
});

export const getOrders = () => async (dispatch) => {
  const response = await fetch('/api/orders/')
  if (response.ok) {
    const allOrdersList = await response.json();
    dispatch(load(allOrdersList));
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
    console.log('delivery_address_payload================>', payload)
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

export const deleteReview = (id) => async (dispatch) => {
  const response = await fetch(`/api/orders/delete/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedOrder = await response.json();
    return deletedOrder;
  }
};

export const editOrder = (updatedOrder) => async (dispatch) => {

  const order_id = updatedOrder.id;
  const response = await fetch(`/api/reviews/edit/${order_id}`, {
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

const initialState = [];

const reviewsReducer = (state = initialState, action) => {
  let newState;
  let newOrder;
  switch (action.type) {
    case LOAD: {
       const reviews = action.payload['reviews']
      return {...state, reviews }
    }
    case ADD_ONE: {
        Object.assign({}, ...state)
    }
    case LOAD_ONE: {
    }
    default:
      return state;
  }
};
export default reviewsReducer;
