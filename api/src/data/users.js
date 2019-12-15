import protocol from '../helpers/response';
import checkRequest from '../helpers/validate';

export default class UserValidator {
  static async signUp({ body }, res, next) {
    const {
      fullName, email, password, username,
    } = body;
    const fullNameErr = checkRequest.validateLetters(fullName, 'Full name');
    const emailErr = checkRequest.checkEmailFormat(email, 'Email');
    const passwordErr = checkRequest.checkPassword(password, 'Password');
    const usernameErr = checkRequest.validateUsername(username, 'Username');
    const findError = checkRequest.findError(fullNameErr, emailErr, passwordErr, usernameErr);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }
}
