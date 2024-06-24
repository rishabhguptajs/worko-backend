import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import UserDAO from '../daos/userDAO.js';
import User from '../dtos/models/userModel.js';

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('UserDAO tests', () => {
  it('should get all users', async () => {
    const user1 = new User({ email: 'test1@example.com', name: 'Test User 1', age: 30, city: 'City1', zipCode: '12345', isDeleted: false });
    const user2 = new User({ email: 'test2@example.com', name: 'Test User 2', age: 25, city: 'City2', zipCode: '67890', isDeleted: false });
    await user1.save();
    await user2.save();

    const users = await UserDAO.getUsers();
    expect(users.length).toBe(2);
    expect(users[0].email).toBe('test1@example.com');
    expect(users[1].email).toBe('test2@example.com');
  });

  it('should get user by id', async () => {
    const user = new User({ email: 'test@example.com', name: 'Test User', age: 30, city: 'City', zipCode: '12345', isDeleted: false });
    await user.save();

    const foundUser = await UserDAO.getUserById(user._id);
    expect(foundUser.email).toBe('test@example.com');
  });

  it('should create a new user', async () => {
    const userData = { email: 'test@example.com', name: 'Test User', age: 30, city: 'City', zipCode: '12345' };

    const newUser = await UserDAO.createUser(userData);
    expect(newUser.email).toBe('test@example.com');
  });

  it('should update a user', async () => {
    const user = new User({ email: 'test@example.com', name: 'Test User', age: 30, city: 'City', zipCode: '12345', isDeleted: false });
    await user.save();

    const updatedUser = await UserDAO.updateUser(user._id, { name: 'Updated User' });
    expect(updatedUser.name).toBe('Updated User');
  });

  it('should softly delete a user', async () => {
    const user = new User({ email: 'test@example.com', name: 'Test User', age: 30, city: 'City', zipCode: '12345', isDeleted: false });
    await user.save();

    const deletedUser = await UserDAO.deleteUser(user._id);
    expect(deletedUser.isDeleted).toBe(true);

    const foundUser = await UserDAO.getUserById(user._id);
    expect(foundUser).toBeNull();
  });
});
