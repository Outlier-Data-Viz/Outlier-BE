const { Router } = require('express');
// const ensureAuth = require('../middleware/ensure-auth.js');
const User = require('../models/User.js');
// const UserService = require('../services/UserService');


module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const users = await User.selectAll();
      res.json(users);
    } catch(err) {
      next(err);
    }
  })

  .post('/create', async (req, res, next) => {
    try {
      const profile = await User.insert(req.body);
      res.send(profile);
    } catch(err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const userEmail = req.params.email;
      const putUser = await User.update(id, userEmail, req.body);
      res.send(putUser);
    } catch(err) {
      next(err);
    }
  });
 
