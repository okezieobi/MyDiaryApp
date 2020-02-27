import dotenv from 'dotenv';
import {
  Sequelize, DataTypes, Model,
} from 'sequelize';
import User from './users';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL || process.env.POSTGRE_URL);

class Entry extends Model {}

Entry.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  entry: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Entry',
});

(async () => { await Entry.sync({ force: true }); })();

export default Entry;
