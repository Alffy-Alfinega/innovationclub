import { auth, signOut } from "@/lib/auth";
import Link from "next/link";

const NAV_BY_ROLE: Record<string, { href: string; label: string }[]> = {
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
  const role = session?.user.role || "";
  const links = NAV_BY_ROLE[role] || [];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <nav className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-semibold">Innovation Club</span>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-neutral-400 hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-neutral-400">
          <span>{session?.user.name} · {role.replace("_", " ")}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button className="hover:text-white">Sign out</button>
          </form>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
