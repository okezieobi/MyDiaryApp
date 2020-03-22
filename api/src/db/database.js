import { Sequelize, Op } from 'sequelize';
import Env from '../configs/env';

const { postgresURL, herokuPostgresURL } = new Env();

export default class DbConnect {
  constructor() {
    this.sequelize = new Sequelize(herokuPostgresURL || postgresURL, { dialect: 'postgres' });
    this.Sequelize = Sequelize;
    this.Op = Op;
  }
}
