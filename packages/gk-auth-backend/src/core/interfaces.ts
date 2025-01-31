export interface AuthOptions<T extends AuthAccount> {
    adapter: 'in-memory' | AuthDatabaseAdapter<T>;
    passwordPolicy?: PasswordPolicyOptions;
    token?: TokenOptions;
    session?: SessionOptions;
}
export interface AuthAccount {
    id: string; 
    passwordHash: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    roles?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface AuthDatabaseAdapter<T extends AuthAccount> {
    getAccount(id: string): Promise<T | null>;
    registerAccount(account: T): Promise<void>;
    updateAccount(account: T): Promise<void>;
    deleteAccount(id: string): Promise<void>;
    authenticate(id: string, password: string): Promise<string | null>;
}
export interface PasswordPolicyOptions {
    minLength?: number;
    minLowercase?: number;
    minUppercase?: number;
    minNumbers?: number;
    minSymbols?: number;
}
export interface TokenOptions {
    secret: string;
    expiresIn?: string | number;
}

export interface SessionOptions {
    strategy?: 'jwt' | 'database';
    cookieName?: string;
    cookiePath?: string;
    cookieSecure?: boolean;
}

