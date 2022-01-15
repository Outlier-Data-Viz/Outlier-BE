const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');

const insertData = {
  data: '01',
  state: 'NS',
  // topic: 'Total Homeless Population',
};

describe('additional data routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  xit('posts data to db', async () => {
    const res = await request(app)
      .post('/api/v1/data/create')
      .send(insertData);
    expect(res.body).toEqual({
      data: expect.any(String),
      state: expect.any(String),
      // topic: expect.any(String),
    });
  });

});

