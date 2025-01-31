import { AuthDatabaseAdapter } from "./interfaces.js";
import { AuthAccount } from "./interfaces.js";

export class InMemoryAdapter<T extends AuthAccount>
  implements AuthDatabaseAdapter<T>
{
  private accounts: Map<string, T> = new Map();

  async getAccount(id: string): Promise<T | null> {
    return this.accounts.get(id) || null;
  }

  async addAccount(account: T): Promise<void> {
    if (this.accounts.has(account.id)) {
      throw new Error("Account already exists");
    }
    this.accounts.set(account.id, account);
  }

  async updateAccount(account: T): Promise<void> {
    if (!this.accounts.has(account.id)) {
      throw new Error("Account not found");
    }
    this.accounts.set(account.id, account);
  }

  async deleteAccount(id: string): Promise<void> {
    if (!this.accounts.has(id)) {
      throw new Error("Account not found");
    }
    this.accounts.delete(id);
  }
}
