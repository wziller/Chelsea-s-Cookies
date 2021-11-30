const LOAD = "categories/LOAD";
const LOAD_ONE = "categories/LOAD_ONE";
const ADD_ONE = "categories/ADD_ONE";

const load = (payload) => ({
  type: LOAD,
  payload,
});

const addOneCategory = (payload) => ({
  type: ADD_ONE,
  payload,
});

export const getCategories = () => async (dispatch) => {
  const response = await fetch("/api/categories/");
  if (response.ok) {
    const allCategoriesList = await response.json();
    dispatch(load(allCategoriesList));
  }
};

export const getCategorybyId = (id) => async (dispatch) => {
  const response = await fetch(`/api/categories/${id}`);
  if (response.ok) {
    const allCategoriesList = await response.json();

    dispatch(load(allCategoriesList));
  }
};

export const createCategory = (payload) => async (dispatch) => {
  const response = await fetch(`/api/categories/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newCategory = await response.json();
    dispatch(addOneCategory(newCategory));
    return newCategory;
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  const response = await fetch(`/api/categories/delete/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedCategory = await response.json();
    return deletedCategory;
  }
};

export const editCategory = (updatedCategory) => async (dispatch) => {
  const category_id = updatedCategory.id;
  const response = await fetch(`/api/reviews/edit/${category_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCategory),
  });
  if (response.ok) {
    const newCategory = await response.json();
    dispatch(addOneCategory(newCategory));
    return newCategory;
  }
};

const initialState = {};

const categoriesReducer = (state = initialState, action) => {
  let newState;
  let newOrder;
  switch (action.type) {
    case LOAD: {
      const categories = action.payload["categories"];
      return { ...state, categories };
    }
    case ADD_ONE: {
      return { ...state, ...action.payload };
    }
    case LOAD_ONE: {
    }
    default:
      return state;
  }
};

export default categoriesReducer;
