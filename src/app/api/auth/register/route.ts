import { database } from "@/lib/db";
import { hashPassword } from "@/lib/hash";

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
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
      headers: { "Content-Type": "application/json" },
    });
  }
}
