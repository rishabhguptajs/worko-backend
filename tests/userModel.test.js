import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../dtos/models/userModel.js';

describe('User Model Test', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should create & save a user successfully', async () => {
    const validUser = new User({
      email: 'test@example.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: 12345
    });

    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(validUser.email);
    expect(savedUser.name).toBe(validUser.name);
    expect(savedUser.age).toBe(validUser.age);
    expect(savedUser.city).toBe(validUser.city);
    expect(savedUser.zipCode).toBe(validUser.zipCode);
    expect(savedUser.isDeleted).toBe(false);
  });

  it('should fail to create user without required fields', async () => {
    const userWithoutRequiredField = new User({ email: 'test@example.com' });
    let err;

    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      err = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
    expect(err.errors.age).toBeDefined();
    expect(err.errors.city).toBeDefined();
    expect(err.errors.zipCode).toBeDefined();
  });

  it('should fail to create user with duplicate email', async () => {
    const user1 = new User({
      email: 'test@example.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: 12345
    });

    await user1.save();

    const user2 = new User({
      email: 'test@example.com',
      name: 'Another User',
      age: 30,
      city: 'Another City',
      zipCode: 67890
    });

    let err;

    try {
      const savedUser2 = await user2.save();
      err = savedUser2;
    } catch (error) {
      err = error;
    }

    console.log(Error)

    expect(err).toBeInstanceOf(mongoose.mongo.MongoServerError);
    expect(err.code).toBe(11000); // Duplicate key error code
  });
}, 30000); // Set the timeout to 30 seconds
