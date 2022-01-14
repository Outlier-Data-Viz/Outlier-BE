const pool = require('../utils/pool');
// const jwt = require('jsonwebtoken');

module.exports = class User {
  id;
  username;
  email;
  avatar;
  
  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
    this.avatar = row.avatar;
  }

  static async insert({ email }) {
    const { rows } = await pool.query('INSERT INTO users (email) VALUES ($1) RETURNING *',
      [email]);
    return new User(rows[0]);
  }

  static async selectAll() {
    const { rows } = await pool.query(
      'SELECT * FROM users'
    );
    return rows.map((row) => new User(row));
  }

  //   static async findEmails(email) {
  //     const { rows } = await pool.query(
  //       'SELECT * FROM users WHERE email =$1',
  //       [email]);

  //     if(!rows[0]) return null;
  //     return new User({ ...rows[0] });
  //   }

  static async update(id, userEmail, { username, avatar }) {
    const { rows } = await pool.query(
      `UPDATE users
          SET username = $3, avatar = $4
          WHERE id = $1
          AND email = $2
          RETURNING *`,
      [id, userEmail, username, avatar]
    );
    return new User(rows[0]);
  }

  //   static async remove(id, userEmail) {
  //     const { rows } = await pool.query(
  //       'DELETE FROM users WHERE id = $1 AND email = $2 RETURNING *',
  //       [id, userEmail]
  //     );
  //     return new User(rows[0]);
  //   }

  //   authToken() {
  //     return jwt.sign(this.toJSON(), process.env.JWT_SECRET, {
  //       expiresIn: '24h',
  //     });
  //   }

//   toJSON() {
//     return {
//       id: this.id,
//       username: this.username,
//       email: this.email,
//       avatar: this.avatar
//     };
//   }
};
