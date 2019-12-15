import UserValidator from '../data/users';
import UserAuth from '../auth/users';
import middleware from './middleware';

export default class UserMiddleware {
  static middleware(method) {
    const validateAll = UserValidator[method].bind(UserValidator);
    const authAll = UserAuth[method].bind(UserAuth);
    return { validateAll, authAll };
  }

  static signup() {
    const { validateAll, authAll } = UserMiddleware.middleware('signUp');
    return middleware.routeCallbacks(validateAll, authAll);
  }
}
