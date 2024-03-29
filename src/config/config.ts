import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
console.log(MONGO_USERNAME, MONGO_PASSWORD)
const MONGO_URL = process.env.MONGO_URL || '';

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SEVER_PORT) : 1337;

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  }
}
