const NEXT = "menu/NEXT";
const PREV = "menu/PREV";

const Next = (payload) => ({
  type: NEXT,
  payload,
});
const Prev = (payload) => ({
  type: PREV,
  payload,
});

export const nextMenuSlide = (slides) => async (dispatch) => {
  dispatch(Next(slides));
};

export const prevMenuSlide = (slides) => async (dispatch) => {
  dispatch(Prev(slides));
};

const initialState = {
  menuSlideIndex: 0,
};

export const menuSlidesReducer = (state = initialState, action) => {

  switch (action.type) {
    case NEXT: {
      return {
        ...state,
        menuSlideIndex: (state.menuSlideIndex + 1) % action.payload.length,
      };
    }
    case PREV: {
      return {
        ...state,
        menuSlideIndex:
          state.menuSlideIndex === 0 ? action.payload.length - 1 : state.menuSlideIndex - 1,
      };
    }
    default:
      return state;
  }
};
