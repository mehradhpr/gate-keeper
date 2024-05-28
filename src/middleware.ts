import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = [
  '/login', // login page
  '/register', // register page
  '/', // home page

  // public assets
  '/_next',
  '/favicon.ico',
  '/public'
];

export function middleware(request: NextRequest) {
  try {

    // extract the request pathname
    const { pathname } = request.nextUrl;

    // check if the pathname is a public route
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // handle the case where the
    if (isPublicRoute) {
      console.log("Middleware: Public Route");
    }

  } catch (error) {
    console.error('Error in middleware:', error);
  }

  // Continue processing the request
  return NextResponse.next();
}
