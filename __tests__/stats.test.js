const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');


describe('additional stats routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });
  xit('gets stats by key and year', async () => {
    const res = await request(app).get(
      '/api/v1/stats/key&year/Anti-Mormon&2000'
    );

    expect(res.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          stats: expect.any(String),
          key: expect.any(String),
          year: '2000',
        },
      ])
    );
  });
});
