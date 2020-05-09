// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
import { User } from '../src/models';
import app from '../src/app';
import { userSeeds, entrySeeds } from '../mocks/index';

class Test {
  constructor() {
    this.request = supertest;
    this.app = app;
    this.userSeeds = userSeeds;
    this.entrySeeds = entrySeeds;
  }

  static generateToken(id) {
    return User.generate(id);
  }

  static getRandomArrayIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  static returnRandomValue(...values) {
    return values[Test.getRandomArrayIndex(values)];
  }

  static createVarChars(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let charIndex = 0; charIndex < length; charIndex += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static createEmailVarChar(userLength, domainLength) {
    return `${Test.createVarChars(userLength)}@${Test.createVarChars(domainLength)}.${Test.createVarChars(3)}`;
  }

  static isResPropNumber(res, args) {
    if (typeof res[args] !== 'number') throw new Error(`Expected number but got ${typeof prop}`);
  }

  static isResPropString(prop) {
    if (typeof prop !== 'string') throw new Error(`Expected string but got ${typeof prop}`);
  }
}

export default Test;
