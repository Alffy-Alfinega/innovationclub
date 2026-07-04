import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Extend the session/JWT shape with the fields every dashboard route needs
// to make its access-control decision without a second DB round-trip.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      schoolId: string | null;
      name: string;
      email: string;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Explicit, not auto-detected — makes failures deterministic (throws
  // clearly at startup if truly missing) instead of the intermittent
  // MissingSecret errors seen in production (13 occurrences, 6 users,
  // spanning every deployment today per Vercel runtime logs). Root cause
  // is very likely AUTH_SECRET being scoped to Preview/Development only
  // in Vercel's env var settings, not Production — verify the
  // "Production" checkbox is ticked for that variable.
  secret: process.env.AUTH_SECRET,
  // Required for custom domains (innovate.alfinega.com is not *.vercel.app).
  // Without this, Auth.js's UntrustedHost check can fail inside src/proxy.ts
  // — and when it does, auth() can't verify ANY session, so the proxy
  // treats every request as unauthenticated regardless of a valid login
  // cookie. This is the most likely explanation for "login succeeds, then
  // /dashboard shows the login page again": the login Server Action (Node
  // runtime, same-origin request) may not hit this check the same way the
  // proxy's cross-cutting middleware check does.
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user || !user.isActive) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );
        if (!valid) return null;

        // Break-glass logins are exceptional by definition — every single
        // one is audited, not just failures. This is the one place where
        // "it worked" is itself the event worth recording.
        if (user.role === "BREAK_GLASS") {
          await prisma.auditLog.create({
            data: {
              userId: user.id,
              action: "BREAK_GLASS_LOGIN",
              detail: { email: user.email },
            },
          });
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          schoolId: user.schoolId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
        token.schoolId = (user as { schoolId: string | null }).schoolId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      session.user.role = token.role as string;
      session.user.schoolId = token.schoolId as string | null;
      return session;
    },
  },
});
