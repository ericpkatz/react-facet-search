import axios from 'axios';
import { combineReducers } from 'redux';
const LOAD_SEARCH_PRODUCTS_SUCCESS = 'LOAD_SEARCH_PRODUCTS_SUCCESS';

const loadSearchProductsSuccess = (products)=> ({
  type: LOAD_SEARCH_PRODUCTS_SUCCESS,
  products: products
});


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
  setFilter
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
