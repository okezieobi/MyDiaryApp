import DbConnect from '../db/database';
import Token from '../utils/jwt';
import HttpResponse from '../utils/response';
import UserModel from '../models/user';
import Bcrypt from '../utils/bcrypt';
import CustomErrs from '../errors/custom';

const { auth200Res, auth201Res } = HttpResponse;
const { prepareResponse } = UserModel;
const { sequelize } = new DbConnect();
const { generate } = Token;
const { compare } = Bcrypt;
const { wrongPassword } = new CustomErrs();

export default class UserController {
  static async addUser({ body }, res, next) {
    try {
      const reqData = UserModel.prepareRequest(body);
      await sequelize.transaction(async (t) => {
        const data = await UserModel.create(reqData, { transaction: t });
        auth201Res(res, prepareResponse(data), generate(data.id));
      });
    } catch (error) {
      next(error);
    }
  }

  static verifyPassword({ body: { password = '' } }, res) {
    const { locals: { registeredUser } } = res;
    const verifyPassword = compare(registeredUser.hashedPassword, password);
    if (!verifyPassword) throw new CustomErrs(400, wrongPassword);
    else auth200Res(res, prepareResponse(registeredUser), generate(registeredUser.id));
  }
}
