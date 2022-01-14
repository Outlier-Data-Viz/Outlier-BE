const { pool } = require('../utils/pool');

module.exports = class State {
  stateId;
  stateName;
  abrv;

  constructor(row) {
    this.stateId = row.state_id;
    this.stateName = row.state_name;
    this.abrv = row.abrv;
  }

  // static async insert({ stateName, abrv }) {
  //   const { rows } = await pool.query(
  //     `INSERT INTO states (state_name, abrv)
  //           VALUES ($1, $2)
  //           RETURNING *`,
  //     [stateName, abrv]
  //   );
  //   return new State(rows[0]);
  // }
  
  static async getAllStates() {
    const { rows } = await pool.query('SELECT * FROM states');

    return rows.map((row) => new State(row));
  }

  static async getState(stateId) {
    const { rows } = await pool.query(
      `SELECT *
      FROM states
      WHERE state_id = $1`, [stateId]
    );
    return new State(rows[0]);
  }
};
