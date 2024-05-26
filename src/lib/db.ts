import { PrismaClient } from "@prisma/client";
import {
  DBAddAccountRequest,
  DBAddAccountResponse,
  DBGetAccountByEmailRequest,
  DBGetAccountByEmailResponse,
  DBGetAllAccountsRequest,
  DBGetAllAccountsResponse,
  DBDeleteAccountByEmailRequest,
  DBDeleteAccountByEmailResponse,
  DBUpdateAccountFirstNameByEmailRequest,
  DBUpdateAccountFirstNameByEmailResponse,
  DBUpdateAccountLastNameByEmailRequest,
  DBUpdateAccountLastNameByEmailResponse,
  DBUpdateAccountRoleByEmailRequest,
  DBUpdateAccountRoleByEmailResponse,
  DBCreatePermissionRequest,
  DBCreatePermissionResponse,
  DBDeletePermissionRequest,
  DBDeletePermissionResponse,
  DBAssignPermissionToRoleRequest,
  DBAssignPermissionToRoleResponse,
  DBRemovePermissionFromRoleRequest,
  DBRemovePermissionFromRoleResponse,
  DBGetAllPermissionsRequest,
  DBGetAllPermissionsResponse,
  DBCreateRoleRequest,
  DBCreateRoleResponse,
  DBDeleteRoleRequest,
  DBDeleteRoleResponse,
  DBGetAllRolesRequest,
  DBGetAllRolesResponse,
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

  export async function updateAccountFirstNameByEmail(
    request: DBUpdateAccountFirstNameByEmailRequest,
  ): Promise<DBUpdateAccountFirstNameByEmailResponse> {
    const { email, firstName } = request;

    try {
      const account = await prisma.account.findUnique({
        where: { email },
      });

      if (!account) {
        return { success: false, message: "Account not found" };
      }

      await prisma.account.update({
        where: { email },
        data: { firstName },
      });

      return { success: true, message: "First name updated successfully" };
    } catch (error) {
      return { success: false, message: "Failed to update first name" };
    }
  }

  export async function updateAccountLastNameByEmail(
    request: DBUpdateAccountLastNameByEmailRequest,
  ): Promise<DBUpdateAccountLastNameByEmailResponse> {
    const { email, lastName } = request;

    try {
      const account = await prisma.account.findUnique({
        where: { email },
      });

      if (!account) {
        return { success: false, message: "Account not found" };
      }

      await prisma.account.update({
        where: { email },
        data: { lastName },
      });

      return { success: true, message: "Last name updated successfully" };
    } catch (error) {
      return { success: false, message: "Failed to update last name" };
    }
  }

  export async function updateAccountRoleByEmail(
    request: DBUpdateAccountRoleByEmailRequest,
  ): Promise<DBUpdateAccountRoleByEmailResponse> {
    const { email, role } = request;

    try {
      const account = await prisma.account.findUnique({
        where: { email },
      });

      if (!account) {
        return { success: false, message: "Account not found" };
      }

      const roleEntity = await prisma.role.findUnique({
        where: { name: role },
      });

      if (!roleEntity) {
        return { success: false, message: "Role not found" };
      }

      await prisma.account.update({
        where: { email },
        data: { roles: { connect: { id: roleEntity.id } } },
      });

      return { success: true, message: "Role updated successfully" };
    } catch (error) {
      return { success: false, message: "Failed to update role" };
    }
  }

  // Permissions
  export async function createPermission(
    request: DBCreatePermissionRequest,
  ): Promise<DBCreatePermissionResponse> {
    const { name } = request;

    try {
      await prisma.permission.create({
        data: { name },
      });

      return { success: true, message: "Permission created successfully" };
    } catch (error) {
      return { success: false, message: "Failed to create permission" };
    }
  }

  export async function deletePermission(
    request: DBDeletePermissionRequest,
  ): Promise<DBDeletePermissionResponse> {
    const { name } = request;

    try {
      await prisma.permission.delete({
        where: { name },
      });

      return { success: true, message: "Permission deleted successfully" };
    } catch (error) {
      return { success: false, message: "Failed to delete permission" };
    }
  }

  export async function assignPermissionToRole(
    request: DBAssignPermissionToRoleRequest,
  ): Promise<DBAssignPermissionToRoleResponse> {
    const { permission, role } = request;

    try {
      const permissionEntity = await prisma.permission.findUnique({
        where: { name: permission },
      });

      if (!permissionEntity) {
        return { success: false, message: "Permission not found" };
      }

      await prisma.role.update({
        where: { name: role },
        data: { permissions: { connect: { id: permissionEntity.id } } },
      });

      return { success: true, message: "Permission assigned to role successfully" };
    } catch (error) {
      return { success: false, message: "Failed to assign permission to role" };
    }
  }

  export async function removePermissionFromRole(
    request: DBRemovePermissionFromRoleRequest,
  ): Promise<DBRemovePermissionFromRoleResponse> {
    const { permission, role } = request;

    try {
      const permissionEntity = await prisma.permission.findUnique({
        where: { name: permission },
      });

      if (!permissionEntity) {
        return { success: false, message: "Permission not found" };
      }

      await prisma.role.update({
        where: { name: role },
        data: { permissions: { disconnect: { id: permissionEntity.id } } },
      });

      return { success: true, message: "Permission removed from role successfully" };
    } catch (error) {
      return { success: false, message: "Failed to remove permission from role" };
    }
  }

  export async function getAllPermissions(
    _request: DBGetAllPermissionsRequest,
  ): Promise<DBGetAllPermissionsResponse> {
    try {
      const permissions = await prisma.permission.findMany();

      return { success: true, message: "Permissions retrieved successfully", permissions: permissions.map(p => p.name) };
    } catch (error) {
      return { success: false, message: "Failed to retrieve permissions", permissions: [] };
    }
  }

  // Roles
  export async function createRole(
    request: DBCreateRoleRequest,
  ): Promise<DBCreateRoleResponse> {
    const { name } = request;

    try {
      await prisma.role.create({
        data: { name },
      });

      return { success: true, message: "Role created successfully" };
    } catch (error) {
      return { success: false, message: "Failed to create role" };
    }
  }

  export async function deleteRole(
    request: DBDeleteRoleRequest,
  ): Promise<DBDeleteRoleResponse> {
    const { name } = request;

    try {
      await prisma.role.delete({
        where: { name },
      });

      return { success: true, message: "Role deleted successfully" };
    } catch (error) {
      return { success: false, message: "Failed to delete role" };
    }
  }

  export async function getAllRoles(
    _request: DBGetAllRolesRequest,
  ): Promise<DBGetAllRolesResponse> {
    try {
      const roles = await prisma.role.findMany();

      return { success: true, message: "Roles retrieved successfully", roles: roles.map(r => r.name) };
    } catch (error) {
      return { success: false, message: "Failed to retrieve roles", roles: [] };
    }
  }

}
