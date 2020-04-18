import jwt from 'jsonwebtoken';
import env from '../configs/env';

const { jwtSecret } = env;

export default class Token {
  static generate(user) {
    return jwt.sign({
      userId: user.id,
    }, jwtSecret, {
      expiresIn: 24 * 60 * 60,
    });
  }

  static verify(headers, next) {
    return jwt.verify(headers.token, jwtSecret,
      (err, { userId }) => next(err) || Object.defineProperty(headers, 'userId', { value: userId }));
  }
}
