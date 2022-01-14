const pool = require('../utils/pool');

module.exports = class State {
  stateName;
  abrv;
  totalPop;

  constructor(row) {
    this.stateName = row.state_name;
    this.abrv = row.abrv;
    this.totalPop = row.total_pop;
  }

  static async insert({ stateName, abrv, totalPop }) {
    const { rows } = await pool.query(
      `INSERT INTO states (state_name, abrv, total_pop)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [stateName, abrv, totalPop]
    );
    return new State(rows[0]);
  }
  
  static async getAllStates() {
    const { rows } = await pool.query('SELECT * FROM states');

    return rows.map((row) => new State(row));
  }

  static async getState(stateName) {
    const { rows } = await pool.query(
      `SELECT *
      FROM states
      WHERE state_name = $1`, [stateName]
    );
    return new State({ ...rows[0] });
  }
};
