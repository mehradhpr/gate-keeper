import { database } from "@/lib/db";
import { comparePassword } from "@/lib/hash";
import { generateToken } from "@/lib/jwt";

export async function POST(request: Request): Promise<Response> {
  const formData = await request.json();

  try {
    const DBResult = await database.getAccountByEmail({
      email: formData.email,
    });
    if (DBResult.success && DBResult.account) {
      // Check if the password is correct
      const isMatch = await comparePassword(
        formData.password,
        DBResult.account.password,
      );
      if (isMatch) {
        // Authenticate user by returning a client token
        const tokenContent = {
          email: DBResult.account.email,
          firstName: DBResult.account.firstName,
          lastName: DBResult.account.lastName,
          role: DBResult.account.role,
        };
        const tokenString = generateToken(tokenContent);
        return new Response(JSON.stringify(tokenString), {
          status: 200,
          statusText: "User logged in successfully",
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(null, {
          status: 401,
          statusText: "Unauthorized",
          headers: { "Content-Type": "application/json" },
        });
      }
    } else {
      return new Response(null, {
        status: 404,
        statusText: DBResult.message,
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
