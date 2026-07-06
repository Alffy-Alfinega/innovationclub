import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const ALL_ROLES = ["ADMIN", "SYSTEM_OPERATOR", "PATRON", "STUDENT", "BREAK_GLASS"];

// Route prefix -> roles allowed. Checked in order; first match wins.
// Anything under /dashboard not listed here falls through to "deny".
const ROUTE_ROLES: Record<string, string[]> = {
  "/dashboard/admin": ["ADMIN", "BREAK_GLASS"],
  "/dashboard/operator": ["SYSTEM_OPERATOR", "ADMIN", "BREAK_GLASS"],
  "/dashboard/patron": ["PATRON", "SYSTEM_OPERATOR", "ADMIN", "BREAK_GLASS"],
  "/dashboard/student": ["STUDENT", "SYSTEM_OPERATOR", "ADMIN", "BREAK_GLASS"],
  // Exact match for the bare /dashboard index (role-routing landing page).
  // Without this, "/dashboard" matched none of the prefixes above and the
  // proxy let it through with ZERO auth check — a real gap, not just a
  // missing page. Any authenticated role can hit the index; the page
  // itself then redirects onward to the role-specific dashboard.
  "/dashboard": ALL_ROLES,
};

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Always viewable, regardless of auth state — this is where role checks
  // above redirect TO, so it can't itself require passing a role check.
  if (pathname === "/dashboard/denied") return NextResponse.next();

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
    session.user.role !== "ADMIN" &&
    session.user.role !== "BREAK_GLASS" &&
    matchedPrefix === "/dashboard/operator"
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
