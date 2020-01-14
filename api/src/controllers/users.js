import database from '../db/pgConnect';
import token from '../helpers/jwt';
import authenticateUsers from '../auth/users';
import protocol from '../helpers/response';
import models from '../models/users';
import Queries from '../queries/users';
import logger from '../helpers/logger';

class UserController {
  constructor() {
    this.addUser = this.addUser.bind(this);
    this.sendAuthResponse = this.sendAuthResponse.bind(this);
  }

  async addUser({ body }, res, next) {
    const createUserQuery = Queries.createClient();
    const arrayData = models.requestData(body);
    try {
      this.newUser = await database.queryOne(createUserQuery, arrayData);
      return next();
    } catch (error) {
      return logger.displayErrors(error);
    }
  }

  async sendAuthResponse(req, res) {
    const { newUser } = this;
    const { verifyUser } = authenticateUsers;
    try {
      if (verifyUser) {
        const signInRes = await models.responseData(verifyUser);
        const signinToken = await token.generate(verifyUser.id);
        protocol.auth200Res(res, signInRes, signinToken);
      } else {
        const signUpRes = await models.responseData(newUser);
        const signupToken = await token.generate(newUser.id);
        protocol.auth201Res(res, signUpRes, signupToken);
      }
    } catch (error) {
      throw logger.displayErrors(error);
    }
  }
}

const userController = new UserController();
export default userController;
