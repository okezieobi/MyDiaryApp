import { User, sequelize } from '../models';
import CustomErr from '../errors/custom';

export default class UserMiddleware {
  static async authUser({ headers: { token } }, res, next) {
    try {
      await User.authToken.validateAsync({ token });
      const userId = User.checkToken(token);
      await sequelize.transaction(async (t) => {
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
