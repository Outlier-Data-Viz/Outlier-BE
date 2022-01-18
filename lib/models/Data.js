// const pool = require('../utils/pool');

// module.exports = class Data {
//   id;
//   data;
//   state;
//   topic;

//   constructor(row) {
//     this.id = row.id;
//     this.data = row.data;
//     this.state = {
//       state: row.state,
//     };
//     this.topic = {
//       topic: row.topic,
//     };
//   }

//   static async insert({ data, state, topic }) {
//     const { rows } = await pool.query(
//       `INSERT INTO additional_data (data, state, topic)
//       VALUES ($1, $2, $3)
//       RETURNING *`,
//       [data, state, topic]
//     );
//     return new Data(rows[0]);
//   }

//   static async selectAll() {
//     const { rows } = await pool.query(
//       `SELECT * 
//       FROM additional_data
//       LEFT JOIN states
//       ON states.abrv = additional_data.state
//       LEFT JOIN topics
//       ON topics.name = additional_data.topic`
//     );
//     return rows.map((row) => new Data(row));
//   }

//   static async findById(id) {
//     const data = await pool.query(
//       `SELECT * 
//       FROM additional_data
//       LEFT JOIN states
//       ON states.abrv = additional_data.state
//       LEFT JOIN topics
//       ON topics.name = additional_data.topic
//       WHERE additional_data.id = $1`,
//       [id]
//     );
//     const dataRows = data.rows[0];
//     if (!dataRows) return null;

//     return new Data({ ...dataRows });
//   }

//   static async findByState(state) {
//     const { rows } = await pool.query(
//       `SELECT * 
//       FROM additional_data
//       LEFT JOIN states
//       ON states.abrv = additional_data.state
//       LEFT JOIN topics
//       ON topics.name = additional_data.topic
//       WHERE additional_data.state = $1`,
//       [state]
//     );
//     return rows.map((row) => {
//       return new Data(row);
//     });
//   }

//   static async findByTopic(topic) {
//     const { rows } = await pool.query(
//       `SELECT * 
//       FROM additional_data
//       LEFT JOIN states
//       ON states.abrv = additional_data.state
//       LEFT JOIN topics
//       ON topics.name = additional_data.topic
//       WHERE additional_data.topic = $1`,
//       [topic]
//     );
//     return rows.map((row) => {
//       return new Data(row);
//     });
//   }

//   static async findByStateAndTopic(state, topic) {
//     const { rows } = await pool.query(
//       `SELECT * 
//       FROM additional_data
//       LEFT JOIN states
//       ON states.abrv = additional_data.state
//       LEFT JOIN topics
//       ON topics.name = additional_data.topic
//       WHERE additional_data.state = $1 
//       AND additional_data.topic = $2`,
//       [state, topic]
//     );
//     return rows.map((row) => {
//       return new Data(row);
//     });
//   }

//   static async updateData(id, state, topic, data) {
//     const { rows } = await pool.query(
//       `UPDATE additional_data
//       SET data = $4
//       WHERE state = $2
//       AND topic = $3
//       AND id = $1
//       RETURNING *`,
//       [id, state, topic, data]
//     );
//     return new Data(rows[0]);
//   }

//   static async remove(id) {
//     const { rows } = await pool.query(
//       `DELETE FROM additional_data
//       WHERE id = $1
//       RETURNING *`,
//       [id]
//     );
//     return new Data(rows[0]);
//   }
// };
