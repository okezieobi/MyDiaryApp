import { Sequelize } from 'sequelize';
import userSeeds from './users';

export default [
  {
    id: Sequelize.UUIDV4,
    entry: 'First diary entry',
    userId: userSeeds[0].id,
  },
  {
    id: Sequelize.UUIDV4,
    entry: '2nd diary entry',
    userId: userSeeds[1].id,
  },
];
