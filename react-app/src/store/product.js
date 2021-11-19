
const LOAD = "products/LOAD";
const LOAD_ONE = "products/LOAD_ONE"
const ADD_ONE = "products/ADD_ONE";

const load = (payload) => ({
    type: LOAD,
    payload,
});

const addOneProduct = (payload) => ({
  type: ADD_ONE,
  payload,
});

export const getProducts = () => async (dispatch) => {
  const response = await fetch('api/products/')
  if (response.ok) {
    const allProductsList = await response.json();
    dispatch(load(allProductsList));
  }
}

export const getProductbyId = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}`);
  if (response.ok) {
    const allProductsList = await response.json();

    dispatch(load(allProductsList));
  }
};

export const creteProduct = (payload) => async (dispatch) => {
  const response = await fetch(`/api/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newProduct = await response.json();
    dispatch(addOneProduct(newProduct));
    return newProduct;
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/delete/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedProduct = await response.json();
    return deletedProduct;
  }
};

export const editProduct = (updatedProduct) => async (dispatch) => {

  const product_id = updatedProduct.id;
  const response = await fetch(`/api/products/edit/${product_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });
  if (response.ok) {
    const newProduct = await response.json();
    dispatch(addOneProduct(newProduct));
    return newProduct
  }
};

const initialState = {};

const productsReducer = (state = initialState, action) => {
  let newState;
  let newProduct;
  switch (action.type) {
    case LOAD: {
       const products = action.payload['products']
      return {...state, products }
    }
    case LOAD_ONE: {
    }
    default:
      return state;
  }
};
export default productsReducer;
