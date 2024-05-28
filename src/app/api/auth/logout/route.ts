import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Create a response to clear the authToken cookie
  const response = NextResponse.json(null, {
    status: 200,
    statusText: "User logged out successfully, and token has been removed.",
  });

  // Set the authToken cookie with Max-Age=0 to effectively remove it
  response.cookies.set('authToken', '', {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 0,
  });

  return response;
}
