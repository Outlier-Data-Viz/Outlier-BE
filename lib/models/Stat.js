const pool = require('../utils/pool');

//Maybe Statistic spelled out would help here seeing as you also have `state` for a model name
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

  static async findByKey(key, state) {
    const { rows } = await pool.query(
      `SELECT *
      FROM hate_crime_stats
      WHERE key = $1
      AND state = $2
      AND data_year = '2020'`,
      [key, state]
    );
    return rows.map((row) => {
      return new Stat(row);
    });
  }

  static async insert({ data_year, key, value, state }) {
    const { rows } = await pool.query(
      `INSERT INTO hate_crime_stats (data_year, key, value, state)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [data_year, key, value, state]
    );
    return new Stat(rows[0]);
  }

  static async clear() {
    await pool.query(
      'TRUNCATE TABLE hate_crime_stats',
    );
    return;
  }
};

