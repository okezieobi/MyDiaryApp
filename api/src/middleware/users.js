import UserValidator from '../guard/users';
import UserAuth from '../auth/users';
import MiddlewareHelper from './middleware';

const { validatePassword, validateNewUser, validateRegisteredUser } = UserValidator;
const { verifyWithUnique, findByUnique, verifyPassword } = UserAuth;
const { routeCallbacks } = MiddlewareHelper;

export default class UserMiddleware {
  static signup() {
    return routeCallbacks(validateNewUser, validatePassword, verifyWithUnique);
  }

  static signin() {
    return routeCallbacks(validateRegisteredUser, validatePassword,
      findByUnique, verifyPassword);
  }
}
