
export default class Patterns {
  static validateEmail(email = '') {
    const emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (email) return emailPattern.test(email) && email.length < 128;
    return emailPattern.test(email);
  }

  static validatePassword(password = '') {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password) return passwordPattern.test(password) && password.length < 128;
    return passwordPattern.test(password);
  }

  static checkName(name = '') {
    const namePattern = /^[A-Za-z\s]+$/;
    if (name) return namePattern.test(name) && name.length < 128;
    return namePattern.test(name);
  }

  static checkNumber(number = '') {
    const amountPattern = /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/;
    return amountPattern.test(number);
  }

  static checkInteger(integer = '') {
    const integerPattern = /^(0|[1-9]\d*)$/;
    return integerPattern.test(integer);
  }

  static checkUserName(username = '') {
    const usernamePattern = /^[a-zA-Z0-9\s_-]+$/;
    if (username) return usernamePattern.test(username) && username.length < 128;
    return usernamePattern.test(username);
  }

  static checkDateInput(date = '') {
    const datePattern = /([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/;
    return datePattern.test(date);
  }
}
