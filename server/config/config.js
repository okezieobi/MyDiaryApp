import dotenv from 'dotenv';

dotenv.config();

const development = {
  url: process.env.POSTGRES_URL,
  dialect: 'postgres',
};

const test = {
  url: process.env.POSTGRES_URL,
  dialect: 'postgres',
};

export {
  development, test,
};
