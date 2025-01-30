export interface Account {
    id: string;
    email: string;
    passwordHash: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DatabaseAdapter {
    createAccount(account: Omit<Account, 'id'>): Promise<Account>;
    getAccountById(id: string): Promise<Account | null>;
    getAccountByEmail(email: string): Promise<Account | null>;
    updateAccount(id: string, updates: Partial<Account>): Promise<Account>;
    deleteAccount(id: string): Promise<void>;
}

