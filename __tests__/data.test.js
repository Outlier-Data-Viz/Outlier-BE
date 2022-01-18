// const setup = require('../data/setup');
// const app = require('../lib/app');
// const request = require('supertest');
// const pool = require('../lib/utils/pool');
// const Data = require('../lib/models/Data');

// const insertData = {
//   data: '01',
//   state: 'AL',
//   topic: 'Total_Homeless_Population',
// };

// describe('additional data routes', () => {
//   beforeEach(async () => {
//     await setup(pool);
//   });

//   it('posts data to db', async () => {
//     const res = await request(app)
//       .post('/api/v1/data/create')
//       .send(insertData);
//     expect(res.body).toEqual({
//       id: expect.any(String),
//       data: expect.any(String),
//       state: { state: expect.any(String) },
//       topic: { topic: expect.any(String) },
//     });
//   });

//   it('gets all additional data from db', async () => {
//     await Data.insert(insertData);

//     return await request(app)
//       .get('/api/v1/data')
//       .then((res) => {
//         expect(res.body).toEqual(expect.any(Array));
//       });
//   });

//   it('gets additional data by id', async () => {
//     await Data.insert(insertData);

//     const res = await request(app).get('/api/v1/data/1');

//     expect(res.body).toEqual({
//       id: expect.any(String),
//       data: expect.any(String),
//       state: { state: expect.any(String) },
//       topic: { topic: expect.any(String) },
//     });
//   });

//   it('gets additional data by state', async () => {
//     const res = await request(app).get('/api/v1/data/state/AL');

//     expect(res.body).toEqual(
//       expect.arrayContaining([
//         {
//           id: expect.any(String),
//           data: expect.any(String),
//           state: { state: expect.any(String) },
//           topic: { topic: expect.any(String) },
//         },
//       ])
//     );
//   });

//   it('gets additional data by topic', async () => {
//     const res = await request(app).get(
//       '/api/v1/data/topic/Total_Homeless_Population'
//     );

//     expect(res.body).toEqual(
//       expect.arrayContaining([
//         {
//           id: expect.any(String),
//           data: expect.any(String),
//           state: { state: expect.any(String) },
//           topic: { topic: expect.any(String) },
//         },
//       ])
//     );
//   });

//   it('gets data by state and topic', async () => {
//     const res = await request(app).get(
//       '/api/v1/data/state&topic/CA&Total_Homeless_Population'
//     );

//     expect(res.body).toEqual(
//       expect.arrayContaining([
//         {
//           id: expect.any(String),
//           data: expect.any(String),
//           state: { state: expect.any(String) },
//           topic: { topic: expect.any(String) },
//         },
//       ])
//     );
//   });

//   xit('updates data by id and returns obj', async () => {
//     await Data.insert(insertData);

//     const res = await request(app)
//       .put('/api/v1/data/1')
//       .send({
//         data: '2',
//         state: 'AL',
//         topic: 'Total_Homeless_Population',
//       });

//     expect(res.body).toEqual({
//       id: expect.any(String),
//       data: '2',
//       state: { state: expect.any(String) },
//       topic: { topic: expect.any(String) },
//     });
//   });

//   it('deletes data by id and returns obj', async () => {
//     await Data.insert(insertData);

//     const res = await request(app).delete('/api/v1/data/1');

//     expect(res.body).toEqual({
//       id: expect.any(String),
//       data: expect.any(String),
//       state: { state: expect.any(String) },
//       topic: { topic: expect.any(String) },
//     });
//   });

//   afterAll(() => {
//     pool.end();
//   });
// });

