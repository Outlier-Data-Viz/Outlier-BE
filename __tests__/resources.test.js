const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Resources = require('../lib/models/Resources');

const insertResource = {
  id: '2',
  resourceName: 'example inc.',
  resourceUrl: 'www.example.org',
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
      resourceName: expect.any(String),
      resourceUrl: expect.any(String),
      state: { resourceState: expect.any(String) },
      topic: { topicId: '1' },
    });
  });
});

it('should get all resources', () => {
  return request(app)
    .get('/api/v1/resources')
    .then((res) => {
      expect(res.body).toEqual([
        {
          id: '1',
          resourceName: 'glbtays',
          resourceUrl: 'www.glbtays.org',
          state: { resourceState: expect.any(String) },
          topic: { topicId: '1' },
        },
        {
          id: '2',
          resourceName: 'example inc.',
          resourceUrl: 'www.example.org',
          state: { resourceState: expect.any(String) },
          topic: { topicId: '1' },
        },
      ]);
    });
});

it('should get all resources by state', () => {
  return request(app)
    .get('/api/v1/resources/AL')
    .then((res) => {
      expect(res.body).toEqual([
        {
          id: '1',
          resourceName: 'glbtays',
          resourceUrl: 'www.glbtays.org',
          state: { resourceState: 'AL' },
          topic: { topicId: '1' },
        },
        {
          id: '2',
          resourceName: 'example inc.',
          resourceUrl: 'www.example.org',
          state: { resourceState: 'AL' },
          topic: { topicId: '1' },
        },
      ]);
    });
});

afterAll(() => {
  pool.end();
});
