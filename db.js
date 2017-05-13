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
  let foo, bar, bazz, moe, larry, curly;

  return sync()
    .then(()=> {
      const promises = products.map(name => Product.create({ name }))
        .concat(users.map( name => User.create( { name, password: name.toUpperCase()})));
      return Promise.all(promises);
    })
    .then( result => [ foo, bar, bazz, moe, larry, curly ] = result )
    .then( ()=> {
      foo.inStock = false;
      return foo.save();
    })
    .then(()=> Promise.all([
      foo.setUser(moe),
      bar.setUser(moe),
      bazz.setUser(curly)
    ])
    )
    .then(()=> {
      return {
        moe,
        larry,
        curly,
        foo,
        bar,
        bazz
      };
    });
};

module.exports = {
  models: {
    Product,
    User
  },
  sync,
  seed
};
