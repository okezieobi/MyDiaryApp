import dotenv from 'dotenv';

dotenv.config();

export default {
  postgresURL: process.env.POSTGRES_URL,
  appPort: process.env.PORT,
  jwtSecret: process.env.SECRET,
  herokuPostgresURL: process.env.DATABASE_URL,
};
