const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class User {
  id;
  email;
  username;
  avatar;
  
  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.username = row.username;
    this.avatar = row.avatar;
  }

  static async insert({ email, username, avatar }) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, username, avatar) VALUES ($1, $2, $3) RETURNING *',
      [email, username, avatar]);
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

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]);
    if(!rows[0]) return null;

    return new User({ ...rows[0] });
  }

  static async update(id, email, { username, avatar }) {
    const { rows } = await pool.query(
      `UPDATE users
          SET username = $3, avatar = $4
          WHERE id = $1
          AND email = $2
          RETURNING *`,
      [id, email, username, avatar]
    );
    return new User(rows[0]);
  }

  static async remove(id, userEmail) {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE id = $1 AND email = $2 RETURNING *',
      [id, userEmail]
    );
    return new User(rows[0]);
  }

  authToken() {
    return jwt.sign(this.toJSON(), process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      avatar: this.avatar
    };
  }
};
