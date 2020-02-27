import { DataTypes } from 'sequelize';
import bcrypt from '../api/src/utils/bcrypt';

const { UUIDV4 } = DataTypes;

const { hash } = bcrypt;

export default [
  {
    id: UUIDV4,
    fullName: 'Frank Okezie',
    username: 'Obiedere',
    email: 'foobar@mail.com',
    hashedPassword: hash('456789Lovely'),
  },
  {
    id: UUIDV4,
    fullName: 'Obi Franklyn',
    username: 'Ekemezie',
    email: 'barfoo@mail.com',
    hashedPassword: hash('456789Lovely'),
  },
];
