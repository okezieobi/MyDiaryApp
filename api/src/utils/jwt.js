import jwt from 'jsonwebtoken';
import Env from '../configs/env';

const { sign, verify } = jwt;
const { jwtSecret } = new Env();

export default class Token {
  static generate(id = 0) {
    return sign({
      userId: id,
    }, jwtSecret, {
      expiresIn: 24 * 60 * 60,
    });
  }

  static verify(token = '') {
    return verify(token, jwtSecret);
  }
}
