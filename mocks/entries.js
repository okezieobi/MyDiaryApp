import { v4 as uuidv4 } from 'uuid';
import userSeeds from './users';

export default [
  {
    id: uuidv4(),
    entry: 'First diary entry',
    userId: userSeeds[0].id,
  },
  {
    id: uuidv4(),
    entry: '2nd diary entry',
    userId: userSeeds[1].id,
  },
];
