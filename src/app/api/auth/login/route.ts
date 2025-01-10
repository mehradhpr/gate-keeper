import { database } from "@/lib/db";
import { comparePassword } from "@/lib/hash";
import { generateToken } from "@/lib/jwt";

export async function POST(request: Request): Promise<Response> {
  const formData = await request.json();

  try {
    const dbResponse = await database.getAccountByEmail({
      email: formData.email,
    });
    if (dbResponse.success && dbResponse.account) {
      // Check if the password is correct
      const isMatch = await comparePassword(formData.password, dbResponse.account.password);
      if (isMatch) {
        // Authenticate user by generating a token
        const tokenContent = {
          email: dbResponse.account.email,
          firstName: dbResponse.account.firstName,
          lastName: dbResponse.account.lastName,
          role: dbResponse.account.role,
        };

        const tokenString = generateToken(tokenContent);

        // Set the HTTP-only, Secure cookie
        const headers = new Headers();
        headers.append(
          "Set-Cookie",
          `authToken=${tokenString}; HttpOnly; Secure; Path=/; Max-Age=604800`
        );

        return new Response(null, {
          status: 200,
          statusText: "User logged in successfully, and token is set",
          headers: headers,
        });
      } else {
        return new Response(null, {
          status: 401,
          statusText: "Unauthorized, invalid password",
          headers: { "Content-Type": "application/json" },
        });
      }
    } else {
      return new Response(null, {
        status: 404,
        statusText: `Unauthorized, from DB: ${dbResponse.message}`,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
      headers: { "Content-Type": "application/json" },
    });
  }
}
