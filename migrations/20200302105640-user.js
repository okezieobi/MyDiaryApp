
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await [queryInterface.addConstraint('Users', ['username', 'email'], { type: 'unique', name: 'user_uniques' }),
      queryInterface.addColumn('Users', 'isAdmin', {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      })];
  },
  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */


  down: async (queryInterface) => {
    await [queryInterface.removeConstraint('Users', 'user_uniques'),
      queryInterface.removeColumn('Users', 'isAdmin')];
  }
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  ,
};
