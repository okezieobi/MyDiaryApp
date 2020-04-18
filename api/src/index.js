import { Sequelize } from 'sequelize';
import app from './app';
import env from './configs/env';

const { warn, error } = console;
const { appPort, herokuPostgresURL, postgresURL } = env;
const sequelize = new Sequelize(herokuPostgresURL || postgresURL, { dialect: 'postgres' });

const startApp = async () => {
  try {
    await sequelize.authenticate();
    app.listen(appPort || '5000', () => {
      warn(`Connected to database, app is live and listening on port ${appPort || '5000'}!`);
    });
  } catch (err) {
    throw error(err);
  }
};

startApp();

export default app;
