const LOAD = "products/LOAD";
const LOAD_ONE = "products/LOAD_ONE";
const LOAD_MENU = "products/LOAD_MENU"
const ADD_ONE = "products/ADD_ONE";
const REMOVE_ONE = "products/REMOVE_ONE";

const load = (payload) => ({
  type: LOAD,
  payload,
});

const load_menu = (payload) => ({
  type: LOAD_MENU,
  payload,
});

const addOneProduct = (payload) => ({
  type: ADD_ONE,
  payload,
});

const removeOneProduct = (payload) => ({
  type: REMOVE_ONE,
  payload,
});

export const getProducts = () => async (dispatch) => {
  const response = await fetch("/api/products/");
  if (response.ok) {
    const allProductsList = await response.json();
    dispatch(load(allProductsList));
  }
};

export const getCurrentMenu = () => async (dispatch) => {
  const response = await fetch("/api/products/");
  if (response.ok) {
    const allProductsList = await response.json();
    console.log(allProductsList)
    const current_menu = allProductsList.products.filter(product=> product.on_menu === 'true')

    dispatch(load_menu(current_menu));
  }
};

export const getProductbyId = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}`);
  if (response.ok) {
    const allProductsList = await response.json();

    dispatch(load(allProductsList));
  }
};

export const createProduct = (payload) => async (dispatch) => {
  console.log(payload);

  const response = await fetch("/api/products/", {
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
  const response = await fetch(`api/products/delete/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deletedProduct = await response.json();
    dispatch(removeOneProduct(deletedProduct));
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
    return newProduct;
  }
};

const initialState = [];

const productsReducer = (state = initialState, action) => {
  let newState;
  let newProduct;
  switch (action.type) {
    case LOAD: {
      const products = action.payload["products"];
      return { ...state, products };
    }
    case LOAD_MENU: {

      const current_menu = action.payload;

      return { ...state, current_menu:current_menu};
    }
    case LOAD_ONE: {
    }
    case REMOVE_ONE: {
      newState=Object.assign({}, state)
      const res = newState.products?.filter(
        (product) => product.id !== action.payload.id
      );
      return res;
    }
    default:
      return state;
  }
};
export default productsReducer;
