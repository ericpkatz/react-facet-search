import axios from 'axios';
import { combineReducers } from 'redux';
const LOAD_SEARCH_PRODUCTS_SUCCESS = 'LOAD_SEARCH_PRODUCTS_SUCCESS';

const loadSearchProductsSuccess = (products)=> ({
  type: LOAD_SEARCH_PRODUCTS_SUCCESS,
  products: products
});

const loadProducts = ()=> {
  return (dispatch)=> {
    return axios.get('/api/products')
      .then(response => dispatch(loadProductsSuccess(response.data)));
  };
};

const destroyProduct = (product)=> {
  return (dispatch)=> {
    return axios.delete(`/api/products/${product.id}`)
      .then(response => dispatch(loadProducts()));
  };
};

const createProduct = (product)=> {
  return (dispatch)=> {
    return axios.post(`/api/products`, product)
      .then(response => dispatch(loadProducts()));
  };
};

const setFilter = (currentFilter = {})=> {
  return (dispatch)=> {
    dispatch({
      currentFilter,
      type: 'SET_FILTER'
    });
    return dispatch(search(currentFilter));
  }
};

const search = (currentFilter)=> {
  return (dispatch)=> {
    return axios.get(`/api/products/${ encodeURI(JSON.stringify( currentFilter ))}`)
      .then(response => dispatch(loadSearchProductsSuccess(response.data)));
  }
};

export {
  loadProducts,
  destroyProduct,
  createProduct,
  setFilter,
  search
};

const currentFilter = (currentFilter={}, action)=> {
  if(action.type === 'SET_FILTER' && JSON.stringify(action.currentFilter) !== JSON.stringify(currentFilter)){
    currentFilter = action.currentFilter;
  }
  return currentFilter;
};

const searchResultsReducer = (products = [], action)=> {
  if(action.type === LOAD_SEARCH_PRODUCTS_SUCCESS){
    products = action.products
  }
  return products;
}


export default combineReducers({
  currentFilter,
  searchResults: searchResultsReducer
});
