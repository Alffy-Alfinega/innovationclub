import { auth, signOut } from "@/lib/auth";
import Sidebar, { type NavLink } from "@/components/dashboard/Sidebar";

const NAV_BY_ROLE: Record<string, NavLink[]> = {
  SUPER_ADMIN: [{ href: "/dashboard/super", label: "All Schools" }],
  SCHOOL_ADMIN: [{ href: "/dashboard/school", label: "My School" }],
  MENTOR: [{ href: "/dashboard/mentor", label: "My Students" }],
  PARENT: [{ href: "/dashboard/parent", label: "My Child" }],
  BREAK_GLASS: [
    { href: "/dashboard/super", label: "All Schools" },
    { href: "/dashboard/school", label: "School View" },
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
    <div className="min-h-screen flex">
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
