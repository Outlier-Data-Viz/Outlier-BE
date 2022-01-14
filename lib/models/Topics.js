const pool = require('../utils/pool');

module.exports = class Topic {
  id;
  name;
  
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }
  
  static async insert({ name }) {
    const { rows } = await pool.query(
      'INSERT INTO topics (name) VALUES ($1) RETURNING *',
      [name]);
    return new Topic(rows[0]);
  }
};
