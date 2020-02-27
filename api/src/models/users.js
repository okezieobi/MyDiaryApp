import dotenv from 'dotenv';
import { Sequelize, DataTypes, Model } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL || process.env.POSTGRE_URL);

class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  hashedPassword: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM,
    values: ['Client', 'Admin'],
    defaultValue: 'Client',
  },
},
{
  sequelize,
  modelName: 'User',
});

(async () => { await User.sync({ force: true }); })();

export default User;
