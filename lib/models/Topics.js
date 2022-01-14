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

  static async selectAll() {
    const { rows } = await pool.query(
      'SELECT * FROM topics'
    );
    return rows.map((row) => new Topic(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * from topics WHERE id = $1',
      [id]);
    if(!rows[0]) return null;

    return new Topic({ ...rows[0] });
  }

  static async remove(id) {
    const { rows } = await pool.query(
      'DELETE FROM topics WHERE id = $1 RETURNING *',
      [id]);
    return new Topic(rows[0]);
  }
};
