const pool = require('../utils/pool');

module.exports = class Resources {
  resourceId;
  resourceName;
  resourceURL;
  stateAbrv;
  //   topicId;

  constructor(row) {
    this.resourceId = row.resource_id;
    this.resourceName = row.resource_name;
    this.resourceURL = row.resource_URL;
    this.stateAbrv = row.state_abrv;
    // this.topicId = row.topics_id;
  }

  static async create({ resourceName, resourceURL, stateAbrv }) {
    const { rows } = await pool.query(
      `INSERT INTO resources (resource_name, resource_url, state_abrv)
            VALUES($1, $2, $3)
            RETURNING *`,
      [resourceName, resourceURL, stateAbrv]
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
  static async getResourcesById(id) {
    const result = await pool.query(
      `SELECT *
            FROM resources
            WHERE resource_id = ($1)`,
      [id]
    );
    const resource = result.rows[0];
    const resourcesTwo = await pool.query(
      `SELECT abrv
            FROM states
            WHERE abrv = ($2)`,
      [id]
    );
    const resourcesRow = resourcesTwo.rows[0];

    // const { rows } = await pool.query(
    //   `SELECT id
    //         FROM topics
    //         LEFT JOIN states
    //         ON topics.id = states.abrv
    //         WHERE states.abrv = ($2)`,
    //   [id]
    // );
    // const topicsRows = rows[0];

    return {
      resourceId: resource.resource_id,
      resourceName: resource.resource_name,
      resourceURL: resource.resource_URL,
      resourcesRow: { ...resourcesRow },
      //         topics: [
      //             {
      //             topicId: topicsRows.id,
      //             state: {
      //                 state: resourcesRow.state_abrv
      //             },
      //     },
      // ],
    };
  }

  static async update({ resourceId, resourceName, resourceURL }) {
    const { rows } = await pool.query(
      `UPDATE resources 
            SET resource_name=$2, resource_URL=$3
            WHERE resource_id=$1
            RETURNING *`,
      [resourceId, resourceName, resourceURL]
    );
    return new Resources(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM resources
            WHERE $1 NOT IN 
            (SELECT resources.resource_id
                FROM resources
                // INNER JOIN topics
                // ON topics.id = resources.resource_id
                // WHERE topics.id = $1)
                // AND resources.topics_id = $1
                RETURNING *`,
      [id]
    );
    if (!rows[0]) return 'cannot delete resource data';
    return new Resources(rows[0]);
  }
};
