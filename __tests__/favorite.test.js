const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const Favorite = require('../lib/models/Favorite');

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

  it('gets all favorites', async () => {
    await Favorite.insert(insertFavorite);

    return await request(app)
      .get('/api/v1/favorite')
      .then((res) => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  it('gets favorite by id', async () => {
    await Favorite.insert(insertFavorite);

    const res = await request(app).get('/api/v1/favorite/1');

    expect(res.body).toEqual({
      id: expect.any(String),
      image: expect.any(String),
      user: { userId: expect.any(String) }
    });
  });


  afterAll(() => {
    pool.end();
  });
});
