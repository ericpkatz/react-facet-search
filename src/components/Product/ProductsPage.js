import React, { Component } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import { connect } from 'react-redux';
import { setFilter, search } from '../../redux/reducers/productSearchReducer';
import { hashHistory } from 'react-router';

const Filter = ({ filter, currentFilter, onFilterChange })=> {
  const onChange = (ev)=> {
    const value = filter.choices[ev.target.selectedIndex].value;
    onFilterChange(filter.key, value);
  };
  return (
    <div className='well'>
      { filter.key }
      <select onChange={ onChange } className='form-control'>
        {
          filter.choices.map( (choice) => <option selected={ currentFilter[filter.key] == choice.value } value={ choice.value } key={ choice.text }>{ choice.text}</option> )
        }
      </select>
    </div>
  );
};

const ProductFilter = ({ filters, currentFilter, onFilterChange, reset })=> {
  return (
    <div>
      <a onClick={ reset }>Reset</a>
      <br />
      {
        filters.map( (filter, idx) => <Filter key={ idx } onFilterChange={ onFilterChange } filter={ filter } currentFilter={ currentFilter }/>)
      }
    </div>
  );
};

const _ProductsPage = ({ searchResults, currentFilter, filters, onFilterChange, reset })=> (
  <div className='well'>
    { JSON.stringify(currentFilter) }
    { searchResults.length }
    <ProductForm />
    <ProductFilter filters={ filters } reset={ reset } currentFilter={ currentFilter } onFilterChange={ onFilterChange }/>
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
      <_ProductsPage {...this.props } />
    );
  }
}

const generateFilters = ({ users })=> {
  const userChoices = users.map( user => ({
        value: user.id,
        text: user.name
      }));
  userChoices.unshift({ text: 'All', value: -1 });

  const inStockChoices = [
    { text: 'All', value: -1 },
    { text: 'In Stock', value: true },
    { text: 'Out of Stock', value: false },
  ];

  return [
    {
      key: 'userId',
      choices: userChoices 
    },
    {
      key: 'inStock',
      choices: inStockChoices 
    }
  ];
};

const mapStateToProps = ( { productSearch, users } )=> {
  const { searchResults, currentFilter } = productSearch;
  return {
    searchResults,
    currentFilter,
    filters: generateFilters({users}),
    reset: ()=> {
      hashHistory.push('/products');
    },
    onFilterChange: (key, value)=> {
      const change = {};
      change[key] = value;
      let newFilter = Object.assign({}, currentFilter, change); 
      newFilter = Object.keys(newFilter).reduce((memo, key)=> {
        if(newFilter[key] != -1){
          memo[key] = newFilter[key];
        }
        return memo;
      }, {});
      hashHistory.push(`/products/${ encodeURI(JSON.stringify(newFilter))}`);
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (filter)=> dispatch(setFilter(filter))
  }
};

export default connect(mapStateToProps, mapDispatchToProps )(ProductsPage);

