import protocol from '../helpers/response';
import testRequest from '../helpers/tests';

export default class UserValidator {
  constructor() {
    this.verifySignup = this.verifySignup.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  static verifySignup({ body }, res, next) {
    const {
      fullName, email, username,
    } = body;
    const fullNameFalseErr = testRequest.getFalseValue(fullName, 'Full name');
    const emailFalseErr = testRequest.getFalseValue(email, 'Email');
    const usernameFalseErr = testRequest.getFalseValue(username, 'Username');
    const findFalseErr = testRequest.findError(fullNameFalseErr, emailFalseErr, usernameFalseErr);
    if (findFalseErr) return protocol.err400Res(res, findFalseErr);
    const fullNameErrTest = testRequest.validateVarChar(fullName, 'Full name');
    const emailErrTest = testRequest.validateEmail(email);
    const usernameErrTest = testRequest.validateVarChar(username, 'Username');
    const findErrTest = testRequest.findError(fullNameErrTest, emailErrTest, usernameErrTest);
    if (findErrTest) return protocol.err400Res(res, findErrTest);
    return next();
  }

  static validatePassword({ body }, res, next) {
    const { password } = body;
    const passwordFalseErr = testRequest.getFalseValue(password, 'Password');
    if (passwordFalseErr) return protocol.err400Res(res, passwordFalseErr);
    const passwordPatternErr = testRequest.validatePassword(password);
    if (passwordPatternErr) return protocol.err400Res(res, passwordPatternErr);
    return next();
  }
}
