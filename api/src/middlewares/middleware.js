export default class Middleware {
  constructor() {
    this.routeCallbacks = this.routeCallbacks.bind(this);
  }

  static routeCallbacks(...methods) {
    return methods.map((method) => (...args) => { method(...args); });
  }
}
