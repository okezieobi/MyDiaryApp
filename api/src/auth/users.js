import protocol from '../helpers/response';
import database from '../db/pgConnect';
import literalErrors from '../errors/stringLiterals';
import logger from '../helpers/logger';
// import templateErrors from '../errors/templateLiterals';
// import test from '../helpers/regex';
import Queries from '../queries/users';
//  import jwt from '../helpers/jwt';
import bcrypt from '../helpers/bcrypt';

class UserAuth {
  constructor() {
    this.authSignup = this.authSignup.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.authSignin = this.authSignin.bind(this);
  }

  async authSignup({ body }, res, next) {
    try {
      const { username, email } = body;
      const findUserQuery = Queries.findUserByEmailOrUsername();
      this.newUser = await database.queryOneORNone(findUserQuery, [email, username]);
      if (this.newUser) return protocol.err400Res(res, literalErrors.userExists());
      return next();
    } catch (error) {
      return logger.displayErrors(error);
    }
  }

  async authSignin({ body }, res, next) {
    try {
      const { user } = body;
      const findUserQuery = Queries.findUserWithUsernameOrEmail();
      this.verifyUser = await database.queryOneORNone(findUserQuery, [user]);
      if (!this.verifyUser) return protocol.err404Res(res, literalErrors.userNotExists());
      return next();
    } catch (error) {
      return logger.displayErrors(error);
    }
  }

  async verifyPassword({ body }, res, next) {
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

const authUser = new UserAuth();
export default authUser;
