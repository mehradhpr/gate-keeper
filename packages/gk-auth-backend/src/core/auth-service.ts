import { sign, verify, Algorithm, SignOptions } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import {
    AuthDatabaseAdapter,
    AuthAccount,
    AuthOptions,
    TokenOptions,
    PasswordPolicyOptions
} from './interfaces.js';
import { InMemoryAdapter } from './in-memory-adapter.js';
import {
    InvalidCredentialsError,
    AccountAlreadyExistsError,
    AccountNotFoundError,
    PasswordPolicyError
} from './errors.js';

const DEFAULT_JWT_OPTIONS: TokenOptions = {
    secret: '', // Placeholder, will be overridden by user input
    expiresIn: '1h',
    algorithm: 'HS256'
};

export class AuthService<T extends AuthAccount> {
    private adapter: AuthDatabaseAdapter<T>;
    private jwtSecret: string;
    private jwtOptions: SignOptions;
    private passwordPolicy?: PasswordPolicyOptions;

    constructor(options: AuthOptions<T>) {
        // Initialize adapter
        this.adapter = options.adapter === 'in-memory'
            ? new InMemoryAdapter<T>()
            : options.adapter;

        // Validate and configure token options
        if (!options.token?.secret) {
            throw new Error('JWT secret is required');
        }
        const { secret, ...jwtOptions } = options.token;
        this.jwtSecret = secret;
        this.jwtOptions = { ...DEFAULT_JWT_OPTIONS, ...jwtOptions };

        // Configure password policy
        this.passwordPolicy = options.passwordPolicy;
    }

    async register(registrationData: Omit<T, "passwordHash"> & { password: string }): Promise<void> {
      // Destructure password from registration data
      const { password, ...accountData } = registrationData;
  
      // Check existing account
      const existingAccount = await this.adapter.getAccount(accountData.id);
      if (existingAccount) {
          throw new AccountAlreadyExistsError(accountData.id);
      }
  
      // Validate password policy
      this.validatePassword(password);
  
      // Create account object with proper typing
      const account: T = {
          ...accountData,
          passwordHash: await this.hashPassword(password),
          createdAt: new Date(),
          updatedAt: new Date(),
      } as unknown as T;
  
      await this.adapter.addAccount(account);
  }

    async authenticate(id: string, password: string): Promise<string> {
        const account = await this.adapter.getAccount(id);
        if (!account) {
            throw new AccountNotFoundError(id);
        }

        const isValid = await compare(password, account.passwordHash);
        if (!isValid) {
            throw new InvalidCredentialsError();
        }

        return this.generateToken(account.id);
    }

    async resetPassword(userId: string, newPassword: string): Promise<void> {
        this.validatePassword(newPassword);
        
        const user = await this.adapter.getAccount(userId);
        if (!user) throw new AccountNotFoundError(userId);

        const updatedAccount: T = {
            ...user,
            passwordHash: await this.hashPassword(newPassword),
            updatedAt: new Date()
        };

        await this.adapter.updateAccount(updatedAccount);
    }

    private validatePassword(password: string): void {
        const policy = this.passwordPolicy;
        if (!policy) return;

        // Length check
        if (policy.minLength && password.length < policy.minLength) {
            throw new PasswordPolicyError(
                `Password must be at least ${policy.minLength} characters`
            );
        }

        // Character type checks
        const counts = {
            lower: (password.match(/[a-z]/g) || []).length,
            upper: (password.match(/[A-Z]/g) || []).length,
            number: (password.match(/[0-9]/g) || []).length,
            symbol: (password.match(/[^a-zA-Z0-9]/g) || []).length
        };

        if (policy.minLowercase && counts.lower < policy.minLowercase) {
            throw new PasswordPolicyError(
                `Password must contain at least ${policy.minLowercase} lowercase letters`
            );
        }

        if (policy.minUppercase && counts.upper < policy.minUppercase) {
            throw new PasswordPolicyError(
                `Password must contain at least ${policy.minUppercase} uppercase letters`
            );
        }

        if (policy.minNumbers && counts.number < policy.minNumbers) {
            throw new PasswordPolicyError(
                `Password must contain at least ${policy.minNumbers} numbers`
            );
        }

        if (policy.minSymbols && counts.symbol < policy.minSymbols) {
            throw new PasswordPolicyError(
                `Password must contain at least ${policy.minSymbols} symbols`
            );
        }
    }

    private async hashPassword(password: string): Promise<string> {
        return hash(password, 10);
    }

    private generateToken(accountId: string): string {
        return sign(
            { sub: accountId },
            this.jwtSecret,
            this.jwtOptions
        );
    }

    verifyToken(token: string): string {
        const payload = verify(token, this.jwtSecret, {
            algorithms: [this.jwtOptions.algorithm as Algorithm]
        });
        return payload.sub as string;
    }
}