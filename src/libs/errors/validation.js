import httpStatus from 'http-status';

import BaseError from './base';

export class ValidationError extends BaseError {
  constructor({ message, errors, status, name, stack, body, user }) {
    super({ name, message, errors, status, stack });

    this.details = errors;
    this.stack = { payload: body, user };
    this.status = httpStatus.BAD_REQUEST;
  }
}
