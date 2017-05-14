import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './reducers/productsReducer';
import userReducer from './reducers/userReducer'; 
import usersReducer from './reducers/usersReducer'; 
import categoriesReducer from './reducers/categoriesReducer'; 
import productSearchReducer from './reducers/productSearchReducer'; 


const combined = combineReducers({
  products: productsReducer,
  user: userReducer,
  productSearch: productSearchReducer,
  users: usersReducer,
  categories: categoriesReducer
});

const store = createStore(combined, applyMiddleware(thunk));

export default store;
