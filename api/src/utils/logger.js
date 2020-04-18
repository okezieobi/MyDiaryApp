import winston from 'winston';

export default {
  infoLog: winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console(),
    ],
  }),
  errorLog: winston.createLogger({
    level: 'error',
    transports: [
      new winston.transports.Console(),
    ],
  }),
};
