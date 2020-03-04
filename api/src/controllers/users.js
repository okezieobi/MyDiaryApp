import DbConnect from '../db/database';
import Token from '../utils/jwt';
import HttpResponse from '../utils/response';
import UserModel from '../models/user';

const { auth200Res, auth201Res } = HttpResponse;
const { prepareResponse } = UserModel;
const { sequelize } = new DbConnect();
const { generate } = Token;

export default class UserController {
  static async addUser({ body }, res, next) {
    try {
      const reqData = UserModel.prepareRequest(body);
      const newUserRes = await sequelize.transaction(async (t) => {
        const data = await UserModel.create(reqData, { transaction: t });
        return data;
      });
      auth201Res(res, prepareResponse(newUserRes), generate(newUserRes.id));
    } catch (error) {
      next(error);
    }
  }

  static sendAuthRes(req, res) {
    const { locals: { registeredUser } } = res;
    auth200Res(res, prepareResponse(registeredUser), generate(registeredUser.id));
  }
}
