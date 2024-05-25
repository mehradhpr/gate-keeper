import { verifyToken } from "@/lib/jwt";

export async function GET(request: Request): Promise<Response> {

  // Get the token from the cookie
  const cookie = request.headers.get('cookie');
  const token = cookie
    ?.split('; ')
    .find(row => row.startsWith('authToken='))
    ?.split('=')[1];

  if (!token) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized, HTTP-only cookie not found",
    });
  }

  try {
    const userData = verifyToken(token);
    return new Response(JSON.stringify(userData), {
      status: 200,
      statusText: "User data fetched successfully",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized, invalid token",
    });
  }
}
