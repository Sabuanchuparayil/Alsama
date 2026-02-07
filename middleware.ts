import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Don't protect login page
      if (req.nextUrl.pathname === '/admin/login') {
        return true;
      }
      // Protect admin routes
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return token?.role === 'admin';
      }
      return true;
    },
  },
});

export const config = {
  matcher: ['/admin/:path*'],
};
