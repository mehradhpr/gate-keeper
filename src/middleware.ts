import { NextRequest, NextResponse } from 'next/server';
import {verifyToken} from "@/lib/jwt";

const publicRoutes = [
  /^\/$/,                 // Matches the root path '/'
  /^\/login$/,            // Matches the login page '/login'
  /^\/register$/,         // Matches the register page '/register'
  /^\/access-denied$/,    // Matches the access denied page '/access-denied'
  /^\/api\/auth/,        // Matches the authentication API routes
  /^\/favicon\.ico$/,     // Matches the favicon '/favicon.ico'
  /^\/public/,            // Matches any path that starts with '/public'
  /^\/_next/,             // Matches any path that starts with '/_next'
];

export function middleware(request: NextRequest) {
  try {

    // extract the request pathname
    const { pathname } = request.nextUrl;

    // check if the pathname is a public route
    const isPublicRoute = publicRoutes.some(regex => regex.test(pathname));

    if (isPublicRoute) {
      console.log("Middleware: Public Route - Pass through");
      return NextResponse.next();
    } else {
      console.log("Middleware: Protected Route");
      return NextResponse.next();
    }

  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.error();
  }
}
