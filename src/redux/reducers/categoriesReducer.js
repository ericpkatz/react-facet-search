import axios from 'axios';
const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS';

const loadCategoriesSuccess = (categories)=> ({
  type: LOAD_CATEGORIES_SUCCESS,
  categories: categories
});

const loadCategories = ()=> {
  return (dispatch)=> {
    return axios.get('/api/categories')
      .then(response => dispatch(loadCategoriesSuccess(response.data)));
  };
};

const destroyCategory = (category)=> {
  return (dispatch)=> {
    return axios.delete(`/api/categories/${category.id}`)
      .then(response => dispatch(loadCategories()));
  };
};

const createCategory = (category)=> {
  return (dispatch)=> {
    return axios.post(`/api/categories`, category)
      .then(response => dispatch(loadCategories()));
  };
};

export {
  loadCategories,
  destroyCategory,
  createCategory
};

const categoriesReducer = (state=[], action)=> {
  switch(action.type){
    case LOAD_CATEGORIES_SUCCESS:
      state = action.categories;
      break;
  }
  return state;
};

export default categoriesReducer;
