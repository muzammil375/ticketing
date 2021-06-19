import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

jest.mock('../nats-wrapper');

let mongo: any;

beforeAll(async () => {
  jest.clearAllMocks();
  process.env.JWT_KEY = 'asdf';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  //Build a JWT payload. {id, email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };
  //Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //Build session Object {jwt: MY_JWT}
  const session = { jwt: token };
  //Turn that session into json
  const sessionJSON = JSON.stringify(session);
  //Take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  //Retrun a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
