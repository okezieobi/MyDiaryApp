import { v4 as uuidv4 } from 'uuid';
import bcrypt from '../api/src/utils/bcrypt';

const { hash } = bcrypt;

export default [
  {
    id: uuidv4(),
    fullName: 'Frank Okezie',
    username: 'Obiedere',
    email: 'foobar@mail.com',
    hashedPassword: hash('456789Lovely'),
  },
  {
    id: uuidv4(),
    fullName: 'Obi Franklyn',
    username: 'Ekemezie',
    email: 'barfoo@mail.com',
    hashedPassword: hash('456789Lovely'),
  },
];
