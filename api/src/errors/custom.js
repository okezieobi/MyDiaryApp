import HttpResponse from '../utils/response';
import Logger from '../utils/logger';

const { errorLog } = new Logger();
const { response } = HttpResponse;

export default class CustomErrs extends Error {
  constructor(statusCode, clientErr) {
    super();
    this.statusCode = statusCode;
    this.clientErr = clientErr;
    this.userNotExists = 'User does not exist, user should please sign up';
    this.userExists = 'User exists, user should please sign in with email or username';
    this.notEmail = 'Email format is wrong OR is more than 128 characters';
    this.notPassword = 'Password must be eight characters minimum, 128 characters maximum';
    this.tokenIsRequired = 'Token is required, please sign in or sign up';
    this.notJWT = 'Token provided does not match JWT format';
    this.wrongToken = 'Token provided does not match any user';
    this.invalidToken = 'Id from token is not a positive integer';
    this.wrongPassword = 'Password does not match user';
  }

  static handleClientErr(err, req, res, next) {
    const errorRes = err.statusCode ? response(res, err.statusCode, 'error', err.clientErr) : next(err);
    return errorRes;
  }

  static handleServerErr(err, req, res) {
    response(res, 500, 'error', err.message);
    return errorLog.error(err.message);
  }

  static throwErr(err) {
    throw err;
  }

  static isRequired(title) {
    return `${title} is required`;
  }

  static notUUID(title) {
    return `${title} does not match UUID format`;
  }

  static wrongCharLength(title, length) {
    return `${title} must be less than ${length} characters`;
  }

  static notVarChar(title) {
    return CustomErrs.wrongCharLength(title, 128);
  }

  /*
  static notNumbers(title) {
    return `${title} must be a positive number`;
  }

  static notInteger(title) {
    return `${title} must be a positive integer`;
  }

  static restrictedAccess(title) {
    return `Only ${title} can access this resource`;
  }
  */

  static dataNotFound(title) {
    return `${title} not found`;
  }


  static dataFound(title) {
    return `${title} already exists`;
  }

  static isStringType(title) {
    return `${title} must be string data type`;
  }
}
