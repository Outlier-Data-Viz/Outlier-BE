const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const insertResource = {
  resourceName: 'example inc.',
  resourceURL: 'www.example.org',
  resourceState: 'AL',
  topicId: '1',
};

describe('resources routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('posts new resource to db', async () => {
    const res = await request(app)
      .post('/api/v1/resources/create')
      .send(insertResource);
    expect(res.body).toEqual({
      id: expect.any(String),
      resourceName: 'example inc.',
      resourceURL: 'www.example.org',
      state: { resourceState: 'AL' },
      topic: { topicId: '1' },
    });
  });
});

it('should get all resources', async () => {
  return request(app)
    .get('/api/v1/resources')
    .then((res) => {
      expect(res.body).toEqual(expect.any(Array));
    });
});

afterAll(() => {
  pool.end();
});
