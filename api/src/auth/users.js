import protocol from '../helpers/response';
import database from '../db/pgConnect';
import literalErrors from '../errors/stringLiterals';
// import templateErrors from '../errors/templateLiterals';
// import test from '../helpers/regex';
import Queries from '../queries/users';
// import jwt from '../helpers/jwt';
// import bcrypt from '../helpers/bcrypt';

export default class UserAuth {
  static async authEmailUsername({ body }) {
    const { username, email } = body;
    const findUserQuery = Queries.findUserByEmailOrUsername();
    const user = await database.queryOneORNone(findUserQuery, [email, username]);
    return user;
  }

  static async signUp(req, res, next) {
    const user = await this.authEmailUsername(req);
    if (user) return protocol.err400Res(res, literalErrors.userExists());
    return next();
  }
}
