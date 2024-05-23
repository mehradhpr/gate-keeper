import { ServerAccountInfo } from "@/interfaces/account-interface";

/**
 * DBAddAccountRequest - The request to add an account to the database
 * @param firstName - The first name of the account
 * @param lastName - The last name of the account
 * @param email - The email of the account
 * @param password - The password of the account
 * @param role - The role of the account
 */
export interface DBAddAccountRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

/**
 * DBAddAccountResponse - The response of adding an account to the database
 * @param success - The success status of the operation
 * @param message - The message of the operation
 */
export interface DBAddAccountResponse {
  success: boolean;
  message: string;
}

/**
 * DBGetAccountByEmailRequest - The request to get an account by its email
 * @param email - The email of the account
 */
export interface DBGetAccountByEmailRequest {
  email: string;
}

/**
 * DBGetAccountByEmailResponse - The response of getting an account by its email
 * @param success - The success status of the operation
 * @param message - The message of the operation
 * @param account - The account information
 */
export interface DBGetAccountByEmailResponse {
  success: boolean;
  message: string;
  account?: ServerAccountInfo;
}

/**
 * DBGetAllAccountsRequest - The request to get all accounts from the database
 */
export interface DBGetAllAccountsRequest {}

/**
 * DBGetAllAccountsResponse - The response of getting all accounts from the database
 * @param success - The success status of the operation
 * @param accounts - The accounts information
 */
export interface DBGetAllAccountsResponse {
  success: boolean;
  accounts: ServerAccountInfo[];
}

/**
 * DBDeleteAccountByEmailRequest - The request to delete an account by its email
 * @param email - The email of the account
 */
export interface DBDeleteAccountByEmailRequest {
  email: string;
}

/**
 * DBDeleteAccountByEmailResponse - The response of deleting an account by its email
 * @param success - The success status of the operation
 * @param message - The message of the operation
 */
export interface DBDeleteAccountByEmailResponse {
  success: boolean;
  message: string;
}
