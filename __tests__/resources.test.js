const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Resources = require('../lib/models/Resources');

describe('resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  const newResource = {
    resourceName: 'identity, inc.',
    resourceURL: 'www.identityinc.org',
    resourceState: 'AK',
  };

  it.only('posts new resource to db', () => {
    return request(app)
      .post('/api/v1/resources')
      .send(newResource)
      .then((res) => {
        expect(res.body).toEqual([
          {
            resourceId: '2',
            ...newResource,
          },
        ]);
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
});
