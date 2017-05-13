import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import SelectFilter from './SelectFilter';
import CheckBoxFilter from './CheckBoxFilter';

const _Filter = ({ filter })=> {
  const onChange = (ev)=> {
    const value = filter.choices[ev.target.selectedIndex].value;
    onFilterChange(filter.key, value);
  };
  return (
    <div className='col-xs-4'>
      { filter.key }
      { filter.type === 'select' ? ( <SelectFilter filter={ filter } />):( <CheckBoxFilter filter={ filter} /> )}
    </div>
  );
};

export default _Filter; 
