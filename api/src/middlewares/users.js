import UserValidator from '../data/users';
import UserAuth from '../auth/users';
import middlewareHelper from './middleware';

export default class UserMiddleware {
  constructor() {
    this.signup = this.signup.bind(this);
  }

  static signup() {
    const { verifySignup, validatePassword } = UserValidator;
    const { authSignup } = UserAuth;
    return middlewareHelper.routeCallbacks(verifySignup, validatePassword, authSignup);
  }
}
