const { Pool } = require('pg');
console.log('URL', process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false },
});
console.log('POOL', pool);
// eslint-disable-next-line no-console
pool.on('connect', () => console.log('Postgres connected'));

module.exports = pool;
