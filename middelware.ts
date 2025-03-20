import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const authRoutes = ['/api/auth', '/login', '/register'];
const publicRoutes = ['/'];

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (authRoutes.some((route) => pathname.startsWith(route))) return true;
        if (publicRoutes.includes(pathname)) return true;

        return !!token; // Restrict all other routes
      },
    },
  },
);

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
};
