import { Sequelize } from 'sequelize';
import queries from '../sql/20200422210030-user';

export default {
  up: async (queryInterface) => queryInterface
    .sequelize.query(queries.up, { type: Sequelize.QueryTypes.Raw }), /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */


  down: async (queryInterface) => queryInterface
    .sequelize.query(queries.down, { type: Sequelize.QueryTypes.Raw })
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  ,
};
