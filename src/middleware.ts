import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    console.log('Middleware intercepting:', request.url);
  } catch (error) {
    console.error('Error in middleware:', error);
  }

  // Continue processing the request
  return NextResponse.next();
}
