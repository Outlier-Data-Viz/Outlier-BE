const pool = require('../utils/pool');
const User = require('./User');

module.exports = class Populations {
  stateAbrv;
  total;
  lgbt;
  aa;
  latinx;
  homeless;
  poverty;

  constructor(row) {
    this.stateAbrv = row.state_abrv;
    this.total = row.total;
    this.lgbt = row.lgbt;
    this.aa = row.aa;
    this.latinx = row.latinx;
    this.homeless = row.homeless;
    this.lgbtPoverty = row.poverty;
  }

  static async insert({ stateAbrv, total, lgbt, aa, latinx, homeless, lgbtPoverty }) {
    const { rows } = await pool.query(
      `INSERT INTO populations 
      (state_abrv, total, lgbt, aa, latinx)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [stateAbrv, total, lgbt, aa, latinx, homeless, lgbtPoverty]
    );
    return new Populations(rows[0]);
  }

  static async selectAll() {
    const { rows } = await pool.query(
      'SELECT * FROM populations'
    );
    return rows.map((row) => new User(row));
  }

  static async selectPopByState(stateAbrv) {
    const { rows } = await pool.query(
      `SELECT * 
      FROM populations
      WHERE state_abrv = $1`,
      [stateAbrv]
    );
    return new Populations(rows[0]);
  }
};
