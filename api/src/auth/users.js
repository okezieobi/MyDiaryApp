import protocol from '../helpers/response';
import database from '../db/pgConnect';
import literalErrors from '../errors/stringLiterals';
import logger from '../helpers/logger';
// import templateErrors from '../errors/templateLiterals';
// import test from '../helpers/regex';
import Queries from '../queries/users';
//  import jwt from '../helpers/jwt';
import bcrypt from '../helpers/bcrypt';

export default class UserAuth {
  constructor() {
    this.authSignup = this.authSignup.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
  }

  static async authSignup({ body }, res, next) {
    try {
      const { username, email } = body;
      const findUserQuery = Queries.findUserByEmailOrUsername();
      const user = await database.queryOneORNone(findUserQuery, [email, username]);
      if (user) return protocol.err400Res(res, literalErrors.userExists());
      return next();
    } catch (error) {
      return logger.displayErrors(error);
    }
  }

  static async verifyPassword({ body }, res, next) {
    const { password } = body;
    const { verifyUser } = this;
    try {
      const verifyPassword = await bcrypt.compare(verifyUser.password, password);
      if (!verifyPassword) protocol.err400Res(res, literalErrors.wrongPassword());
      else next();
    } catch (error) {
      throw new Error(error);
    }
  }
}
