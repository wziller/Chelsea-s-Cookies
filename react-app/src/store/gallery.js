
const LOAD = "gallery_items/LOAD";
const LOAD_ONE = "gallery_items/LOAD_ONE"
const ADD_ONE = "gallery_items/ADD_ONE";

const load = (payload) => ({
  type: LOAD,
  payload
});


const addOneGalleryItem = (payload) => ({
  type: ADD_ONE,
  payload,
});

export const getGalleryItems = () => async (dispatch) => {
  const response = await fetch('/api/gallery/')
  if (response.ok) {
    const allGalleryItemsList = await response.json();
    dispatch(load(allGalleryItemsList));
  }
}

export const getGalleryItembyId = (id) => async (dispatch) => {
  const response = await fetch(`/api/gallery/${id}`);
  if (response.ok) {
    const allGalleryItemsList = await response.json();

    dispatch(load(allGalleryItemsList));
  }
};

export const createGalleryItem = (payload) => async (dispatch) => {
  const response = await fetch(`/api/gallery/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newGalleryItem = await response.json();
    dispatch(addOneGalleryItem(newGalleryItem));
    return newGalleryItem;
  }
};

export const deleteGalleryItem = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/delete/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedGalleryItem = await response.json();
    return deletedGalleryItem;
  }
};

export const editGalleryItem = (updatedGalleryItem) => async (dispatch) => {

  const gallery_item_id = updatedGalleryItem.id;
  const response = await fetch(`/api/gallery/edit/${gallery_item_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedGalleryItem),
  });
  if (response.ok) {
    const newGalleryItem = await response.json();
    dispatch(addOneGalleryItem(newGalleryItem));
    return newGalleryItem
  }
};

const initialState = [];

const galleryReducer = (state = initialState, action) => {
  let newState;
  let newGalleryItem;

  switch (action.type) {
    case LOAD: {
       const gallery_items = action.payload['gallery_items']
      return {...state, gallery_items }
    }
    case LOAD_ONE: {
    }
    default:
      return state;
  }
};
export default galleryReducer;
