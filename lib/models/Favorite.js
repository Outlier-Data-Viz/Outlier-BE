const pool = require('../utils/pool.js');

module.exports = class Favorite {
  image;
  userId;
  // topicId;

  constructor(row) {
    this.id = row.id;
    this.image = row.image;
    this.user = {
      userId: row.user_id
    };
    // this.topic = {
    //   topicId: row.topic_id
    // };
  }

  static async insert({ image, userId }) {
    const { rows } = await pool.query(
      `INSERT INTO favorites (image, user_id)
      VALUES ($1, $2)
      RETURNING *`,
      [image, userId]
    );
    return new Favorite(rows[0]);
  }

  static async selectAll() {
    const { rows } = await pool.query(
      `SELECT * 
      FROM favorites
      LEFT JOIN users
      ON favorites.user_id = users.id`
    );
    return rows.map((row) => new Favorite(row));
  }
};
