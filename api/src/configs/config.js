require('dotenv').config();

module.exports = {
  development: {
    url: process.env.POSTGRES_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.POSTGRES_URL,
    dialect: 'postgres',
  },
};
