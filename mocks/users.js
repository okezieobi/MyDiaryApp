import { User } from '../api/src/models/user';

export default [
  {
    id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNTIyMGE4OS1jZDgwLTQ0ZGYtYjBjOS1kY2FkZmM1NzU4M2YiLCJpYXQiOjE1ODc0MTY2MzMsImV4cCI6MTU4NzUwMzAzM30.7Pi32cEzfRdvoP09IxLgGSaJmj_eYQ8ZQ4eqs2vAhIg',
    fullName: 'Frank Okezie',
    username: 'Obiedere',
    email: 'foobar@mail.com',
    password: User.hashString('456789Lovely'),
  },
  {
    id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNTIyMGE4OS1jZDgwLTQ0ZGYtYjBjOS1kY2FkZmM1NzU4M2YiLCJpYXQiOjE1ODc0MTY2MzMsImV4cCI6MTU4NzUwMzAzM30.7Pi32cEzfRdvoP09IxLgGSaJmj_eYQ8ZQ4eqs2vAhIh',
    fullName: 'Obi Franklyn',
    username: 'Ekemezie',
    email: 'barfoo@mail.com',
    password: User.hashString('456789Lovely'),
  },
];
