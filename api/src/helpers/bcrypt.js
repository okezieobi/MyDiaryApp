import bcrypt from 'bcryptjs';

export default class Password {
  static hash(password = '') {
    try {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
    } catch (error) {
      throw new Error(error);
    }
  }

  /*
  static compare(hashedPassword = '', password = '') {
    try {
      return bcrypt.compareSync(password, hashedPassword);
    } catch (error) {
      throw new Error(error);
    }
  }
  */
}
