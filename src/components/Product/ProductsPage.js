import React, { Component } from 'react';
import ProductList from './ProductList';
import { connect } from 'react-redux';
import { setFilter } from '../../redux/reducers/productSearchReducer';
import { generateFilters } from './utils';

import FilterGroup from '../../common/FilterGroup';

const _ProductsPage = ({ filterConfig })=> (
  <div className='well'>
    <FilterGroup filterConfig={ filterConfig } />
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
      <_ProductsPage {...this.props } params={ this.props.params }/>
    );
  }
}


const mapStateToProps = ( { productSearch, users, categories } )=> {
  const { currentFilter } = productSearch;
  return {
    filterConfig : {
      filters: generateFilters({users, categories}),
      currentFilter,
      endPoint: '/products'
    }
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (filter)=> dispatch(setFilter(filter))
  }
};

export default connect(mapStateToProps, mapDispatchToProps )(ProductsPage);
