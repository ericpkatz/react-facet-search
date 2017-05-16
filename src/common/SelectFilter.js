import React, { Component } from 'react';
import { computeSelectFilter, isSelectSelected } from './filterUtils';


const Filter = ({ filter, currentFilter, onFilter})=> {
  const onChange = (ev)=> {
    const value = filter.choices[ev.target.selectedIndex].value;
    const newFilter = computeSelectFilter(currentFilter, filter.key, value);
    onFilter(newFilter);
  };
  return (
      <select onChange={ onChange } className='form-control' value={ currentFilter[filter.key] !== undefined ? currentFilter[filter.key] : - 1}>
        {
          filter.choices.map( (choice) => <option value={ choice.value } key={ choice.text }>{ choice.text}</option> )
        }
      </select>
  );
};

export default Filter;
