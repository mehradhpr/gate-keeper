import { sign, verify, Algorithm, SignOptions } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { validatePassword } from "./utils/validate-password.js";
import {
  AuthDatabaseAdapter,
  AuthAccount,
  AuthOptions,
  TokenOptions,
  PasswordPolicyOptions,
} from "./interfaces.js";
import { InMemoryAdapter } from "./in-memory-adapter.js";
import {
  InvalidCredentialsError,
  AccountAlreadyExistsError,
  AccountNotFoundError,
  PasswordPolicyError,
} from "./errors.js";

const DEFAULT_JWT_OPTIONS: TokenOptions = {
  secret: "",
  expiresIn: "1h",
  algorithm: "HS256",
};

export class AuthService<T extends AuthAccount> {
  private adapter: AuthDatabaseAdapter<T>;
  private jwtSecret: string;
  private jwtOptions: SignOptions;
  private passwordPolicy?: PasswordPolicyOptions;

  constructor(options: AuthOptions<T>) {
    // Initialize adapter
    this.adapter =
      options.adapter === "in-memory"
        ? new InMemoryAdapter<T>()
        : options.adapter;

    // Validate and configure token options
    if (!options.token?.secret) {
      throw new Error("JWT secret is required");
    }
    const { secret, ...jwtOptions } = options.token;
    this.jwtSecret = secret;
    this.jwtOptions = { ...DEFAULT_JWT_OPTIONS, ...jwtOptions };

    // Configure password policy
    this.passwordPolicy = options.passwordPolicy;
  }

  async register(
    registrationData: Omit<T, "passwordHash"> & { password: string }
  ): Promise<void> {
    // Destructure password from registration data
    const { password, ...accountData } = registrationData;

    // Check existing account
    const existingAccount = await this.adapter.getAccount(accountData.id);
    if (existingAccount) {
      throw new AccountAlreadyExistsError(accountData.id);
    }

    // Validate password policy
    validatePassword(password, this.passwordPolicy);

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

  async resetPassword(id: string, newPassword: string): Promise<void> {
    validatePassword(newPassword, this.passwordPolicy);

    const user = await this.adapter.getAccount(id);
    if (!user) throw new AccountNotFoundError(id);

    const updatedAccount: T = {
      ...user,
      passwordHash: await this.hashPassword(newPassword),
      updatedAt: new Date(),
    };

    await this.adapter.updateAccount(updatedAccount);
  }

  verifyToken(token: string): string {
    const payload = verify(token, this.jwtSecret, {
      algorithms: [this.jwtOptions.algorithm as Algorithm],
    });
    return payload.sub as string;
  }

  private async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  private generateToken(accountId: string): string {
    return sign({ sub: accountId }, this.jwtSecret, this.jwtOptions);
  }
}
