import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { computeSelectFilter, isSelectSelected } from '../../common/filterUtils';


const _Filter = ({ filter, currentFilter, onFilterChange })=> {
  const onChange = (ev)=> {
    const value = filter.choices[ev.target.selectedIndex].value;
    onFilterChange(filter.key, value);
  };
  return (
      <select onChange={ onChange } className='form-control'>
        {
          filter.choices.map( (choice) => <option selected={ isSelectSelected(currentFilter, filter, choice)} value={ choice.value } key={ choice.text }>{ choice.text}</option> )
        }
      </select>
  );
};

const mapStateToProps = ( { productSearch } )=> {
  const { currentFilter } = productSearch;
  return {
    currentFilter,
    onFilterChange: (key, value)=> {
      const newFilter = computeSelectFilter(currentFilter, key, value);
      hashHistory.push(`/products/${ encodeURI(JSON.stringify(newFilter))}`);
    }
  };
};

export default connect(mapStateToProps)(_Filter);
