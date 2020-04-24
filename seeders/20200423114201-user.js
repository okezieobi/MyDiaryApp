/* eslint-disable import/no-extraneous-dependencies */
import { userSeeds } from '../mocks';

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [userSeeds[0]]),
  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */


  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
};
