import logLevel from 'loglevel';

export default class Logs {
    constructor() {
        this.displayErrLogs = this.displayErrLogs.bind(this);
    }
    
  static displayErrors(error) {
    return logLevel.error(error);
  }
}
