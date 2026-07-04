import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Route prefix -> roles allowed. Checked in order; first match wins.
// Anything under /dashboard not listed here falls through to "deny".
const ROUTE_ROLES: Record<string, string[]> = {
  "/dashboard/super": ["SUPER_ADMIN", "BREAK_GLASS"],
  "/dashboard/school": ["SCHOOL_ADMIN", "SUPER_ADMIN", "BREAK_GLASS"],
  "/dashboard/mentor": ["MENTOR", "SCHOOL_ADMIN", "SUPER_ADMIN", "BREAK_GLASS"],
  "/dashboard/parent": ["PARENT", "SCHOOL_ADMIN", "SUPER_ADMIN", "BREAK_GLASS"],
};

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const matchedPrefix = Object.keys(ROUTE_ROLES).find((p) =>
    pathname.startsWith(p)
  );

  if (!matchedPrefix) return NextResponse.next();

  const session = req.auth;
  if (!session?.user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const allowedRoles = ROUTE_ROLES[matchedPrefix];
  if (!allowedRoles.includes(session.user.role)) {
    return NextResponse.redirect(new URL("/dashboard/denied", req.url));
  }

  // School-scoped roles can only see their own school's dashboard —
  // this is the multi-tenancy boundary enforced at the edge, not hoped-for
  // in every individual query.
  if (
    session.user.role !== "SUPER_ADMIN" &&
    session.user.role !== "BREAK_GLASS" &&
    matchedPrefix === "/dashboard/school"
  ) {
    const requestedSchool = req.nextUrl.searchParams.get("school");
    if (requestedSchool && requestedSchool !== session.user.schoolId) {
      return NextResponse.redirect(new URL("/dashboard/denied", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
