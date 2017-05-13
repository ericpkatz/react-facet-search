import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';


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
                checked={ (!currentFilter[filter.key] && choice.value === -1) || (currentFilter[filter.key] && currentFilter[filter.key]['$in'] && currentFilter[filter.key]['$in'].indexOf(choice.value) !== -1 ) } key={ choice.text } /> 
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
      let newFilter = Object.assign({}, currentFilter); 
      const filterValue = newFilter[key];
      if(!filterValue || typeof filterValue !== 'object')
        newFilter[key] = { $in: [] };
      if(newFilter[key].$in.indexOf(value) !== -1){
        newFilter[key].$in = newFilter[key].$in.filter( _value => _value !== value);
      }
      else {
        newFilter[key].$in.push(value);
      }

      if(value === -1){
        delete newFilter[key];
      }
      
      hashHistory.push(`/products/${ encodeURI(JSON.stringify(newFilter))}`);
    }
  };
};

export default connect(mapStateToProps)(_Filter);
