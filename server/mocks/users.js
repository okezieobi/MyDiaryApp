import bcrypt from 'bcryptjs';

const hashedPassword = bcrypt.hashSync('password one');

export default [
  {
    id: '18ae5a5b-4c5f-410e-aef1-c0c800cf47f9',
    fullName: 'Frank Okezie',
    username: 'Obiedere',
    email: 'foobar@mail.com',
    password: hashedPassword,
    type: 'Client',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    fullName: 'Obi Franklyn',
    username: 'Ekemezie',
    email: 'barfoo@mail.com',
    password: 'dkdkdkfjkfksfllslfllslfkskfkslsfkslsfmnmcmcnkdldkkkklllllkkjjuuuhhyygfttgggygg',
  },
];
