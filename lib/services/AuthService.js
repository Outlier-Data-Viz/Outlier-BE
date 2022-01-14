// const Auth = require('../models/Auth.js');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User.js');

// module.exports = class AuthService {
//   static async createUser({ email, password}) {
//     const existingUser = await Auth.findEmails(email);

//     if(existingUser) {
//       const error = new Error();
//       error.status = 400;
//       error.message = 'User already exists';
//       throw error;
//     }

//     const passwordHash = await bcrypt.hash(
//       password,
//       Number(process.env.SALT_ROUNDS)
//     );

//     const auth = await Auth.insert(
//       email,
//       passwordHash,
//     );

//     return auth;
//   }

//   static async auth({ email, password }) {
//     const existingUser = await Auth.findEmails(email);

//     if(!existingUser) {
//       throw new Error('Invalid email/password')
//     }

//     const matchPass = await bcrypt.compare(
//       password,
//       existingUser.passwordHash
//     );

//     if(!matchPass) {
//       const error = new Error();
//       error.status = 401;
//       error.message = 'Invalid email/password'
//     }
//     return existingUser;
//   }
// };