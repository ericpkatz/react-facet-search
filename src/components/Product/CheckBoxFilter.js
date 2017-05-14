import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { computeCheckBoxFilter, isCheckBoxChecked } from '../../common/filterUtils';


const _Filter = ({ filter, currentFilter, onFilterChange })=> {
  const onChange = (ev)=> {
    const idx = ev.target.getAttribute('data-idx');
    const value = filter.choices[idx].value;
    onFilterChange(filter.key, value);
  };
  return (
    <div>
        {
          filter.choices.map( (choice, idx) => {
            return (
              <div key={ choice.value } className='checkbox'>
              <label>
              <input
                type='checkbox'
                data-idx={ idx }
                onChange={ onChange } 
                checked={ isCheckBoxChecked(currentFilter, filter, choice) } key={ choice.text } /> 
              { choice.text }
                </label>
              </div>
            )
        })
        }
    </div>
  );
};

const mapStateToProps = ( { productSearch } )=> {
  const { currentFilter } = productSearch;
  return {
    currentFilter,
    onFilterChange: (key, value)=> {
      const newFilter = computeCheckBoxFilter(currentFilter, key, value);
      hashHistory.push(`/products/${ encodeURI(JSON.stringify(newFilter))}`);
    }
  };
};

export default connect(mapStateToProps)(_Filter);
