import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export default class Token {
  static generate(id = 0) {
    try {
      return jwt.sign({
        userId: id,
      }, process.env.SECRET, {
        expiresIn: 24 * 60 * 60,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static verify(token = '') {
    try {
      return jwt.verify(token, process.env.SECRET, (err, decoded) => decoded || err);
    } catch (error) {
      throw new Error(error);
    }
  }
}
