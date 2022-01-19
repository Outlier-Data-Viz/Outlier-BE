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

  static async findByKeyandYear(year, key) {
    const { rows } = await pool.query(
      `SELECT *
        FROM hate_crime_stats
        WHERE data_year = $1
        AND key = $2`,
      [year, key]
    );
    return rows.map((row) => {
      return new Stat(row);
    });
  }

  static async insert(year, key, value) {
    console.log('insert', year, key, value);
    const { rows } = await pool.query(
      `INSERT INTO hate_crime_stats (data_year, key, value)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [year, key, value]
    );
    return new Stat(rows[0]);
  }
};
