import React, { Component } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import { connect } from 'react-redux';
import { setFilter } from '../../redux/reducers/productSearchReducer';
import { generateFilters } from './utils';

import FilterGroup from '../../common/FilterGroup';



const _ProductsPage = ({ filters, currentFilter })=> (
  <div className='well'>
    <ProductForm />
    <FilterGroup filters={ filters } currentFilter={ currentFilter } endPoint='/products'/>
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
      <_ProductsPage {...this.props }/>
    );
  }
}


const mapStateToProps = ( { productSearch, users, categories } )=> {
  const { currentFilter } = productSearch;
  return {
    filters: generateFilters({users, categories}),
    currentFilter
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (filter)=> dispatch(setFilter(filter))
  }
};

export default connect(mapStateToProps, mapDispatchToProps )(ProductsPage);
