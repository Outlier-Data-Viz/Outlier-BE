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
  // await Resources.insert(insertResource);
  return request(app)
    .get('/api/v1/resources')
    .then((res) => {
      expect(res.body).toEqual([
        {
          id: '1',
          resourceName: 'glbtays',
          resourceURL: 'www.glbtays.org',
          state: { resourceState: 'AL' },
          topic: { topicId: '1' },
        },
        {
          id: '2',
          resourceName: 'example inc.',
          resourceURL: 'www.example.org',
          state: { resourceState: 'AL' },
          topic: { topicId: '1' },
        },
        // {
        //   id: '3',
        //   resourceName: 'example inc.',
        //   resourceURL: 'www.example.org',
        //   state: { resourceState: 'AL' },
        //   topic: { topicId: '1' },
        // },
      ]);
    });
});

afterAll(() => {
  pool.end();
});
