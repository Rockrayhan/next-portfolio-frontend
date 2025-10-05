// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard"] };


import { withAuth } from "next-auth/middleware";

// Protect only dashboard/admin routes
export default withAuth({
  // Redirect to /login if user is not authenticated
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token }) => !!token, // allow only authenticated users
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",  // all dashboard routes
  ],
};
