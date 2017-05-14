import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import SelectFilter from './SelectFilter';
import CheckBoxFilter from './CheckBoxFilter';

const Filter = ({ filter, currentFilter, endPoint })=> {
  const onFilter = (filter)=> {
    hashHistory.push(`${endPoint}/${encodeURI(JSON.stringify(filter))}`);
  }

  return (
    <div className='col-xs-4'>
      { filter.key }
      { 
        filter.type === 'select' ? ( 
        <SelectFilter onFilter={ onFilter } currentFilter={ currentFilter } filter={ filter } />
        ):( 
          <CheckBoxFilter filter={ filter} currentFilter={ currentFilter } onFilter={ onFilter } /> 
        )
      }
    </div>
  );
};

export default Filter; 
