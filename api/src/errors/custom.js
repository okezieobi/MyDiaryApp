const { error } = console;

export default class CustomErrs extends Error {
  constructor(statusCode, clientErr) {
    super();
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
    } else if (err.statusCode) {
      res.sendExtended(err.statusCode, 'application/json', { error: err.clientErr });
    } else {
      error(err);
      res.sendStatus(500);
    }
  }


  static throwErr(err) {
    throw err;
  }
}
