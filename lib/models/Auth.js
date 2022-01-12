const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class Auth {
  id;
  email;
  passwordHash;

  constructor(row) {
    this.id = row.id
    this.email = row.email
    this.passwordHash = row.password_hash
  }

  static async insert(email, passwordHash) {
    const { rows } = await pool.query(
      'INSERT INTO auth (email, password_hash) VALUES ($1, $2) RETURNING *',
      [email, passwordHash]
    );
    return new Auth(rows[0]);
  }

  static async findEmails(email) {
    const { rows } = await pool.query(
      'SELECT * FROM auth WHERE email =$1',
      [email]);

      if(!rows[0]) return null;

      return new Auth({...rows[0]})
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM auth WHERE id = $1',
      [id]);
      if(!rows[0]) return null;

      return new Auth({...rows[0]})
  }

  authToken() {
    return jwt.sign(this.toJSON(), process.env.APP_SECRET, {
      expiresIn: '24h'
    });
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      role: this.role
    }
  }
}