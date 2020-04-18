import { Sequelize, Op } from 'sequelize';
import env from '../configs/env';
import UserModel from '../models/user';
import CustomErr from '../errors/custom';

const { herokuPostgresURL, postgresURL } = env;
const sequelize = new Sequelize(herokuPostgresURL || postgresURL, { dialect: 'postgres' });
const { authUser, prepareResponse } = UserModel;

export default class UserController {
  static async signup({ body }, res, next) {
    try {
      await sequelize.transaction(async (t) => {
        const {
          token, fullName, email, id, username, type, createdOn,
        } = await UserModel.create(body, { transaction: t });
        res.status(201).set('token', token).send({
          data: {
            id, fullName, email, username, type, createdOn, token,
          },
        });
      });
    } catch (error) {
      next(error);
    }
  }

  static async signin({ body: { user, password } }, res, next) {
    try {
      await authUser().validateAsync({ user, password });
      await sequelize.transaction(async (t) => {
        const data = await UserModel.findOne({
          where: {
            [Op.or]: [{ email: user }, { username: user }],
          },
          transaction: t,
        });
        if (!data) next(new CustomErr(404, 'User not registered, please signup'));
        else if (!await UserModel.compareString(data.password, password)) next(new CustomErr(400, 'Password does not match user'));
        else {
          const response = prepareResponse(data);
          res.status(200).set('token', response.token).send(response);
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
