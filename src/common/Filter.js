import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import SelectFilter from './SelectFilter';
import CheckBoxFilter from './CheckBoxFilter';
import TextBoxFilter from './TextBoxFilter';

const Filter = ({ filter, currentFilter, endPoint })=> {
  const onFilter = (filter)=> {
    hashHistory.push(`${endPoint}${Object.keys(filter).length !== 0 ? '/' + encodeURI(JSON.stringify(filter)): ''}`);
  }
  let specificFilter;
  switch(filter.type){
    case 'select':
        specificFilter = <SelectFilter onFilter={ onFilter } currentFilter={ currentFilter } filter={ filter } />
        break;
    case 'checkbox':
        specificFilter = <CheckBoxFilter filter={ filter} currentFilter={ currentFilter } onFilter={ onFilter } /> 
        break;
    case 'text':
        specificFilter = <TextBoxFilter filter={ filter } currentFilter={ currentFilter } onFilter={ onFilter } /> 
        break;
  }

  return (
    <div className='col-xs-4'>
      { filter.key }
      { 
        specificFilter
      }
    </div>
  );
};

export default Filter; 
