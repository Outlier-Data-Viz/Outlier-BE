const pool = require('../utils/pool.js');

module.exports = class Favorite {
  image;
  userId;
  topicId;

  constructor(row) {
    this.id = row.id;
    this.image = row.image;
    this.user = {
      userId: row.user_id
    };
    this.topic = {
      topicId: row.topic_id
    };
  }

  static async insert({ image, userId, topicId }) {
    const { rows } = await pool.query(
      `INSERT INTO favorites (image, user_id, topic_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [image, userId, topicId]
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

  static async findById(id) {
    const favorites = await pool.query(
      `SELECT * 
      FROM favorites
      LEFT JOIN users
      ON favorites.user_id = users.id
      WHERE favorites.id = $1`,
      [id]
    );
    const favoritesRows = favorites.rows[0];
    if (!favoritesRows) return null;

    return new Favorite({ ...favoritesRows });
  }

  static async remove(id) {
    const { rows } = await pool.query(
      `DELETE FROM favorites
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    return new Favorite(rows[0]);
  }
};
