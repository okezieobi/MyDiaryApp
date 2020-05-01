import { Sequelize } from 'sequelize';
import env from '../configs/env';

const { herokuPostgresURL, postgresURL } = env;

export default new Sequelize(herokuPostgresURL || postgresURL, { ssl: true, dialect: 'postgres', logging: false });
