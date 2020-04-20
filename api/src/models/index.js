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
    await User.sync({ force: true, match: /mydiary/ });
    await Entry.sync({ force: true, match: /mydiary/ });
  } catch (err) {
    error(err);
  }
})();

export {
  User, authSchema, authToken, Entry, sequelize,
};
