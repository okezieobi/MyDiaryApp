/* eslint-disable import/no-extraneous-dependencies */
import { userSeeds } from '../mocks';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    // id: userSeeds[0].id,
    fullName: userSeeds[0].fullName,
    email: userSeeds[0].email,
    username: userSeeds[0].username,
    password: userSeeds[0].password,
  }]),
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
