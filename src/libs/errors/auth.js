import httpStatus from 'http-status';

import BaseError from './base';

export class AuthError extends BaseError {
  constructor({ message, errors, status, name, stack }) {
    super({ message, errors, status, name, stack });

    this.status = httpStatus.UNAUTHORIZED;
    this.message = message || 'Invalid Authentication';
  }
}
