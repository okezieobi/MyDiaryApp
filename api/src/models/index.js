import sequelize from '../db/connect';
import { User, authSchema, authToken } from './user';
import Entry from './entry';

const { error } = console;

User.hasMany(Entry, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: {
    allowNull: false,
  },
});

Entry.belongsTo(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: {
    allowNull: false,
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    await User.sync();
    await Entry.sync();
  } catch (err) {
    throw await error(err);
  }
})();

export {
  User, authSchema, authToken, Entry,
};
