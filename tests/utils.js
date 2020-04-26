/* eslint-disable no-console */
import supertest from 'supertest';
import sequelize from '../api/src/db/connect';
import { User } from '../api/src/models';
import app from '../api/src/app';
import { userSeeds, entrySeeds } from '../mocks/index';

const { error } = console;

class Test {
  constructor() {
    this.request = supertest;
    this.UserModel = User;
    this.app = app;
    this.sequelize = sequelize;
    this.userSeeds = userSeeds;
    this.entrySeeds = entrySeeds;
  }

  static async deleteData() {
    try {
      await sequelize.transaction(async (t) => {
        await User.destroy({ truncate: true }, { transaction: t });
      });
    } catch (err) {
      throw await error(err);
    }
  }

  static async addUsers() {
    try {
      await sequelize.transaction(async (t) => {
        await User.create(userSeeds[0], { transaction: t });
        await User.create(userSeeds[1], { transaction: t });
      });
    } catch (err) {
      throw await error(err);
    }
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
