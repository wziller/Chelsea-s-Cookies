
const LOAD = "order_details/LOAD";
const LOAD_ONE = "order_details/LOAD_ONE"
const ADD_ONE = "order_details/ADD_ONE";

const load = (payload) => ({
    type: LOAD,
    payload,
});

const addOneDetail = (payload) => ({
  type: ADD_ONE,
  payload,
});

export const getDetails = () => async (dispatch) => {
  const response = await fetch('/api/order_details/')
  if (response.ok) {
    const allDetailsList = await response.json();
    dispatch(load(allDetailsList));
  }
}

export const getDetailbyId = (id) => async (dispatch) => {
  const response = await fetch(`/api/order_details/${id}`);
  if (response.ok) {
    const detail = await response.json();

    dispatch(load(detail));
  }
};

export const createDetail = (payload) => async (dispatch) => {
  const response = await fetch(`/api/order_details/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newDetail = await response.json();
    dispatch(addOneDetail(newDetail));
    return newDetail;
  }
};

export const deleteDetail = (id) => async (dispatch) => {
  const response = await fetch(`/api/order_details/delete/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedDetail = await response.json();
    return deletedDetail;
  }
};

export const editDetail = (updatedDetail) => async (dispatch) => {

  const detail_id = updatedDetail.id;
  const response = await fetch(`/api/order_details/edit/${detail_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedDetail),
  });
  if (response.ok) {
    const newDetail = await response.json();
    dispatch(addOneDetail(newDetail));
    return newDetail
  }
};

const initialState = [];

const detailsReducer = (state = initialState, action) => {
  let newState;
  let newOrder;
  switch (action.type) {
    case LOAD: {
       const reviews = action.payload['details']
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
export default detailsReducer;
