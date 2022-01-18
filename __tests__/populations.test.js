const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('population get routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('gets all pop stats from db', async () => {
    return await request(app)
      .get('/api/v1/populations')
      .then((res) => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  it('gets populations by state', async () => {
    const res = await request(app)
      .get('/api/v1/populations/AL');

    expect(res.body).toEqual({
      stateAbrv: 'AL',
      total: '4903185',
      lgbt: '117000',
      aa: '1296162',
      latinx: '264067',
      homeless: '3351',
      lgbtPoverty: null
    });
  });
});
