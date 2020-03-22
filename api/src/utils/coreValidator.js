import validator from 'validator';

const {
  isEmail, isLength, isJWT, isUUID,
} = validator;

export default class RequestValidator {
  static checkForString(data) {
    RequestValidator.checkStringResult = typeof data === 'string' ? data : String(data);
    return RequestValidator.checkStringResult;
  }

  static validateEmail(email = '') {
    return isEmail(RequestValidator.checkForString(email))
    && RequestValidator.checkCharLength(RequestValidator.checkForString(email), 128);
  }

  static validatePassword(password = '') {
    return isLength(RequestValidator.checkForString(password), { min: 8, max: 128 });
  }

  static checkCharLength(char = '', length = 0) {
    return isLength(RequestValidator.checkForString(char), { max: length });
  }

  static checkVarChar(varChar = '') {
    return RequestValidator.checkCharLength(varChar, 128);
  }

  static checkJWT(jwt = '') {
    return isJWT(RequestValidator.checkForString(jwt));
  }

  static checkUUID(id = '') {
    return isUUID(RequestValidator.checkForString(id));
  }
}
