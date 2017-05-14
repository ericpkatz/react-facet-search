export const computeCheckBoxFilter = (currentFilter, filter, value) => {
  const key = filter.key;
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

  if(value === -1 || newFilter[key].$in.length === 0 || newFilter[key].$in.length=== filter.choices.length - 1){
    delete newFilter[key];
  }
  return newFilter;
}

export const isCheckBoxChecked = (currentFilter, filter, choice)=> {
  const returnValue =
    (
    !currentFilter[filter.key] 
      &&
      choice.value === -1
  ) 
  || 
  (
    currentFilter[filter.key] 
      && currentFilter[filter.key]['$in']
      && currentFilter[filter.key]['$in'].indexOf(choice.value) !== -1 
  )
  return !!returnValue;
}

export const computeSelectFilter = (currentFilter, key, value)=> {
  const change = {};
  change[key] = value;
  let newFilter = Object.assign({}, currentFilter, change); 
  newFilter = Object.keys(newFilter).reduce((memo, key)=> {
    if(newFilter[key] != -1){
      memo[key] = newFilter[key];
    }
    return memo;
  }, {});
  return newFilter;
}

export const isSelectSelected = (currentFilter, filter, choice)=> {
  return currentFilter[filter.key] == choice.value 
}
