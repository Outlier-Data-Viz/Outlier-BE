const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');

const insertData = {
  data: '01',
  state: 'AL',
  topic: 'Total Homeless Population',
};

describe('additional data routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('posts data to db', async () => {
    const res = await request(app)
      .post('/api/v1/data/create')
      .send(insertData);
    expect(res.body).toEqual({
      id: expect.any(String),
      data: expect.any(String),
      state: { state: expect.any(String) },
      topic: { topic: expect.any(String) },
    });
  });

});

