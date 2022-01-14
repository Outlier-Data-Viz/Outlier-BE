// const { Router } = require('express');
// const AuthService = require('../services/AuthService.js');
// const ensureAuth = require('../middleware/ensure-auth');

// const oneDay = 1000 * 60 * 60 * 24

// module.exports = Router() 
//   .post('/signup', async (req, res, next) => {
//     try {
//       const user = await AuthService.createUser({ ...req.body });

//       res.cookie('userId', user.authToken(), {
//         httpOnly: true,
//         maxAge: oneDay
//       });
//       res.send(user);
//     } catch (err) {
//       err.status = 400;
//       next(err);
//     }
//   })

//   .post('/login', async (req, res, next) => {
//     try {
//       const user = await AuthService.auth(req.body);

//       res.cookie('userId', user.authToken(), {
//         httpOnly: true,
//         maxAge: oneDay
//       });

//       res.send(user);
//     } catch (err) {
//       err.status = 401;
//       next(err);
//     }
//   })

//   .get('/profile', ensureAuth, async (req, res, next) => {
//     try {
//       res.send(req.user);
//     } catch(err) {
//       next(err);
//     }
//   });
