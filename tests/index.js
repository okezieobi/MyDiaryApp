/* eslint-disable no-console */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import chai, {
  expect,
} from 'chai';
import chaiHttp from 'chai-http';
import DbConnect from '../api/src/db/database';
import UserModel from '../api/src/models/user';
import app from '../api/src';
import { userSeeds } from '../mocks/index';
import token from '../api/src/utils/jwt';

const { sequelize } = new DbConnect();

class Test {
  static async deleteData() {
    try {
      await sequelize.transaction(async (t) => {
        await UserModel.destroy({ truncate: true }, { transaction: t });
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async addUsers() {
    try {
      await sequelize.transaction(async (t) => {
        await UserModel.create(userSeeds[0], { transaction: t });
        await UserModel.create(userSeeds[1], { transaction: t });
      });
    } catch (error) {
      console.error(error);
    }
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
