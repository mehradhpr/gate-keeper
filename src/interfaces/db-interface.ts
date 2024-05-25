import { ServerAccountInfo } from "@/interfaces/account-interface";


// ------------------------------------- Account Operations -------------------------------------

// ------------- Add an Account -------------

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

// ------------- Get an Account by Email -------------

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

// ------------- Get All Accounts -------------

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

// ------------- Delete an Account by Email -------------

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

// ------------- Update an Account -------------

/**
 * DBUpdateAccountFirstNameByEmailRequest - The request to update an account's first name by its email
 * @param email - The email of the account
 * @param firstName - The new first name of the account
 */
export interface DBUpdateAccountFirstNameByEmailRequest {
  email: string;
  firstName: string;
}

/**
 * DBUpdateAccountFirstNameByEmailResponse - The response of updating an account's first name by its email
 * @param success - The success status of the operation
 * @param message - The message of the operation
 */
export interface DBUpdateAccountFirstNameByEmailResponse {
  success: boolean;
  message: string;
}

/**
 * DBUpdateAccountLastNameByEmailRequest - The request to update an account's last name by its email
 * @param email - The email of the account
 * @param lastName - The new last name of the account
 */
export interface DBUpdateAccountLastNameByEmailRequest {
  email: string;
  lastName: string;
}

/**
 * DBUpdateAccountLastNameByEmailResponse - The response of updating an account's last name by its email
 * @param success - The success status of the operation
 * @param message - The message of the operation
 */
export interface DBUpdateAccountLastNameByEmailResponse {
  success: boolean;
  message: string;
}

/**
 * DBUpdateAccountRoleByEmailRequest - The request to update an account's role by its email
 * @param email - The email of the account
 * @param role - The new role of the account
 */
export interface DBUpdateAccountRoleByEmailRequest {
  email: string;
  role: string;
}

/**
 * DBUpdateAccountRoleByEmailResponse - The response of updating an account's role by its email
 * @param success - The success status of the operation
 * @param message - The message of the operation
 */
export interface DBUpdateAccountRoleByEmailResponse {
  success: boolean;
  message: string;
}

// ------------------------------------- Permissions Operations -------------------------------------

// ------------- create a new Permission -------------

/**
 * DBAddPermissionRequest - The request to create a permission to the database
 * @param name - The name of the permission
 */
export interface DBCreatePermissionRequest {
  name: string;
}

/**
 * DBCreatePermissionResponse - The response of creating a permission to the database
 * @param success - The success status of the operation
 * @param message - The message of the operation
 */
export interface DBCreatePermissionResponse {
  success: boolean;
  message: string;
}

// ------------- Delete a Permission by Name -------------

/**
 * DBDeletePermissionRequest - The request to delete a permission by its name
 * @param name - The name of the permission
 */
export interface DBDeletePermissionRequest {
  name: string;
}

/**
 * DBDeletePermissionResponse - The response of deleting a permission by its name
 * @param success - The success status of the operation
 * @param message - The message of the operation
 */
export interface DBDeletePermissionResponse {
  success: boolean;
  message: string;
}

// ------------- Assign Permission to role -------------

/**
 * DBAssignPermissionToRoleRequest - The request to assign a permission to a role
 * @param permission - The name of the permission
 * @param role - The name of the role
 */
export interface DBAssignPermissionToRoleRequest {
  permission: string;
  role: string;
}

/**
 * DBAssignPermissionToRoleResponse - The response of assigning a permission to a role
 * @param success - The success status of the operation
 * @param message - The message of the operation
 */
export interface DBAssignPermissionToRoleResponse {
  success: boolean;
  message: string;
}

// ------------- Remove Permission from role -------------

/**
 * DBRemovePermissionFromRoleRequest - The request to remove a permission from a role
 * @param permission - The name of the permission
 * @param role - The name of the role
 */
export interface DBRemovePermissionFromRoleRequest {
  permission: string;
  role: string;
}

/**
 * DBRemovePermissionFromRoleResponse - The response of removing a permission from a role
 * @param success - The success status of the operation
 * @param message - The message of the operation
 */
export interface DBRemovePermissionFromRoleResponse {
  success: boolean;
  message: string;
}

// ------------- Get all Permissions -------------

/**
 * DBGetAllPermissionsRequest - The request to get all permissions from the database
 * @param none
 */
export interface DBGetAllPermissionsRequest {}

/**
 * DBGetAllPermissionsResponse - The response of getting all permissions from the database
 * @param success - The success status of the operation
 * @param message - The message of the operation
 * @param permissions - The permissions information
 */
export interface DBGetAllPermissionsResponse {
  success: boolean;
  message: string;
  permissions: string[];
}

// ------------------------------------- Roles Operations -------------------------------------

// ------------- create a new Role -------------

/**
 * DBCreateRoleRequest - The request to create a role to the database
 * @param name - The name of the role
 */
export interface DBCreateRoleRequest {
  name: string;
}

/**
 * DBCreateRoleResponse - The response of creating a role to the database
 * @param success - The success status of the operation
 * @param message - The message of the operation
 */
export interface DBCreateRoleResponse {
  success: boolean;
  message: string;
}

// ------------- Delete a Role by Name -------------

/**
 * DBDeleteRoleRequest - The request to delete a role by its name
 * @param name - The name of the role
 */
export interface DBDeleteRoleRequest {
  name: string;
}

/**
 * DBDeleteRoleResponse - The response of deleting a role by its name
 * @param success - The success status of the operation
 * @param message - The message of the operation
 */
export interface DBDeleteRoleResponse {
  success: boolean;
  message: string;
}

// ------------- Get all Roles -------------

/**
 * DBGetAllRolesRequest - The request to get all roles from the database
 * @param none
 */
export interface DBGetAllRolesRequest {}

/**
 * DBGetAllRolesResponse - The response of getting all roles from the database
 * @param success - The success status of the operation
 * @param message - The message of the operation
 * @param roles - The roles information
 */
export interface DBGetAllRolesResponse {
  success: boolean;
  message: string;
  roles: string[];
}

