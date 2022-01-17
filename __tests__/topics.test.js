const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Topic = require('../lib/models/Topics');

const testTopic = {
  name: 'interesting',
};

describe.skip('topic crud routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('posts topic to db', async () => {
    const res = await request(app).post('/api/v1/topics/create').send({
      name: 'interesting',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'interesting',
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
    await Topic.insert(testTopic);

    const res = await request(app).get('/api/v1/topics/5');

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'interesting',
    });
  });

  it('deletes topic by id && returns obj', async () => {
    await Topic.insert(testTopic);

    const res = await request(app).delete('/api/v1/topics/5');

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'interesting',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
