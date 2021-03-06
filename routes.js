const app = require('express').Router();
const models = require('./db').models;
const jwt = require('jwt-simple');

const JWT_SECRET = process.env.JWT_SECRET || 'foo';

module.exports = app;


app.get('/products/:filter?', (req, res, next)=> {
  const options = {
    order: 'name',
    where: {},
    include: [ models.User, models.Category ]
  };

  if(req.params.filter){
    options.where = JSON.parse(req.params.filter);
  }
  models.Product.findAll(options)
    .then( products => res.send(products ))
    .catch(next);
});

app.get('/users', (req, res, next)=> {
  models.User.findAll({ order: 'name'})
    .then( users => res.send(users))
    .catch(next);
});

app.get('/categories', (req, res, next)=> {
  models.Category.findAll({ order: 'name'})
    .then( users => res.send(users))
    .catch(next);
});

app.delete('/products/:id', (req, res, next)=> {
  models.Product.destroy({ where: { id: req.params.id}})
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.post('/products', (req, res, next)=> {
  models.Product.create(req.body)
    .then( product => res.send(product))
    .catch(next);
});

app.get('/auth/:token', (req, res, next)=> {
  const token = jwt.decode(req.params.token, JWT_SECRET); 
  models.User.findById(token.id)
    .then( user => res.send(user))
    .catch(next);
});

app.post('/auth', (req, res, next)=> {
  models.User.findOne({ 
    where: {
      name: req.body.name,
      password: req.body.password
    }
  })
  .then( user => {
    if(!user){
      return res.sendStatus(401);
    }
    const token = jwt.encode({ id: user.id }, JWT_SECRET); 
    res.send({ token });
  });
});
