import { connect } from 'react-redux';
import React from 'react';
import { hashHistory } from 'react-router';
import ProductFilter from './ProductFilter';

const _ProductFilters = ({ filters, reset })=> {
  return (
    <div>
      <a onClick={ reset }>Reset</a>
      <div className='row'>
      {
        filters.map( (filter, idx) => <ProductFilter key={ idx } filter={ filter } />)
      }
      </div>
    </div>
  );
};

const generateFilters = ({ users, categories })=> {
  const userChoices = users.map( user => ({
        value: user.id,
        text: user.name
      }));
  userChoices.unshift({ text: 'All', value: -1 });

  const categoryChoices = categories.map( category => ({
        value: category.id,
        text: category.name
      }));
  categoryChoices.unshift({ text: 'All', value: -1 });

  const inStockChoices = [
    { text: 'All', value: -1 },
    { text: 'In Stock', value: true },
    { text: 'Out of Stock', value: false },
  ];

  return [
    {
      type: 'select',
      key: 'inStock',
      choices: inStockChoices 
    },
    {
      type: 'checkbox',
      key: 'userId',
      choices: userChoices 
    },
    {
      type: 'checkbox',
      key: 'categoryId',
      choices: categoryChoices 
    },
  ];
};

const mapStateToProps = ( { productSearch, users, categories } )=> {
  const { currentFilter } = productSearch;
  return {
    filters: generateFilters({users, categories}),
    reset: ()=> {
      hashHistory.push('/products');
    },
  };
};

export default connect(mapStateToProps)(_ProductFilters);
