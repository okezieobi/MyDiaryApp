import UserValidator from '../data/users';
import UserAuth from '../auth/users';
import middlewareHelper from './middleware';
import UserController from '../controllers/users';

export default class UserMiddleware {
  constructor() {
    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
  }

  static signup() {
    const { verifySignup, validatePassword } = UserValidator;
    const { authSignup } = UserAuth;
    const { addUser } = UserController;
    return middlewareHelper.routeCallbacks(verifySignup, validatePassword, authSignup, addUser);
  }

  static signin() {
    const { verifySignin, validatePassword } = UserValidator;
    const { authSignin, verifyPassword } = UserAuth;
    return middlewareHelper.routeCallbacks(verifySignin, validatePassword,
      authSignin, verifyPassword);
  }
}
