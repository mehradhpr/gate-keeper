import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/db';
import { comparePassword } from '@/lib/hash';
import { generateToken } from '@/lib/jwt';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const formData = await request.json();

  try {
    const dbResponse = await database.getAccountByEmail({
      email: formData.email,
    });
    if (dbResponse.success && dbResponse.account) {
      // Check if the password is correct
      const isMatch = await comparePassword(
        formData.password,
        dbResponse.account.password
      );
      if (isMatch) {
        // Authenticate user by generating a token
        const tokenContent = {
          email: dbResponse.account.email,
          firstName: dbResponse.account.firstName,
          lastName: dbResponse.account.lastName,
          role: dbResponse.account.role,
        };

        const tokenString = await generateToken(tokenContent);

        // Set the HTTP-only, Secure cookie
        const response = NextResponse.json(null, {
          status: 200,
          statusText: "User logged in successfully, and token is set",
        });
        response.cookies.set('authToken', tokenString, {
          httpOnly: true,
          secure: true,
          path: '/',
          maxAge: 604800,
        });

        return response;
      } else {
        return NextResponse.json(
          null,
          {
            status: 401,
            statusText: "Unauthorized, invalid password",
          }
        );
      }
    } else {
      return NextResponse.json(
        null,
        {
          status: 404,
          statusText: `Unauthorized, from DB: ${dbResponse.message}`,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      null,
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
