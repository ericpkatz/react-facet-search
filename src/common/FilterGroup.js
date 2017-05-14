import { connect } from 'react-redux';
import React from 'react';
import { Link, hashHistory } from 'react-router';
import Filter from './Filter';

const FilterGroup = ({ filters, currentFilter, endPoint })=> {
  return (
    <div>
      <Link to={ endPoint }>Clear Filters</Link>
      <div className='row'>
      {
        filters.map( (filter, idx) => <Filter endPoint = { endPoint } key={ idx } filter={ filter } currentFilter={ currentFilter }/>)
      }
      </div>
    </div>
  );
};


export default FilterGroup; 
