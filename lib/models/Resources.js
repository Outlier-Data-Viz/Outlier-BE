const pool = require('../utils/pool');

module.exports = class Resources {
  resourceId;
  resourceName;
  resourceURL;
  stateAbrv;
  topicId;

  constructor(row) {
    this.resourceId = row.resource_id;
    this.resourceName = row.resource_name;
    this.resourceURL = row.resource_URL;
    this.stateAbrv = {
      stateAbrv: row.state_abrv,
    };
    this.topicId = {
      topicId: row.topics_id,
    };
  }

  static async create({ resourceName, resourceURL, stateAbrv, topicId }) {
    const { rows } = await pool.query(
      `INSERT INTO resources (resource_name, resource_url, state_abrv, topicId)
            VALUES($1, $2, $3, $4)
            RETURNING *`,
      [resourceName, resourceURL, stateAbrv, topicId]
    );
    return new Resources(rows[0]);
  }

  static async getAllResources() {
    const { rows } = await pool.query(
      `SELECT resource_id, resource_name, resource_URL, state_abrv
            FROM resources`
    );
    return rows.map((row) => new Resources(row));
  }
};
