import { User, authToken } from '../models';
import CustomErr from '../errors/custom';
import sequelize from '../db/connect';

export default class UserMiddleware {
  static async authUser({ headers: { token } }, res, next) {
    try {
      await authToken.validateAsync({ token });
      await sequelize.transaction(async (t) => {
        const { userId } = User.verify(token);
        const data = await User.findByPk(userId, { transaction: t });
        if (!data) next(new CustomErr(401, 'Authentication failed'));
        else {
          res.locals.userId = userId;
          next();
        }
      });
    } catch (err) {
      next(err);
    }
  }
}
