export class InvalidCredentialsError extends Error {
  constructor() {
      super('Invalid credentials');
      this.name = 'InvalidCredentialsError';
  }
}

export class AccountAlreadyExistsError extends Error {
  constructor(id: string) {
      super(`Account with id ${id} already exists`);
      this.name = 'AccountAlreadyExistsError';
  }
}

export class AccountNotFoundError extends Error {
  constructor(id: string) {
      super(`Account with id ${id} not found`);
      this.name = 'AccountNotFoundError';
  }
}

export class PasswordPolicyError extends Error {
  constructor(message: string) {
      super(message);
      this.name = 'PasswordPolicyError';
  }
}