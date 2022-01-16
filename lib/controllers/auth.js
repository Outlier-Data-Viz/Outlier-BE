// const { decodeBase64 } = require('bcryptjs');
const { Router } = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const client = new OAuth2Client(process.env.CLIENT_ID);
// const ensureAuth = require('../middleware/ensure-auth.js');
// const UserService = require('../services/UserService.js');
// const { getGoogleAuthURL } = require('../utils/authHelper.js');

module.exports = Router()
  .post('api/v1/auth/google', async (req, res, next) => {
    try {
      const { token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
      });
      const { userId, email } = ticket.getPayload();

      const user = await User.insert(userId, email);

      req.session.userId = user.googleId;

      res.status(201);
      res.json(user);  
    } catch (err) {
      next(err);
    }
  })
  .delete('api/v1/auth/logout', async (req, res, next) => {
    try {
      await req.session.destroy();
      res.status(200);
      res.json({
        message: 'successfully logged out'
      });
    } catch (err) {
      next(err);
    }
  })

  .get('/me', async (req, res, next) => {
    try {
      res.status(200);
      res.json(req.user);
    } catch (err) {
      next(err);
    }
  });
//   .get('/login', async (req, res, next) => {
//     try {
//       const googleAuthURL = getGoogleAuthURL();
//       res.redirect(googleAuthURL);
//     } catch (error) {
//       next(error);
//     }
//   })

//   .get('/login/callback', async (req, res, next) => {
//     try {
//       const code = req.query.code;
//       const user = await UserService.create(code);

//       res.cookie('session', user.authToken(), {
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24,
//         secure: true,
//       });

//       res.redirect(process.env.GOOGLE_CALLBACK_URI);
//     } catch (error) {
//       next(error);
//     }
//   })

//   .get('/login/user', ensureAuth, async (req, res, next) => {
//     try {
//       res.send(req.user);
//     } catch (error) {
//       next(error);
//     }
//   });
// });
