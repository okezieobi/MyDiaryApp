import regex from './regex';
import templateErrors from '../errors/templateLiterals';
import literalErrors from '../errors/stringLiterals';

export default class Requests {
  static findError(...errorList) {
    return errorList.find((error) => error);
  }

  static getFalseValue(request, requestTitle) {
    let error;
    if (!request) error = templateErrors.isRequired(requestTitle);
    return error;
  }

  static validateWithTests(request, test, testError, requestTitle = undefined) {
    let error;
    if (!regex[test](request) && !requestTitle) error = literalErrors[testError]();
    else if (!regex[test](request) && requestTitle) error = templateErrors[testError](requestTitle);
    return error;
  }

  static validateEmail(email) {
    return this.validateWithTests(email, 'validateEmail', 'notEmail');
  }

  static validatePassword(password) {
    return this.validateWithTests(password, 'validatePassword', 'notPassword');
  }

  static validateVarChar(chars, charTitle) {
    return this.validateWithTests(chars, 'checkVarChar', 'notVarChar', charTitle);
  }

  static validateNumber(number, numberTitle) {
    return this.validateWithTests(number, 'checkNumber', 'notNumber', numberTitle);
  }

  static validateInteger(integer, integerTitle) {
    return this.validateWithTests(integer, 'checkInteger', 'notInteger', integerTitle);
  }
}
