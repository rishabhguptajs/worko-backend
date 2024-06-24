import request from 'supertest';
import app from '../index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../dtos/models/userModel.js';

dotenv.config();

describe('User API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    jest.setTimeout(30000);
    await mongoose.connect(process.env.MONGO_URI);

    const testUser = new User({
      email: 'test@example.com',
      name: 'Test User',
      age: 30,
      city: 'Test City',
      zipCode: '12345',
      isDeleted: false,
    });
    await testUser.save();

    token = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    userId = testUser._id;
  });

  afterAll(async () => {
    jest.setTimeout(30000);

    await User.deleteMany({});
    await mongoose.connection.close();
  });

//   testing route for getting all users
  describe('GET /worko/user', () => {
    it('should return all users', async () => {
      const res = await request(app)
        .get('/worko/user')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('users');
      expect(res.body.users).toBeInstanceOf(Array);
    });
  });

//   testing route for getting a user by specific ID
  describe('GET /worko/user/:id', () => {
    it('should return a user by ID', async () => {
      const res = await request(app)
        .get(`/worko/user/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
    });

    it('should return 404 if user not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      
      const res = await request(app)
        .get(`/worko/user/${nonExistentId}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'User not found!');
    });

    it('should return 400 for invalid ID', async () => {
      const invalidId = '12345';
      
      const res = await request(app)
        .get(`/worko/user/${invalidId}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });
  });

//   testing route for creating a new user
  describe('PORT /worko/user', () => {
    it('should create a new user', async() => {
        const dummyUser = {
            email: 'test@gmail.com',
            name: 'test user',
            age: 1,
            city: 'test city',
            zipCode: '1234',
        }
        const res = await request(app)
            .post('/worko/user')
            .send(dummyUser)

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');

    })
  })

//   testing route for updating a user
  describe('PUT /worko/user/:id', () => {
    it('should update a user by ID', async() => {
        const dummyUser = {
            email: 'test@example.com',
            name: 'test user',
            age: 1,
            city: 'test city',
            zipCode: '1234',
        }
        const res = await request(app)
            .put(`/worko/user/${userId}`)
            .send(dummyUser)
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body).toHaveProperty('message', 'User updated successfully!');
    })
  })

//   testing route for deleting a user
describe('DELETE /worko/user/:id', () => {
    it('should delete a user by ID', async() => {
      const res = await request(app)
        .delete(`/worko/user/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'User deleted successfully!');
    })
})
});
