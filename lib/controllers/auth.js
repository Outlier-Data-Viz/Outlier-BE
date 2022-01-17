// const { decodeBase64 } = require('bcryptjs');
const { Router } = require('express');
const AuthService = require('../services/AuthService');
// const ensureAuth = require('../middleware/ensure-auth.js');
// const UserService = require('../services/UserService.js');
// const { getGoogleAuthURL } = require('../utils/authHelper.js');

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
      const auth = await AuthService.findEmails(req.body);
      res.send(auth);
    } catch (err) {
      next(err);
    }
  });
