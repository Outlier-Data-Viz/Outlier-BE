// const User = require('../models/User');
// const { fetchAuth } = require('../utils/authHelper');


// module.exports = class UserService {
//   static async createProfile() {
//     const auth = await fetchAuth();
//     let profile = await User.findByEmail(auth.email);
//     if(!profile) {
//       profile = await User.insert({
//         email: auth.email
//       });
//     }
//     return profile;
//   }
// };
