import { SignOptions } from "jsonwebtoken";

export interface AuthOptions<T extends AuthAccount> {
  adapter: "in-memory" | AuthDatabaseAdapter<T>;
  token: TokenOptions;
  passwordPolicy?: PasswordPolicyOptions;
}

export interface AuthAccount {
  id: string;
  passwordHash: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthDatabaseAdapter<T extends AuthAccount> {
  getAccount(id: string): Promise<T | null>;
  addAccount(account: T): Promise<void>;
  updateAccount(account: T): Promise<void>;
  deleteAccount(id: string): Promise<void>;
}

export interface PasswordPolicyOptions {
  minLength?: number;
  minLowercase?: number;
  minUppercase?: number;
  minNumbers?: number;
  minSymbols?: number;
}

export interface TokenOptions extends SignOptions {
  secret: string;
}
