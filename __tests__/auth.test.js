const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const request = require('supertest');
// const app = require('../lib/app');
// const UserService = require('../lib/services/AuthService');

// const testUser = {
//   email: 'test@email.com',
//   password: 'password'
// };

// const badUser = {
//   email: 'badtest@email.com',
//   password: 'password'
// };

describe.skip('crud for user', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('equals 4', () => {
    expect(2 + 2).toEqual(4);
  });

  // it('posts new user to DB', async () => {
  //   const res = await request(app)
  //   .post('/api/v1/auth/signup')
  //   .send({
  //     email: 'test@email.com',
  //     password: 'password',
  //   });
  //   expect(res.body).toEqual({
  //     id: expect.any(String),
  //     email: 'test@email.com'
  //   });
  // });

  // it('logs existing user in via post route', async () => {
  //   await UserService.createUser(testUser);
  //   const res = await request(app)
  //     .post('/api/v1/auth/login')
  //     .send(testUser);
  //     expect(res.body).toEqual({
  //       id: expect.any(String),
  //       email: 'test@email.com'
  //     });
  // });

  // it('ensures login credentials exist', async () => {
  //   await UserService.createUser(testUser);
    
  //   const res = await request(app)
  //   .post('/api/v1/auth/login')
  //   .send(badUser);
    
  //   expect(res.body).toEqual({
  //     message: 'Invalid email/password',
  //     status: 401
  //   });
  // });
  
  // it('gets currently logged user at /profile', async () => {
  //   await UserService.createUser({
  //     email: 'test@email.com',
  //     password: 'password',
  //   });
    
  //   const agent = request.agent(app);
    
  //   await agent
  //   .post('/api/v1/auth/login')
  //   .send({
  //     email: 'test@email.com',
  //     password: 'password',
  //   })
    
  //   const res = await agent
  //   .get('/api/v1/auth/profile');
    
  //   console.log(res.body);
  //   expect(res.body).toEqual({
  //     id: expect.any(String),
  //     exp: expect.any(Number),
  //     iat: expect.any(Number),
  //     email: 'test@email.com'
  //   });
  // });

  afterAll(() => {
    pool.end();
  });
});
