const pool = require('../utils/pool');

module.exports = class User {
  id;
  authEmail;
  username;
  avatar;
  
  constructor(row) {
    this.id = row.id;
    this.authEmail = row.auth_email;
    this.username = row.username;
    this.avatar = row.avatar;
  }

  static async insert({ authEmail, username, avatar }) {
    const { rows } = await pool.query(
      'INSERT INTO users (auth_email, username, avatar) VALUES ($1, $2, $3) RETURNING *',
      [authEmail, username, avatar]);
    return new User(rows[0]);
  }

  static async selectAll() {
    const { rows } = await pool.query(
      'SELECT * FROM users'
    );
    return rows.map((row) => new User(row));
  }

  static async findByEmail(authEmail) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE auth_email = $1',
      [authEmail]);

    if(!rows[0]) return null;
    return new User(rows[0]);
  }

  static async update(id, authEmail, username, avatar) {
    const { rows } = await pool.query(
      `UPDATE users
          SET username = $3, avatar = $4
          WHERE id = $1
          AND auth_email = $2
          RETURNING *`,
      [id, authEmail, username, avatar]
    );
    return new User(rows[0]);
  }

  static async remove(id, authEmail) {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE id = $1 AND auth_email = $2 RETURNING *',
      [id, authEmail]
    );
    return new User(rows[0]);
  }

};
