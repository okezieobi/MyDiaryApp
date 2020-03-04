import { Op } from 'sequelize';
import CustomErrs from '../errors/custom';
import UserModel from '../models/user';
import Jwt from '../utils/jwt';
import Bcrypt from '../utils/bcrypt';
import Validator from '../utils/coreValidator';
import DbConnect from '../db/database';

const { compare } = Bcrypt;
const {
  userExists, userNotExists, wrongPassword, wrongToken,
} = new CustomErrs();
const { verify } = Jwt;
const { checkUUID } = Validator;
const { notUUID } = CustomErrs;
const { sequelize } = new DbConnect();

export default class UserAuth {
  static async verifyWithUnique({ body: { username = '', email = '' } }, res, next) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const data = await UserModel.findOne({
          where: {
            [Op.or]: [{ username }, { email }],
          },
        }, { transaction: t });
        return data;
      });
      if (result) throw new CustomErrs(400, userExists);
      else next();
    } catch (error) {
      next(error);
    }
  }

  static async findByUnique({ body: { user = '' } }, res, next) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const data = await UserModel.findOne({
          where: {
            [Op.or]: [{ username: user }, { email: user }],
          },
        }, { transaction: t });
        return data;
      });
      if (result) {
        res.locals.registeredUser = result;
        next();
      } else {
        throw new CustomErrs(404, userNotExists);
      }
    } catch (error) {
      next(error);
    }
  }

  static verifyPassword({ body: { password = '' } }, { locals: { registeredUser: { hashedPassword } } }, next) {
    const verifyPassword = compare(hashedPassword, password);
    if (verifyPassword) next();
    else throw new CustomErrs(400, wrongPassword);
  }

  static verifyToken({ headers: { token = '' } }, res, next) {
    const { userId } = verify(token);
    const checkId = checkUUID(userId);
    if (checkId) {
      res.locals.userId = userId;
      next();
    } else {
      throw new CustomErrs(400, notUUID('Id from token'));
    }
  }

  static async authenticateAll(req, res, next) {
    try {
      const { locals: { userId } } = res;
      const authUser = await sequelize.transaction(async (t) => {
        const data = await UserModel.findByPk(userId, { transaction: t });
        return data;
      });
      if (authUser) {
        res.locals.authUser = authUser;
        next();
      } else {
        throw new CustomErrs(401, wrongToken);
      }
    } catch (error) {
      next(error);
    }
  }
}
