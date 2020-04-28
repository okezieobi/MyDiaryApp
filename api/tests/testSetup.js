/* eslint-disable import/no-extraneous-dependencies */
import 'jest-chain';
import 'jest-extended';
import concurrently from 'concurrently';

beforeEach(async () => {
  await concurrently(['npm run pretest-server']);
});

/*
beforeEach((done) => {
  migrations.up().then(() => done());
});

beforeEach((done) => {
  seeders.up().then(() => done());
});
*/
