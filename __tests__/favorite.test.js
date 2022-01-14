const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');

const insertFavorite = {
  image: 'example.png',
  userId: '1',
  // topicId: '1'
};

describe('favorites routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('posts favorite to db', async () => {
    const res = await request(app)
      .post('/api/v1/favorite/create')
      .send(insertFavorite);
    expect(res.body).toEqual({
      id: expect.any(String),
      image: expect.any(String),
      user: { userId: expect.any(String) },
      // topic: { topicId: expect.any(String) }
    });
  });

  afterAll(() => {
    pool.end();
  });
});
