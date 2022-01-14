const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const State = require('../lib/models/State');

const insertState = {
  stateName: 'Alabama',
  abrv: 'AL'
};

describe('state routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('posts state to db', async () => {
    const res = await request(app).post('/api/v1/state/create').send({
      stateName: 'Alabama',
      abrv: 'AL',
    });
    expect(res.body).toEqual({
      ...insertState,
    });
  });

  it('gets all states', async() => {
    await State.insert(insertState);

    return await request(app)
      .get('/api/v1/state')
      .then((res) => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  it('gets a state by name', async() => {
    return await request(app)
      .get('/api/v1/state/alabama')
      .then((res) => {
        expect(res.body).toEqual({
          stateName: 'alabama',
          abrv: 'AL'
        });
      });
  });

  afterAll(() => {
    pool.end();
  });

});
