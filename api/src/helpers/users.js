import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { Sequelize, Op } from 'sequelize';
import Bcrypt from '../utils/bcrypt';
import UserModel from '../models/users';

dotenv.config();

const { hash } = Bcrypt;

const sequelize = new Sequelize(process.env.DATABASE_URL || process.env.POSTGRE_URL);

export default class UserHelper extends UserModel {
  static prepareRequest({
    fullName = '', email = '', password = '', username = '',
  }) {
    return {
      id: uuidv4(), fullName, email, hashedPassword: hash(password), username,
    };
  }

  static prepareResponse({
    id, fullName, username, email, type, createdAt,
  }) {
    return {
      id,
      fullName,
      username,
      email,
      type,
      createdOn: Date(createdAt),
    };
  }

  static async findUserByEmailOrUsername(email = '', username = '') {
    const data = await sequelize.transaction(async (t) => {
      const user = await UserModel.findOne({ where: { [Op.or]: [{ email, username }] } },
        { transaction: t });
      return user;
    });
    return data;
  }

  static async getUserWithUsernameAndEmail(userReq = '') {
    const data = await sequelize.transaction(async (t) => {
      const user = await UserModel.findOne(
        { where: { [Op.or]: [{ email: userReq, username: userReq }] } },
        { transaction: t },
      );
      return user;
    });
    return data;
  }

  static async findUserById(id = '') {
    const data = await sequelize.transaction(async (t) => {
      const user = await UserModel.findOne(
        { where: { id } },
        { transaction: t },
      );
      return user;
    });
    return data;
  }

  static async createUser(reqBody) {
    const reqData = UserHelper.prepareRequest(reqBody);
    const data = await sequelize.transaction(async (t) => {
      const {
        id, fullName, email, username, type, createdAt,
      } = await UserModel.create(
        reqData, { transaction: t, returning: false },
      );
      return {
        id, fullName, email, username, type, createdAt,
      };
    });
    return UserHelper.prepareResponse(data);
  }
}
