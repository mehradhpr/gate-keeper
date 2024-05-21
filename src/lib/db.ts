import { PrismaClient, Account } from '@prisma/client';

const prisma = new PrismaClient();

interface AccountResult {
    success: boolean;
    message: string;
    result?: Account;
}

interface AuthResult {
    success: boolean;
    accountInfo: Account | null;
}

export async function createAccount(firstName: string, lastName: string, email: string, password: string): Promise<AccountResult> {
    try {
        // Verifying if the account already exists
        const existingAccount = await prisma.account.findUnique({
            where: { email },
        });

        if (existingAccount) {
            return { success: false, message: 'Account already exists' };
        }

        // Creating the account
        const result = await prisma.account.create({
            data: {
                firstName,
                lastName,
                email,
                password, // Storing password as plain text (not recommended for production)
            },
        });

        return { success: true, message: 'Account created successfully', result };
    } catch (error) {
        console.error('Error creating account:', error);
        return { success: false, message: 'Failed to create account' };
    }
}

export async function authenticate(email: string, password: string): Promise<AuthResult> {
    try {
        // Finding the account by email and password
        const account = await prisma.account.findFirst({
            where: {
                email,
                password,
            },
        });

        if (!account) {
            return {
                success: false,
                accountInfo: null,
            };
        }

        return {
            success: true,
            accountInfo: account,
        };
    } catch (error) {
        console.error('Error authenticating account:', error);
        return {
            success: false,
            accountInfo: null,
        };
    }
}

export async function logout() {
    // Implement your logout functionality here
}

export async function deleteAccount() {

}


export async function getAccountList_admin() {

}

export async function modifyFirstName_admin() {

}

export async function modifyLastName_admin() {

}

export async function modifyEmail_admin() {

}

export async function modifyPassword_admin() {

}

export async function deleteAccount_admin() {

}

export async function createRole_admin() {

}

