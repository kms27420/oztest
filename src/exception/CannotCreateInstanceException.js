export default class CannotCreateInstanceException extends Error {
  constructor(msg) {
    super(`CannotCreateInstanceException - ${msg}`);
  }
}
