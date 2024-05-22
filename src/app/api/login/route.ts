import { authenticate } from "@/lib/db";
import { generateToken } from "@/lib/jwt";

export async function POST(request: Request): Promise<Response> {
  try {
    // Parsing
    const formData = await request.json();
    const { email, password } = formData;

    // Server Side Validation
    if (!email || !password) {
      return new Response(null, {
        status: 400,
        statusText: "Server Side Validation Failed for logging in",
        headers: { "Content-Type": "application/json" },
      });
    }

    // Business logic
    const result = await authenticate({ email, password });
    if (!result.success || !result.account) {
      return new Response(null, {
        status: 400,
        statusText: result.message,
        headers: { "Content-Type": "application/json" },
      });
    }
    const tokenString = generateToken(result.account);

    // Response
    return new Response(tokenString, {
      status: 200,
      statusText: result.message,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(null, {
      status: 400,
      statusText: "Internal Server Error for logging in",
      headers: { "Content-Type": "application/json" },
    });
  }
}
