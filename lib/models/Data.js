const pool = require('../utils/pool');

module.exports = class Data {
  id;
  data;
  state;
  topic;

  constructor(row) {
    this.id = row.id;
    this.data = row.data;
    this.state = {
      state: row.state,
    };
    this.topic = {
      topic: row.topic,
    };
  }

  static async insert({ data, state, topic }) {
    const { rows } = await pool.query(
      `INSERT INTO additional_data (data, state, topic)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [data, state, topic]
    );
    return new Data(rows[0]);
  }

  static async selectAll() {
    const { rows } = await pool.query(
      `SELECT * 
      FROM additional_data
      LEFT JOIN states
      ON states.abrv = additional_data.state
      LEFT JOIN topics
      ON topics.name = additional_data.topic`
    );
    return rows.map((row) => new Data(row));
  }

};
