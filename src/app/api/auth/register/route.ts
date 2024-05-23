import { database } from "@/lib/db";
import {
  DBAddAccountRequest,
  DBAddAccountResponse,
} from "@/interfaces/db-interface";
import { hashPassword } from "@/lib/hash";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.json();
    const { firstName, lastName, email, password } = formData;

    // Hash the password before storing it in the database
    const hashedPassword = await hashPassword(password);

    // Add the account to the database -- FOR NOW PASS USER AS ROLE
    const response = await database.addAccount({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user",
    });

    if (response.success) {
      return new Response(null, {
        status: 201, // HTTP status code for Created
        statusText: response.message,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(null, {
        status: 400, // HTTP status code for Bad Request
        statusText: response.message,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to hash password" }),
      {
        status: 500, // HTTP status code for Internal Server Error
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
