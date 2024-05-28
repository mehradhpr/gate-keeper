import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { hashPassword } from '@/lib/hash';
import { generateToken } from '@/lib/jwt';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.json();
    const { firstName, lastName, email, password } = formData;

    // Hash the password before storing it in the database
    const hashedPassword = await hashPassword(password);

    // Add the account to the database
    const dbResponse = await database.addAccount({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user",
    });

    if (dbResponse.success) {
      // Generate a token for the new user
      const tokenContent = {
        email,
        firstName,
        lastName,
        role: "user",
      };

      const tokenString = generateToken(tokenContent);

      // Create a response with the HTTP-only, Secure cookie
      const response = NextResponse.json(null, {
        status: 201, // HTTP status code for Created
        statusText: `${dbResponse.message} and token set successfully`,
      });
      response.cookies.set('authToken', tokenString, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 604800,
      });

      return response;
    } else {
      return NextResponse.json(null, {
        status: 400, // HTTP status code for Bad Request
        statusText: dbResponse.message,
      });
    }
  } catch (error) {
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error for registration",
    });
  }
}
