export default class Errors {
  static isRequired(title) {
    return `${title} is required`;
  }

  static isStringType(title) {
    return `${title} must be string type`;
  }

  static notLetters(title) {
    return `${title} may include letters, spaces and must be less than 128 characters`;
  }

  static notLettersAndNumbers(title) {
    return `${title} may include letters, numbers, spaces, dashes and less than 128 characters`;
  }

  static notNumbers(title) {
    return `${title} must be a positive number`;
  }

  static notInteger(title) {
    return `${title} must be a positive integer`;
  }

  static restrictedAccess(title) {
    return `Only ${title} can access this resource`;
  }

  static dataNotFound(title) {
    return `${title} not found`;
  }


  static dataFound(title) {
    return `${title} already exists`;
  }
}
