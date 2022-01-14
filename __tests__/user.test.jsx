const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');


jest.mock('../lib/middleware/ensure-auth', () => {
  return (req, res, next) => {
    req.user = {
      email: 'test@email.com',
    };
    next();
  };
});

const testUser = {
  email: 'test@email.com',  
};

describe('user crud routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('posts user to db', async () => {
    const res = await request(app)
      .post('/api/v1/users/create')
      .send({
        email: 'test2@email.com'
      });
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'test2@email.com',
      username: null,
      avatar: null
    });
  });

  it('gets all users from db', async () => {
    return await request(app)
      .get('/api/v1/users')
      .then((res) => {
        expect(res.body).toEqual([{
          id: expect.any(String),
          email: 'test@email.com',
          username: null,
          avatar: null
        }]
        );
      });
  });

  it('updates a user by id', async () => {
    await User.insert(testUser);

    const res = await request(app)
      .put('/api/v1/users/1')
      .send({
        // id: 1,
        // email: testUser.email,
        username: 'test-user-put',
        avatar: 'test-2.png',
      });
    // eslint-disable-next-line no-console
    console.log(res.body);
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'test@email.com',
      username: 'test-user-put',
      avatar: 'test-2.png',
    });
  });
});
