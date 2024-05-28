import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Get the token from the cookies using Next.js cookie utilities
  const token = request.cookies.get('authToken')?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized, HTTP-only cookie not found" },
      { status: 401 }
    );
  }

  try {
    const userData = verifyToken(token);
    return NextResponse.json(userData, {
      status: 200,
      statusText: "User data fetched successfully",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized, invalid token" },
      { status: 401 }
    );
  }
}
