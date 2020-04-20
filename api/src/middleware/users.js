import { User, authToken } from '../models';
import CustomErr from '../errors/custom';
import sequelize from '../db/connect';

export default class UserMiddleware {
  static async authUser({ headers }, res, next) {
    try {
      await authToken.validateAsync(headers);
      await sequelize.transaction(async (t) => {
        const data = await User.findByPk(headers.primaryKey, { transaction: t });
        if (!data) next(new CustomErr(401, 'Authentication failed'));
        else {
          res.locals.userId = headers.primaryKey;
          const placeholder = headers;
          delete placeholder.primaryKey;
          next();
        }
      });
    } catch (err) {
      next(err);
    }
  }
}
