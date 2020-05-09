const { error } = console;

export default class CustomErrs extends Error {
  constructor(statusCode, clientErr, ...params) {
    super(params);
    this.statusCode = statusCode;
    this.clientErr = clientErr;
  }

  static handleErrors(err, req, res, next) {
    let arrayErrs;
    let messages;
    if (err.name === 'SequelizeValidationError') {
      arrayErrs = err.message.split(',');
      messages = arrayErrs.map((string) => string.substring(string.lastIndexOf(':') + 2));
      res.sendExtended(400, 'application/json', { error: messages || err.message });
    } else if (err.name === 'SequelizeDatabaseError') {
      res.sendExtended(400, 'application/json', { error: err.message });
    } else if (err.statusCode) {
      res.sendExtended(err.statusCode, 'application/json', { error: err.clientErr });
    } else if (err.details) {
      messages = err.message.split('. ');
      res.sendExtended(400, 'application/json', { error: messages });
    } else {
      next(err);
    }
  }


  static handleServerErrors({ message, trace }, req, res) {
    error(message, trace);
    res.sendStatus(500);
  }
}
