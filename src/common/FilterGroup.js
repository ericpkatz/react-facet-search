import { connect } from 'react-redux';
import React, { Component} from 'react';
import { Link, hashHistory } from 'react-router';
import Filter from './Filter';

const FilterGroup = ( { filterConfig })=> {
  const { filters, currentFilter, endPoint } = filterConfig;
  return (
    <div>
      <pre>
      { JSON.stringify(currentFilter) }
      </pre>
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
