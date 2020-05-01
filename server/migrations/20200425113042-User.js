import queries from '../sql/migrations/20200425113042-User';

export default {
  up: async (queryInterface, Sequelize) => queryInterface
    .sequelize.query(queries.up, { type: Sequelize.QueryTypes.Raw }),
  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */


  down: async (queryInterface, Sequelize) => queryInterface
    .sequelize.query(queries.down, { type: Sequelize.QueryTypes.Raw })
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  ,
};
