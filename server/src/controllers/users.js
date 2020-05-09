import { Op } from 'sequelize';
import { User, sequelize } from '../models';
import CustomErr from '../errors/custom';


export default class UserController {
  static async signup({ body }, res, next) {
    try {
      await sequelize.transaction(async (t) => {
        const {
          token, fullName, email, id, username, type, createdOn, status,
        } = await User.create(body, { transaction: t });
        res.status(status).set('token', token).send({
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
      await User.authSchema.validateAsync({ user, password }, { abortEarly: false });
      await sequelize.transaction(async (t) => {
        const data = await User.findOne({
          where: {
            [Op.or]: [{ email: user }, { username: user }],
          },
          transaction: t,
        });
        if (!data) next(new CustomErr(404, 'User not registered, please signup'));
        else {
          await User.compareString(data.password, password);
          const response = User.prepareResponse(data);
          res.status(200).set('token', response.token).send({ data: response });
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
