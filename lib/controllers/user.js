const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth.js');
const User = require('../models/User.js');


module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const users = await User.selectAll();
      res.json(users);
    } catch(err) {
      next(err);
    }
  })

  .post('/create', ensureAuth, async (req, res, next) => {
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
      res.send(user);
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

  .patch('/:id', ensureAuth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const userEmail = req.user.email;
      const patchUser = await User.update(id, userEmail, req.body.username, req.body.avatar);
      res.send(patchUser);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', ensureAuth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const userEmail = req.user.email;
      const deleteUser = await User.remove(id, userEmail);
      res.send(deleteUser);
    } catch(err) {
      next(err);
    }
  });
 
