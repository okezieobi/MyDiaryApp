import sequelize from '../db/connect';
import User from './user';
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
    // enable option force: true and copy generated sql for skeleton migration
    await User.sync();
    await Entry.sync();
  } catch (err) {
    throw await error(err);
  }
})();

export {
  User, Entry, sequelize,
};
