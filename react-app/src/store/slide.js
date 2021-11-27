const NEXT = "NEXT";
const PREV = "PREV";

const Next = (payload) => ({
  type: NEXT,
  payload,
});
const Prev = (payload) => ({
  type: PREV,
  payload,
});

export const nextSlide = (slides) => async (dispatch) => {
  dispatch(Next(slides));
};

export const prevSlide = (slides) => async (dispatch) => {
  dispatch(Prev(slides));
};

const initialState = {
  slideIndex: 0,
};

export const slidesReducer = (state = initialState, action) => {

  switch (action.type) {
    case NEXT: {
      return {
        ...state,
        slideIndex: (state.slideIndex + 1) % action.payload.length,
      };
    }
    case PREV: {
      return {
        ...state,
        slideIndex:
          state.slideIndex === 0 ? action.payload.length - 1 : state.slideIndex - 1,
      };
    }
    default:
      return state;
  }
};
