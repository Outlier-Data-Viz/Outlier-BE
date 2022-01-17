const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');


jest.mock('../lib/middleware/ensure-auth', () => {
  return (req, res, next) => {
    req.user = {
      email: 'testThree@email.com',
    };
    next();
  };
});

const testThree = {
  id: 3,
  authEmail: 'testThree@email.com',  
};

describe('user crud routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('posts user to db', async () => {
    // await Auth.insert(testAuth);
    const res = await request(app)
      .post('/api/v1/users/create')
      .send({
        authEmail: 'testThree@email.com',
        username: 'user',
        avatar: 'pic.png'
      });
    expect(res.body).toEqual({
      id: expect.any(String),
      authEmail: 'testThree@email.com',
      username: 'user',
      avatar: 'pic.png'
    });
  });

  it('gets all users from db', async () => {
    
    // await User.insert(testUserTwo);
    
    return await request(app)
      .get('/api/v1/users')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: expect.any(String),
            authEmail: 'test@email.com',
            username: null,
            avatar: null
          },
          {
            id: expect.any(String),
            authEmail: 'testTwo@email.com',
            username: null,
            avatar: null
          }
        ]
        );
      });
  });

  it('gets user by email', async () => {
    // await User.insert(testUser);
    // await User.insert(testUserTwo);
    
    const res = await request(app).get('/api/v1/users/test@email.com');
    
    expect(res.body).toEqual({
      id: expect.any(String),
      authEmail: 'test@email.com',
      username: null,
      avatar: null
    });
  });
  
  it('updates a user by id', async () => {
    await User.insert(testThree);
    // await User.insert(testUserTwo);

    const res = await request(app)
      .patch(`/api/v1/users/${testThree.id}`)
      .send({
        username: 'test-user-patch',
        avatar: 'test-2.png',
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      authEmail: 'testThree@email.com',
      username: 'test-user-patch',
      avatar: 'test-2.png',
    });
  });
    
  it('deletes user && returns deleted obj', async () => {
    await User.insert(testThree);
      
    await request(app)
      .patch('/api/v1/users/3')
      .send({
        username: 'test-user-updated',
        avatar: 'test-3.png',
      });
    const res = await request(app)
      .delete('/api/v1/users/3');

    expect(res.body).toEqual({
      id: expect.any(String),
      authEmail: 'testThree@email.com',
      username: 'test-user-updated',
      avatar: 'test-3.png',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
