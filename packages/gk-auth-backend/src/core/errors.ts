export class AuthError extends Error {
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class InvalidCredentialsError extends AuthError {
    constructor() {
      super('Invalid email or password');
    }
  }
  
  export class AccountAlreadyExistsError extends AuthError {
    constructor(email: string) {
      super(`User with email ${email} already exists`);
    }
  }
  
  export class AccountNotFoundError extends AuthError {
    constructor(id: string) {
      super(`User with ID ${id} not found`);
    }
  }