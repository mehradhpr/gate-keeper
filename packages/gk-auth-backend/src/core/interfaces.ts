export interface Account {
    id: string;
    email: string;
    passwordHash: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DatabaseAdapter {
    createUser(user: Omit<Account, 'id'>): Promise<Account>;
    getUserById(id: string): Promise<Account | null>;
    getUserByEmail(email: string): Promise<Account | null>;
    updateUser(id: string, updates: Partial<Account>): Promise<Account>;
    deleteUser(id: string): Promise<void>;
}

