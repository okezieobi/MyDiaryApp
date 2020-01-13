import database from '../db/pgConnect';
import token from '../helpers/jwt';
import authenticateUsers from '../auth/users';
import protocol from '../helpers/response';
import models from '../models/users';
import Queries from '../queries/users';
import logger from '../helpers/logger';

export default class UserController {
  constructor() {
    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
  }

  static async signup({ body }, res) {
    const createUserQuery = Queries.createClient();
    const arrayData = models.requestData(body);
    try {
      const newUser = await database.queryOne(createUserQuery, arrayData);
      const signUpRes = await models.responseData(newUser);
      const signupToken = await token.generate(newUser.id);
      return protocol.auth201Res(res, signUpRes, signupToken);
    } catch (error) {
      return logger.displayErrors(error);
    }
  }

  static async signin(req, res) {
    const { verifyUser } = authenticateUsers;
    try {
      const signInRes = await models.responseData(verifyUser);
      const signinToken = await token.generate(verifyUser.id);
      return protocol.auth200Res(res, signInRes, signinToken);
    } catch (error) {
      return logger.displayErrors(error);
    }
  }
}
