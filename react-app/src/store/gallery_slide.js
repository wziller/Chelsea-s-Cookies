const NEXT = "gallery/NEXT";
const PREV = "gallery/PREV";

const Next = (payload) => ({
  type: NEXT,
  payload,
});
const Prev = (payload) => ({
  type: PREV,
  payload,
});

export const nextGallerySlide = (slides) => async (dispatch) => {
  dispatch(Next(slides));
};

export const prevGallerySlide = (slides) => async (dispatch) => {
  dispatch(Prev(slides));
};

const initialState = {
  gallerySlideIndex: 0,
};

export const gallerySlidesReducer = (state = initialState, action) => {

  switch (action.type) {
    case NEXT: {
      return {
        ...state,
        gallerySlideIndex: (state.gallerySlideIndex + 1) % action.payload.length,
      };
    }
    case PREV: {
      return {
        ...state,
        gallerySlideIndex:
          state.gallerySlideIndex === 0 ? action.payload.length - 1 : state.gallerySlideIndex - 1,
      };
    }
    default:
      return state;
  }
};
