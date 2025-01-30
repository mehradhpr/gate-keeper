import { DatabaseAdapter, Account } from '../src/core/interfaces';

export class MockAdapter implements DatabaseAdapter {
  private users: Account[] = [];

  async createAccount(account: Omit<Account, 'id'>): Promise<Account> {
  }

  async getAccountById(id: string): Promise<Account | null> {
    
  }

  async getAccountByEmail(email: string): Promise<Account | null> {

  }

  async updateAccount(id: string, updates: Partial<Account>): Promise<Account> {

  }

  async deleteAccount(id: string): Promise<void> {

  }

}