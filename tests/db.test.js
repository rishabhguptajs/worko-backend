import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('Database Connection', () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    jest.setTimeout(30000);
    await mongoose.connection.close();
  });

  it('should connect to the database', async () => {

    console.log(mongoose.connection.readyState)

    expect(mongoose.connection.readyState).toEqual(1);
  });
});
