import CustomErrs from '../errors/custom';
import UserModel from '../models/user';
/*
import Jwt from '../utils/jwt';
import Validator from '../utils/coreValidator';
*/
import DbConnect from '../db/database';

const {
  userExists, userNotExists,
  // wrongToken,
} = new CustomErrs();
/*
const { verify } = Jwt;
const { checkUUID } = Validator;
const { notUUID } = CustomErrs;
*/
const { sequelize, Op } = new DbConnect();

export default class UserAuth {
  static async verifyWithUnique({ body: { username = '', email = '' } }, res, next) {
    try {
      await sequelize.transaction(async (t) => {
        const data = await UserModel.findOne({
          where: {
            [Op.or]: [{ username }, { email }],
          },
        }, { transaction: t });
        if (data) throw new CustomErrs(400, userExists);
        else next();
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByUnique({ body: { user = '' } }, res, next) {
    try {
      await sequelize.transaction(async (t) => {
        const data = await UserModel.findOne({
          where: {
            [Op.or]: [{ username: user }, { email: user }],
          },
        }, { transaction: t });
        if (data) {
          res.locals.registeredUser = data;
          next();
        } else {
          throw new CustomErrs(404, userNotExists);
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /*
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
      await sequelize.transaction(async (t) => {
        const data = await UserModel.findByPk(userId, { transaction: t });
        if (data) {
          res.locals.authUser = data;
          next();
        } else {
          throw new CustomErrs(401, wrongToken);
        }
      });
    } catch (error) {
      next(error);
    }
  }
  */
}
