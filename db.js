const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

const Product = conn.define('product', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  },
  inStock: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: true
  }
});

const Category = conn.define('category', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  }
});

Product.belongsTo(Category);

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  },
  password: conn.Sequelize.STRING
});

Product.belongsTo(User);

const sync = ()=> conn.sync({ force: true });

const seed = ()=> {
  const products = ['foo', 'bar', 'bazz'];
  const users = ['moe', 'larry', 'curly'];
  const categories = ['animal', 'vegetable', 'mineral'];
  let foo, bar, bazz, moe, larry, curly, animal, vegetable, mineral;

  return sync()
    .then(()=> {
      const promises = products.map(name => Product.create({ name }))
        .concat(users.map( name => User.create( { name, password: name.toUpperCase()})))
        .concat(categories.map( name => Category.create( { name })));
      return Promise.all(promises);
    })
    .then( result => [ foo, bar, bazz, moe, larry, curly, animal, vegetable, mineral ] = result )
    .then( ()=> {
      foo.inStock = false;
      return foo.save();
    })
    .then(()=> Promise.all([
      foo.setUser(moe),
      bar.setUser(moe),
      bazz.setUser(curly),
      foo.setCategory(animal),
      bar.setCategory(animal),
      bazz.setCategory(mineral)
    ])
    )
    .then(()=> {
      return {
        moe,
        larry,
        curly,
        foo,
        bar,
        bazz,
        animal,
        vegetable,
        mineral
      };
    });
};

module.exports = {
  models: {
    Product,
    User,
    Category
  },
  sync,
  seed
};
