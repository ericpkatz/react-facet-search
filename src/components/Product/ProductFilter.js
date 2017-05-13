import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFilter, search } from '../../redux/reducers/productSearchReducer';
import { hashHistory } from 'react-router';

const _Filter = ({ filter, currentFilter, onFilterChange })=> {
  const onChange = (ev)=> {
    const value = filter.choices[ev.target.selectedIndex].value;
    onFilterChange(filter.key, value);
  };
  return (
    <div className='col-xs-4'>
      { filter.key }
      <select onChange={ onChange } className='form-control'>
        {
          filter.choices.map( (choice) => <option selected={ currentFilter[filter.key] == choice.value } value={ choice.value } key={ choice.text }>{ choice.text}</option> )
        }
      </select>
    </div>
  );
};

const mapStateToProps = ( { productSearch } )=> {
  const { currentFilter } = productSearch;
  return {
    currentFilter,
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

export default connect(mapStateToProps)(_Filter);
