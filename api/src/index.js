import DbConnect from './db/database';
import app from './app';
import Logger from './utils/logger';
import Env from './configs/env';

const { infoLog, errorLog } = new Logger();
const { appPort } = new Env();
const { sequelize } = new DbConnect();

const startApp = async () => {
  try {
    await sequelize.authenticate();
    const port = appPort || '5000';
    app.listen(port, () => {
      infoLog.info(`Connected to database, app is live and listening on port ${appPort}!`);
    });
  } catch (err) {
    throw errorLog.error(err);
  }
};

startApp();

export default app;
