import winston from 'winston';

export default class Logger {
  constructor() {
    this.infoLog = winston.createLogger({
      level: 'info',
      transports: [
        new winston.transports.Console(),
      ],
    });
    this.errorLog = winston.createLogger({
      level: 'error',
      transports: [
        new winston.transports.Console(),
      ],
    });
  }
}
