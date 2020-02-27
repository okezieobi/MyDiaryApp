import CustomErrs from '../errors/custom';
import UserHelper from '../helpers/users';
import Jwt from '../utils/jwt';
import Bcrypt from '../utils/bcrypt';
import Validator from '../utils/coreValidator';

const { compare } = Bcrypt;
const {
  userExists, userNotExists, wrongPassword, wrongToken,
} = new CustomErrs();
const { verify } = Jwt;
const { checkUUID } = Validator;
const { notUUID } = CustomErrs;
const { findUserByEmailOrUsername, findUserById, getUserWithUsernameAndEmail } = UserHelper;

export default class UserAuth {
  static async findUserWithEmailOrUsername({ body: { username = '', email = '' } }, res, next) {
    try {
      const newUser = await findUserByEmailOrUsername(username, email);
      if (newUser) throw new CustomErrs(400, userExists);
      next();
    } catch (error) {
      next(error);
    }
  }

  static async getUserByUsernameAndEmail({ body: { user = '' } }, res, next) {
    try {
      const registeredUser = await getUserWithUsernameAndEmail(user);
      if (registeredUser) {
        res.locals.registeredUser = registeredUser;
        next();
      } else {
        throw new CustomErrs(404, userNotExists);
      }
    } catch (error) {
      next(error);
    }
  }

  static verifyPassword({ body: { password = '' } }, { locals: { registeredUser: { hashedPassword } } }, next) {
    const verifyPassword = compare(hashedPassword, password);
    if (verifyPassword) next();
    else throw new CustomErrs(400, wrongPassword);
  }

  static verifyToken({ headers: { token = '' } }, res, next) {
    const { userId } = verify(token);
    const checkId = checkUUID(userId);
    if (checkId) {
      res.locals.userId = userId;
      next();
    } else {
      throw new CustomErrs(400, notUUID('Id from token'));
    }
  }

  static async authenticateAll(req, res, next) {
    try {
      const { locals: { userId } } = res;
      const authUser = await findUserById(userId);
      if (authUser) {
        res.locals.authUser = authUser;
        next();
      } else {
        throw new CustomErrs(404, wrongToken);
      }
    } catch (error) {
      next(error);
    }
  }
}
