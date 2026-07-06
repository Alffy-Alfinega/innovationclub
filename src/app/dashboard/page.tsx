import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// Login defaults to redirecting here when there's no specific callbackUrl
// (e.g. logging in directly at /login rather than being bounced from a
// specific dashboard page). This page's only job is to send each role to
// its actual home — it renders nothing itself.
const ROLE_HOME: Record<string, string> = {
  ADMIN: "/dashboard/admin",
  SYSTEM_OPERATOR: "/dashboard/operator",
  PATRON: "/dashboard/patron",
  STUDENT: "/dashboard/student",
  BREAK_GLASS: "/dashboard/admin",
};

export default async function DashboardIndex() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  redirect(ROLE_HOME[session.user.role] ?? "/dashboard/denied");
}
