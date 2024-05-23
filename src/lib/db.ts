import { PrismaClient, Account } from "@prisma/client";
import {
  DBAddAccountRequest,
  DBAddAccountResponse,
  DBGetAccountByEmailRequest,
  DBGetAccountByEmailResponse,
  DBGetAllAccountsRequest,
  DBGetAllAccountsResponse,
  DBDeleteAccountByEmailRequest,
  DBDeleteAccountByEmailResponse,
} from "@/interfaces/db-interface";
import { ServerAccountInfo } from "@/interfaces/account-interface";

const prisma = new PrismaClient();

/**
 * Database module
 */
export module database {
  /**
   * Adds an account to the database
   * @param request - The account information to be added (firstName, lastName, email, password, role)
   * @returns DBAddAccountResponse - The response of the operation (success, message)
   */
  export async function addAccount(
    request: DBAddAccountRequest,
  ): Promise<DBAddAccountResponse> {
    const { firstName, lastName, email, password, role } = request;

    try {
      // Verifying if the account already exists
      const existingAccount = await prisma.account.findUnique({
        where: { email },
      });

      if (existingAccount) {
        return { success: false, message: "Account already exists" };
      }

      // Creating the account
      await prisma.account.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          role,
        },
      });
      return { success: true, message: "Account created successfully" };
    } catch (error) {
      return { success: false, message: "Failed to create account" };
    }
  }

  /**
   * Retrieves an account by its email
   * @param request - The email of the account to be retrieved
   * @returns DBGetAccountByEmailResponse - The response of the operation (success, message, account)
   */
  export async function getAccountByEmail(
    request: DBGetAccountByEmailRequest,
  ): Promise<DBGetAccountByEmailResponse> {
    const { email } = request;

    try {
      // Finding the account by email
      const account = await prisma.account.findUnique({
        where: { email },
      });

      if (!account) {
        return {
          success: false,
          message: "Account not found",
        };
      }

      return {
        success: true,
        message: "Account retrieved successfully",
        account: account as ServerAccountInfo,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong while retrieving the account",
      };
    }
  }

  /**
   * Retrieves all the accounts from the database
   * @param _request - The request object
   * @returns DBGetAllAccountsResponse - The response of the operation (success, accounts)
   */
  export async function getAllAccounts(
    _request: DBGetAllAccountsRequest,
  ): Promise<DBGetAllAccountsResponse> {
    try {
      const accounts = await prisma.account.findMany();

      return { success: true, accounts: accounts as ServerAccountInfo[] };
    } catch (error) {
      return { success: false, accounts: [] };
    }
  }

  /**
   * Deletes an account by its email
   * @param request - The email of the account to be deleted
   * @returns DBDeleteAccountByEmailResponse - The response of the operation (success, message)
   */
  export async function deleteAccountByEmail(
    request: DBDeleteAccountByEmailRequest,
  ): Promise<DBDeleteAccountByEmailResponse> {
    const { email } = request;

    try {
      const account = await prisma.account.findUnique({
        where: { email },
      });

      if (!account) {
        return { success: false, message: "Account not found" };
      }

      await prisma.account.delete({
        where: { email },
      });

      return { success: true, message: "Account deleted successfully" };
    } catch (error) {
      return { success: false, message: "Failed to delete account" };
    }
  }
}
