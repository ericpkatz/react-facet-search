import React, { Component } from 'react';
import { computeTextBoxFilter } from './filterUtils';

class Filter extends Component{
  render(){
    const { filter, currentFilter, onFilter} = this.props;

    const onChange = (ev)=> {
      const newFilter = computeTextBoxFilter(currentFilter, filter, ev.target.value);
      onFilter(newFilter);
    };

    let input;

    return (
      <div>
        <div>
        <input
          ref={ (ref)=> input = ref }
          type='text'
          onBlur={ onChange } /> 
        </div>
      </div>
    );

  }

}


export default Filter; 
