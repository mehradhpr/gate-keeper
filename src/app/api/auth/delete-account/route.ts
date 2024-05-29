import {NextRequest, NextResponse} from 'next/server';
import {verifyToken} from '@/lib/jwt';
import {database} from "@/lib/db";

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Get the token from the cookies using Next.js cookie utilities
  const token = request.cookies.get('authToken')?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized, HTTP-only cookie not found" },
      { status: 401 }
    );
  }

  try {
    const userData = await verifyToken(token);
    if (!userData) {
      return NextResponse.json(null, {
        status: 401,
        statusText: "Unauthorized, invalid token",
      });
    } else {
      const email = userData.email as string;
      const DBResult = await database.deleteAccountByEmail({email: email});
      return NextResponse.json(null, {
        status: 200,
        statusText: DBResult.message,
      });
    }
  } catch (error) {
    return NextResponse.json(null, {
      status: 401,
      statusText: "Unauthorized, invalid token"
    });
  }
}
