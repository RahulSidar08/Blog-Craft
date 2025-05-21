import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const protectedRoutes = ['/dashboard', '/blog/create', '/dashboard/MyBlog'];

export function middleware(request: NextRequest) {
  console.log('Middleware triggered on:', request.nextUrl.pathname);

  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      console.log('No token found, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      console.log('Token verified, access granted');
      return NextResponse.next();
    } catch (err) {
      console.log('Invalid token, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/blog/create'], // or broader matcher for testing
};
