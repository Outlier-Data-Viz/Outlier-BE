const { Router } = require('express');
const Auth = require('../models/Auth');
const AuthService = require('../services/AuthService');

const oneDay = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try{
      const auth = await AuthService.createAuth({ ...req.body });
     
      res.cookie('session', auth.authToken(), {
        httpOnly: true,
        maxAge: oneDay
      });
      res.send(auth);
    } catch (err) {
      err.status = 400;
      next(err);
    }
  })

  .post('/login', async (req, res, next) => {
    try{
      const auth = await AuthService.getAuth(req.body);

      res.cookie('session', auth.authToken(), {
        httpOnly: true,
        maxAge: oneDay
      });
      res.send(auth);
    } catch (err) {
      err.status = 401;
      next(err);
    }
  })

  .get('/:email', async (req, res, next) => {
    try {
      const email = req.params.email;
      const user = req.user;
      const auth = await Auth.findEmails(email);
      res.send(auth, user);
    } catch (err) {
      next(err);
    }
  });
