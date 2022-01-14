const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const insertState = {
  stateName: 'Alabama',
  abrv: 'AL'
};

describe('state routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  // it('posts state to db', async () => {
  //   const res = await request(app)
  //     .post('/api/v1/state/create')
  //     .send(insertState);
  //   expect(res.body).toEqual({
  //     stateId: '4',
  //     ...insertState,
  //   });
  // });

  it('gets all states', async() => {
    return await request(app)
      .get('/api/v1/state')
      .then((res) => {
        expect(res.body).toEqual([
          {
            stateName: 'Alabama',
            abrv: 'AL'
          },
          {
            stateName: 'Arizona',
            abrv: 'AZ'
          }
        ]);
      });
  });

  it('gets a state by id', async() => {
    return await request(app)
      .get('/api/v1/state/1')
      .then((res) => {
        expect(res.body).toEqual({
          stateId: '1',
          stateName: 'Alabama',
          abrv: 'AL'
        });
      });
  });


});
