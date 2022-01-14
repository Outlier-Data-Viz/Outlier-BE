// const pool = require('../utils/pool.js');

// module.exports = class Favorite {
//   id;
//   email;

//   constructor(row) {
//     this.id = row.id;
//     this.email = row.email;
//   }

//   static async insert({ email }) {
//     const { rows } = await pool.query(
//       `INSERT INTO favorites (email)`
//     )
//   }
// }