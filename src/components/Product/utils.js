export const generateFilters = ({ users, categories })=> {
  const userChoices = users.map( user => ({
        value: user.id,
        text: user.name
      }));
  userChoices.unshift({ text: 'All', value: -1 });

  const categoryChoices = categories.map( category => ({
        value: category.id,
        text: category.name
      }));
  categoryChoices.unshift({ text: 'All', value: -1 });

  const inStockChoices = [
    { text: 'All', value: -1 },
    { text: 'In Stock', value: true },
    { text: 'Out of Stock', value: false },
  ];

  return [
    {
      type: 'text',
      key: 'description'
    },
    {
      type: 'select',
      key: 'inStock',
      choices: inStockChoices 
    },
    {
      type: 'checkbox',
      key: 'userId',
      choices: userChoices 
    },
    {
      type: 'checkbox',
      key: 'categoryId',
      choices: categoryChoices 
    },
  ];
};
