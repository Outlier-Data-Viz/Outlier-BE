const pool = require('../utils/pool');

module.exports = class Resources {
  resourceName;
  resourceURL;
  resourceState;
  topicId;

  constructor(row) {
    this.id = row.id;
    this.resourceName = row.resource_name;
    this.resourceURL = row.resource_url;
    this.state = {
      resourceState: row.state_abrv,
    };
    this.topic = {
      topicId: row.topics_id,
    };
  }

  static async insert({ resourceName, resourceURL, resourceState, topicId }) {
    const { rows } = await pool.query(
      `INSERT INTO resources (resource_name, resource_url, state_abrv, topics_id)
      VALUES($1, $2, $3, $4)
      RETURNING *`,
      [resourceName, resourceURL, resourceState, topicId]
    );
    return new Resources(rows[0]);
  }

  static async getAllResources() {
    const { rows } = await pool.query(
      `SELECT *
      FROM resources`
    );
    return rows.map((row) => new Resources(row));
  }
};
