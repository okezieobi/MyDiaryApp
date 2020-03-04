import dotenv from 'dotenv';

dotenv.config();

export default class Env {
  constructor() {
    this.postgresURL = process.env.POSTGRE_URL;
    this.appPort = process.env.PORT;
    this.jwtSecret = process.env.SECRET;
    this.herokuPostgresURL = process.env.DATABASE_URL;
  }
}
