import { sign, verify } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { AuthDatabaseAdapter, AuthAccount, AuthOptions } from './interfaces.js';

import {
  InvalidCredentialsError,
  AccountAlreadyExistsError,
  AccountNotFoundError
} from './errors.js';

const DEFAULT_JWT_OPTIONS = {
  expiresIn: '1h' as const,
  algorithm: 'HS256' as const
};

export class AuthService {
  private adapter: AuthDatabaseAdapter<AuthAccount>;
  private 

  constructor(options: AuthOptions<AuthAccount>) {

  }

  async register(email: string, password: string): Promise<Account> {
    const existingUser = await this.adapter.getAccountByEmail(email);
    if (existingUser) throw new AccountAlreadyExistsError(email);
    
    const passwordHash = await this.hashPassword(password);
    return this.adapter.createAccount({ email, passwordHash });
  }

  async authenticate(email: string, password: string): Promise<string> {
    const user = await this.adapter.getAccountByEmail(email);
    if (!user) throw new InvalidCredentialsError();

    const isValid = await compare(password, user.passwordHash);
    if (!isValid) throw new InvalidCredentialsError();

    return this.generateToken(user.id);
  }

  async resetPassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.adapter.getAccountById(userId);
    if (!user) throw new AccountNotFoundError(userId);
    
    const passwordHash = await this.hashPassword(newPassword);
    await this.adapter.updateAccount(userId, { passwordHash });
  }

  private async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  private generateToken(accountId: string): string {
    return sign({ sub: accountId }, this.jwtSecret, this.jwtOptions);
  }

  verifyToken(token: string): string {
    const payload = verify(token, this.jwtSecret) as { sub: string };
    return payload.sub;
  }
}