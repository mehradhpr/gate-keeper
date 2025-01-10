export async function POST(request: Request): Promise<Response> {
  const headers = new Headers();
  headers.append("Set-Cookie", "authToken=; HttpOnly; Secure; Path=/; Max-Age=0");

  return new Response(null, {
    status: 200,
    statusText: "User logged out successfully, and token has been removed.",
    headers: headers,
  });
}
