/**
 * @extends Error
 */
export default class BaseError extends Error {
  constructor({ message, errors, status, name, stack }) {
    super(message);
    this.name = name || this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.stack = stack;
  }
}
