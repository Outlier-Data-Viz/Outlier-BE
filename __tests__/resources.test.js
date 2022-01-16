const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Resources = require('../lib/models/Resources');

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

  it.only('posts new resource to db', async () => {
    const res = await request(app)
      .post('/api/v1/resources/create')
      .send(insertResource);
    expect(res.body).toEqual({
      id: expect.any(String),
      resourceName: expect.any(String),
      resourceURL: expect.any(String),
      resourceState: { resourceState: expect.any(String) },
      topic: { topicId: '1' },
    });
  });
});

it('should get all resources', async () => {
  await Resources.create(newResource);
  return request(app)
    .get('/api/v1/resources')
    .then((res) => {
      expect(res.body).toEqual([
        {
          resourceId: '1',
          resourceName: 'glbtays',
          resourceURL: 'www.glbtays.org',
          resourceState: 'AL',
          topicsId: '1',
        },
      ]);
    });
});

afterAll(() => {
  pool.end();
});
