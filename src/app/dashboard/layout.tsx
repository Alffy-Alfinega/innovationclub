import { auth, signOut } from "@/lib/auth";
import Sidebar, { type NavLink } from "@/components/dashboard/Sidebar";

const NAV_BY_ROLE: Record<string, NavLink[]> = {
  ADMIN: [
    { href: "/dashboard/admin", label: "All Schools" },
    { href: "/dashboard/admin/users", label: "Users" },
  ],
  SYSTEM_OPERATOR: [{ href: "/dashboard/operator", label: "My School" }],
  PATRON: [{ href: "/dashboard/patron", label: "My Students" }],
  STUDENT: [{ href: "/dashboard/student", label: "My Profile" }],
  BREAK_GLASS: [
    { href: "/dashboard/admin", label: "All Schools" },
    { href: "/dashboard/admin/users", label: "Users" },
    { href: "/dashboard/operator", label: "School View" },
  ],
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = session?.user?.role || "";
  const navLinks = NAV_BY_ROLE[role] || [];

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar
        role={role}
        userName={session?.user?.name || ""}
        navLinks={navLinks}
        signOutAction={signOutAction}
      />
      <main className="flex-1 min-w-0 p-6 md:p-8">{children}</main>
    </div>
  );
}
