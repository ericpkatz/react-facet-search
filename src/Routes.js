import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';


import Layout from './components/Layout';
import Home from './components/Home';
import ProductsPage from './components/Product/ProductsPage'; 
import LoginPage from './components/LoginPage'; 

import { exchangeTokenForUser } from './redux/reducers/userReducer';
import { loadProducts } from './redux/reducers/productsReducer';
import { loadUsers } from './redux/reducers/usersReducer';
import { loadCategories } from './redux/reducers/categoriesReducer';



const Routes = ({ bootstrap })=> {
  return (
    <Router history={ hashHistory } onEnter={ bootstrap() }>
      <Route path='/' component={ Layout }>
        <IndexRoute component={ Home } />
        <Route path='products(/:filter)' component={ProductsPage} />
        <Route path='login' component={LoginPage} />
      </Route>
    </Router>
  );
};

const mapDispatchToProps = (dispatch)=> {
  const bootstrap = ()=> {
    dispatch(exchangeTokenForUser())
      .then( user => /*console.log(user)*/{});
    dispatch(loadProducts());
    dispatch(loadUsers());
    dispatch(loadCategories());
  };
  return {
    bootstrap
  };
};

export default connect(null, mapDispatchToProps)(Routes);
