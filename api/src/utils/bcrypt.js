import bcrypt from 'bcryptjs';

export default class Bcrypt {
  static async hash(password = '') {
    const salt = await bcrypt.genSalt(14);
    const encrypted = await bcrypt.hash(password, salt);
    return encrypted;
  }

  static async compare(hashedPassword = '', password = '') {
    const decrypted = await bcrypt.compare(password, hashedPassword);
    return decrypted;
  }
}
