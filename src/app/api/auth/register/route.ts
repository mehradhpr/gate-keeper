import { database } from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { generateToken } from "@/lib/jwt";

export async function POST(request: Request): Promise<Response> {
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

      // Set the HTTP-only, Secure cookie
      const headers = new Headers();
      headers.append(
        "Set-Cookie",
        `authToken=${tokenString}; HttpOnly; Secure; Path=/; Max-Age=604800`
      );

      return new Response(null, {
        status: 201, // HTTP status code for Created
        statusText: `${dbResponse.message} and token set successfully`,
        headers: headers,
      });
    } else {
      return new Response(null, {
        status: 400, // HTTP status code for Bad Request
        statusText: dbResponse.message,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error for registration",
      headers: { "Content-Type": "application/json" },
    });
  }
}
