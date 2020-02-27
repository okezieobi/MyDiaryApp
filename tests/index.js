import 'core-js/stable';
import 'regenerator-runtime/runtime';
import chai, {
  expect,
} from 'chai';
import chaiHttp from 'chai-http';
import UserHelper from '../api/src/helpers/users';
import app from '../api/src';
import { userSeeds } from '../mocks/index';
import token from '../api/src/utils/jwt';

class Test {
  static async deleteData() {
    await UserHelper.destroy({ truncate: true });
  }

  static async users() {
    await UserHelper.createUser(userSeeds[0]);
    await UserHelper.createUser(userSeeds[1]);
  }

  static generateToken(id) {
    return token.generate(id);
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
}

export {
  expect,
  chai,
  chaiHttp,
  app,
  Test,
  userSeeds,
};
