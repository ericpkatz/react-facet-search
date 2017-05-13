import React, { Component } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import { connect } from 'react-redux';
import { setFilter, search } from '../../redux/reducers/productSearchReducer';
import { hashHistory } from 'react-router';

import ProductFilters from './ProductFilters';



const _ProductsPage = ()=> (
  <div className='well'>
    <ProductForm />
    <ProductFilters />
    <ProductList />
  </div>
);

class ProductsPage extends Component{
  componentDidMount(){
    const filter = this.props.params.filter || '{}';
    this.props.setFilter(JSON.parse(filter));
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.params.filter !== this.props.params.filter){
      this.props.setFilter(JSON.parse(nextProps.params.filter || '{}'));
    }
  }
  render(){
    return (
      <_ProductsPage />
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (filter)=> dispatch(setFilter(filter))
  }
};

export default connect(null, mapDispatchToProps )(ProductsPage);
