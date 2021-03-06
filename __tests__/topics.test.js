const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Topic = require('../lib/models/Topics');

const testTopic = {
  name: 'test-interesting'
};

describe('topic crud routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('posts topic to db', async () => {
    const res = await request(app)
      .post('/api/v1/topics/create')
      .send({
        name: 'new-interesting'        
      });
    
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'new-interesting'
    });
  });

  it('gets all topics from db', async () => {
    await Topic.insert(testTopic);

    return await request(app)
      .get('/api/v1/topics')
      .then((res) => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  it('gets topic by id', async () => {

    const res = await request(app).get('/api/v1/topics/5');

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Mental Health'
    });
  });

  it('deletes topic by id && returns obj', async () => {

    const res = await request(app)
      .delete('/api/v1/topics/5');

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Mental Health'
    });
  });

  afterAll(() => {
    pool.end();
  });
});
