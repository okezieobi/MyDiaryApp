import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import app from './app';
import Logger from './utils/logger';

const { infoLog, errorLog } = new Logger();

dotenv.config();

(async () => {
  try {
    const sequelize = new Sequelize(process.env.DATABASE_URL || process.env.POSTGRE_URL);
    await sequelize.authenticate();
    const port = process.env.PORT || '5000';
    app.listen(port, () => {
      infoLog.info(`Connected to database, app is live and listening on port ${port}!`);
    });
  } catch (error) {
    throw errorLog.error(error);
  }
})();

export default app;
