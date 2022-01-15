const pool = require('../utils/pool');

module.exports = class Data {
  id;
  data;
  state;
  // topic;

  constructor(row) {
    this.id = row.id;
    this.data = row.data;
    this.state = {
      state: row.state
    };
    // this.topic = {
    //   topic: row.topic
    // };
  }

  static async insert({ data, state }) {
    const { rows } = await pool.query(
      `INSERT INTO additional_data (data, state)
      VALUES ($1, $2)
      RETURNING *`,
      [data, state]
    );
    return new Data(rows[0]);
  }
  
};
