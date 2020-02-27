import Validator from '../utils/coreValidator';
import CustomErrs from '../errors/custom';

const {
  isRequired, isStringType,
  notUUID, notVarChar, throwErr,
} = CustomErrs;
const { notEmail, notPassword, notJWT } = new CustomErrs();

const {
  validateEmail, validatePassword, checkJWT, checkUUID, checkVarChar,
} = Validator;

export default class CheckRequests {
  static getFalseValue(request, requestTitle) {
    if (!request) throw new CustomErrs(400, isRequired(requestTitle));
  }

  static validateRequestStringType(request, requestTitle) {
    if (typeof request !== 'string') throw new CustomErrs(400, isStringType(requestTitle));
  }

  static validateWithTests(request, test, errMessage, requestTitle) {
    let err;
    if (!test(request)) {
      err = requestTitle ? errMessage(requestTitle) : errMessage;
    }
    if (err) throw new CustomErrs(400, err);
  }

  static validateEmail(email) {
    return CheckRequests.validateWithTests(email, validateEmail, notEmail);
  }

  static validatePassword(password) {
    return CheckRequests.validateWithTests(password, validatePassword, notPassword);
  }

  static validateJWT(jwt) {
    return CheckRequests.validateWithTests(jwt, checkJWT, notJWT);
  }

  static validateUUID(id, UUIDTitle) {
    return CheckRequests.validateWithTests(id, checkUUID, notUUID, UUIDTitle);
  }

  static validateVarChar(chars, charTitle) {
    return CheckRequests.validateWithTests(chars, checkVarChar, notVarChar, charTitle);
  }

  static validateRequest(prop, propTitle, patternTest, dataTypeTest) {
    try {
      CheckRequests.getFalseValue(prop, propTitle);
      dataTypeTest(prop, propTitle);
      patternTest(prop, propTitle);
    } catch (error) {
      throwErr(error);
    }
  }

  static checkStringTypeRequest(prop, propTitle, patternTest) {
    return CheckRequests.validateRequest(prop, propTitle,
      patternTest, CheckRequests.validateRequestStringType);
  }
}
