const pool = require('../utils/pool');

module.exports = class Stat {
  id;
  data_year;
  key;
  value;

  constructor(row) {
    this.id = row.id;
    this.year = row.data_year;
    this.key = row.key;
    this.value = row.value;
  }

  static async findByKeyandYear(key) {
    console.log('find', key);
    const { rows } = await pool.query(
      `SELECT *
        FROM hate_crime_stats
        WHERE key = $1`,
      [key]
    );
    return rows.map((row) => {
      return new Stat(row);
    });
  }

  static async insert(key, value) {
    const { rows } = await pool.query(
      `INSERT INTO hate_crime_stats (data_year, key, value)
        VALUES (2020, $1, $2)
        RETURNING *`,
      [key, value]
    );
    return new Stat(rows[0]);
  }
};
