import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Bcrypt from '../utils/bcrypt';
import DbConnect from '../db/database';

const { sequelize } = new DbConnect();
const { STRING, TEXT, UUID } = DataTypes;
const { hash } = Bcrypt;

class User extends Model {
  static prepareRequest({
    fullName = '', email = '', password = '', username = '',
  }) {
    return {
      id: uuidv4(), fullName, email, hashedPassword: hash(password), username,
    };
  }

  static prepareResponse({
    id, fullName, username, email, type, createdAt,
  }) {
    return {
      id,
      fullName,
      username,
      email,
      type,
      createdOn: Date(createdAt),
    };
  }
}

User.init({
  id: {
    type: UUID,
    allowNull: false,
    primaryKey: true,
  },
  fullName: {
    type: STRING(128),
    allowNull: false,
  },
  username: {
    type: STRING(128),
    allowNull: false,
  },
  email: {
    type: STRING(128),
    allowNull: false,
  },
  hashedPassword: {
    type: TEXT,
    allowNull: false,
  },
  type: {
    type: STRING,
    defaultValue: 'Client',
  },
},
{
  sequelize,
  modelName: 'User',
});

(async () => { await User.sync(); })();

export default User;
