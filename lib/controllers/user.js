const { Router } = require('express');
// const ensureAuth = require('../middleware/ensure-auth.js');
// const ensureGoogle = require('../middleware/ensureGoogle');
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

  .get('/:email', async (req, res, next) => {
    try {
      const email = req.params.email;
      const user = await User.findByEmail(email);
      res.send(user || {});
    } catch(err) {
      next(err);
    }
  })

// .get('/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     // const email = req.user.email;
//     const user = await User.findById(id);
//     res.send(user);
//   } catch(err) {
//     next(err);
//   }
// })

  .patch('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      // const userEmail = req.user.email;
      const patchUser = await User.update(id, req.body);
      res.send(patchUser);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      // const userEmail = req.user.email;
      const deleteUser = await User.remove(id);
      res.send(deleteUser);
    } catch(err) {
      next(err);
    }
  });
 
