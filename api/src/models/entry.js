import {
  Model, DataTypes,
} from 'sequelize';
import sequelize from '../db/connect';

class Entry extends Model {
  static prepareResponse({
    id, subject, body, createdAt,
  }) {
    return {
      id, subject, body, createdOn: Date(createdAt),
    };
  }
}

Entry.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(256),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Entry title is required',
      },
      notEmpty: {
        msg: 'Please enter an entry title',
      },
    },
  },
  body: {
    type: DataTypes.STRING(256),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Entry body is required',
      },
      notEmpty: {
        msg: 'Please enter an entry body',
      },
    },
  },
  createdOn: {
    type: DataTypes.VIRTUAL,
    get() {
      return Date(this.createdAt);
    },
  },
},
{
  sequelize,
  modelName: 'Entry',
});

export default Entry;
