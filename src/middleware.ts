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

const notAllowedRoutesWhileAuthenticated = [
  /^\/login/,            // Matches the login page '/login'
  /^\/register/,         // Matches the register page '/register'
  /^\/access-denied/,    // Matches the access denied page '/access-denied'
];

const isAuthenticated = async (request: NextRequest): Promise<boolean> => {
  const token = request.cookies.get('authToken')?.value;
  if (token) {
    if (await verifyToken(token)) {
      return true;
    }
    console.log('Middleware: Attempt to use an invalid token to authenticate');
  }
  return false;
};


export async function middleware(request: NextRequest) {
  try {

    // extract the request pathname
    const { pathname } = request.nextUrl;

    // check if the pathname is a public route
    const isPublicRoute = publicRoutes.some(regex => regex.test(pathname));

    if (await isAuthenticated(request)) {
      if (notAllowedRoutesWhileAuthenticated.some(regex => regex.test(pathname))) {
        return NextResponse.redirect(new URL('/already-logged-in', request.nextUrl));
      } else {
        return NextResponse.next();
      }
    } else {
      if (!isPublicRoute) {
        console.log('Middleware: User is not authenticated and trying to access a restricted route');
        return NextResponse.redirect(new URL('/access-denied', request.nextUrl));
      } else {
        return NextResponse.next();
      }
    }
  } catch (error) {
    return NextResponse.error();
  }
}

