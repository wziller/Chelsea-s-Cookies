import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import productsReducer from './product';
import reviewsReducer from './review'
import usersReducer from './user';
import galleryReducer from './gallery'
import { slidesReducer } from './slide';

const rootReducer = combineReducers({
  session,
  products: productsReducer,
  reviews: reviewsReducer,
  users: usersReducer,
  gallery_items: galleryReducer,
  slide_index: slidesReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
