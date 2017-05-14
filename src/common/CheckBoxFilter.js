import React, { Component } from 'react';
import { computeCheckBoxFilter, isCheckBoxChecked } from './filterUtils';


const Filter = ({ filter, currentFilter, onFilter })=> {
  const onChange = (ev)=> {
    const idx = ev.target.getAttribute('data-idx');
    const value = filter.choices[idx].value;
    const newFilter = computeCheckBoxFilter(currentFilter, filter.key, value);
    onFilter(newFilter);
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

export default Filter; 
