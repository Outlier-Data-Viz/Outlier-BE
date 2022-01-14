const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const testTopic = {
  name: 'interesting'
};

describe('topic crud routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('posts topic to db', async () => {
    const res = await request(app)
      .post('/api/v1/topics/create')
      .send({
        name: 'interesting'        
      });
    
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'interesting'
    });
  });


  afterAll(() => {
    pool.end();
  });
});
