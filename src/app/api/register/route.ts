import { createAccount } from "@/lib/db";

export async function POST(request: Request): Promise<Response> {
  try {
    // Parsing
    const formData = await request.json();
    const { firstName, lastName, email, password } = formData;
    // FOR NOW PUT ROLE AS "user" -----------
    const role = "user";

    // Server Side Validation
    if (!firstName || !lastName || !email || !password) {
      return new Response(null, {
        status: 400,
        statusText: "Server Side Validation Failed for registering",
        headers: { "Content-Type": "application/json" },
      });
    }

    // Business logic
    const result = await createAccount({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    // Response
    if (result.success) {
      return new Response(null, {
        status: 201,
        statusText: result.message,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(null, {
        status: 409,
        statusText: result.message,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(null, {
      status: 400,
      statusText: "Internal Server Error for registering",
      headers: { "Content-Type": "application/json" },
    });
  }
}
