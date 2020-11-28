export default class IllegalArgumentException extends Error {
  constructor(msg, arg) {
    super(`IllegalArgumentException - ${msg}
    arg: ${JSON.stringify(arg)}`);
  }
}
