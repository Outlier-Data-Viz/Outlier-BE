const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');

const insertStat = [{ state: 'MN', key:'Anit-Mormon', year: '2020' }];

describe('additional stats routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  xit('posts stats to db', async () => {
    const res = await request(app)
      .post('/api/v1/stats/create')
      .send(insertStat)
      .send(insertStat);
    expect(res.body).toEqual([{
      id: expect.any(String),
      year: '2000',
      key: 'bias',
      value: '100',
      state: 'MN'
    }]);
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
