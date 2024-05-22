import { PrismaClient, Account } from "@prisma/client";
import {
  DBAuthenticateRequestInfo,
  DBAuthenticateResponse,
  DBRegisterRequestInfo,
  DBRegisterResponse,
} from "@/interfaces/db-interface";
import { generateToken } from "@/lib/jwt";
import { ClientAccountInfo } from "@/interfaces/interfaces";

const prisma = new PrismaClient();

export async function createAccount(
  registerInfo: DBRegisterRequestInfo,
): Promise<DBRegisterResponse> {
  const { firstName, lastName, email, password, role } = registerInfo;

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

export async function authenticate(
  authenticateInfo: DBAuthenticateRequestInfo,
): Promise<DBAuthenticateResponse> {
  try {
    const { email, password } = authenticateInfo;
    // Finding the account by email and password
    const account = await prisma.account.findFirst({
      where: {
        email,
        password,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    if (!account) {
      return {
        success: false,
        message: "Account not found",
      };
    }

    // Generating token
    const token = generateToken(account);

    return {
      success: true,
      message: "Account authenticated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went went while authenticating",
    };
  }
}

export async function logout() {
  // Implement your logout functionality here
}

export async function deleteAccount() {}

export async function getAccountList_admin() {}

export async function modifyFirstName_admin() {}

export async function modifyLastName_admin() {}

export async function modifyEmail_admin() {}

export async function modifyPassword_admin() {}

export async function deleteAccount_admin() {}

export async function createRole_admin() {}
