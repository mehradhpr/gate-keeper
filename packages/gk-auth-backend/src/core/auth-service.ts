import { Account, DatabaseAdapter } from "./interfaces.js";


export class AuthService {
    constructor (
        private readonly adapter: DatabaseAdapter,
        private readonly jwtSecret: string;
    ) {}

    async register(email: string, password: string): Promise<Account> {

    }

    async authenticate(email: string, password: string): Promise<string> {

    }

    async resetPassword(accountID: string, newPassword: string): Promise<void> {

    }

    private async hashPassword(password: string): Promise<string> {

    }

    private generateToken(accountID: string): string {

    }

    private verifyToken(token: string): string {
        
    }
}