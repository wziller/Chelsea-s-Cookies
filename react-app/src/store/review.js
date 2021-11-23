
const LOAD = "reviews/LOAD";
const LOAD_ONE = "reviews/LOAD_ONE";
const ADD_ONE = "reviews/ADD_ONE";

const load = (payload) => ({
    type: LOAD,
    payload
});

const addOneReview = (payload) => ({
  type: ADD_ONE,
  payload
});

export const getReviews = () => async (dispatch) => {
  const response = await fetch('/api/reviews/')
  if (response.ok) {
    const allReviewsList = await response.json();
    dispatch(load(allReviewsList));
  }
}

export const getReviewsbyProductId = (id) => async (dispatch) => {
    const response = await fetch('/api/reviews/')
    if (response.ok) {
      const allReviewsList = await response.json();
      const filteredReviewsList = allReviewsList.reviews.filter((review)=>review.id === id)
      dispatch(load(filteredReviewsList));
    }
  }

export const getReviewbyId = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`);
  if (response.ok) {
    const allReviewsList = await response.json();

    dispatch(load(allReviewsList));
  }
};

export const createReview = (payload) => async (dispatch) => {

  const response = await fetch(`/api/reviews/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newOrder = await response.json();
    dispatch(addOneReview(newOrder));
    return newOrder;
  }
};

export const deleteReview = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/delete/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedReview = await response.json();
    return deletedReview;
  }
};

export const editReview = (updatedReview) => async (dispatch) => {

  const review_id = updatedReview.id;
  const response = await fetch(`/api/reviews/edit/${review_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedReview),
  });
  if (response.ok) {
    const newReview = await response.json();
    dispatch(addOneReview(newReview));
    return newReview
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  let newOrder;
  switch (action.type) {
    case LOAD: {
       const reviews = action.payload['reviews']
      return {...state, reviews }
    };
    case ADD_ONE: {
        return{...state, ...action.payload}
    }
    case LOAD_ONE: {
    };
    default:
      return state;
  }
};
export default reviewsReducer;
