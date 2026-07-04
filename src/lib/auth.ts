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
