const pool = require('../utils/pool');

module.exports = class Stat {
  id;
  data_year;
  key;
  value;
  state;

  constructor(row) {
    this.id = row.id;
    this.year = row.data_year;
    this.key = row.key;
    this.value = row.value;
    this.state = row.state;
  }

  static async findByKey(key) {
    const { rows } = await pool.query(
      `SELECT *
      FROM hate_crime_stats
      WHERE key = $1`,
      [key]
    );
    //console.log('find', key);
    return rows.map((row) => {
      return new Stat(row);
    });
  }

  static async insert({ key, value, state }) {
    const { rows } = await pool.query(
      `INSERT INTO hate_crime_stats (data_year, key, value, state)
        VALUES (2020, $1, $2, $3)
        RETURNING *`,
      [key, value, state]
    );
    return new Stat(rows[0]);
  }
};
