import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import UsersManager, { type UserRow, type SchoolOption } from "./UsersManager";

export default async function UsersPage() {
  const [users, schools] = await Promise.all([
    prisma.user.findMany({
      include: { school: { select: { name: true } } },
      orderBy: [{ isActive: "desc" }, { createdAt: "asc" }],
    }),
    prisma.school.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);

  const rows: UserRow[] = users.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    schoolId: u.schoolId,
    schoolName: u.school?.name ?? null,
    isActive: u.isActive,
    lastLogin: u.lastLoginAt
      ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(u.lastLoginAt)
      : "Never",
  }));

  const schoolOptions: SchoolOption[] = schools;
  const activeCount = users.filter((u) => u.isActive).length;

  return (
    <div>
      <PageHeader
        eyebrow="Super Admin"
        title="Users."
        subtitle="Create and manage accounts for every role across all schools. Deactivation blocks login immediately; accounts are never hard-deleted so the audit trail stays intact."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        <StatCard label="Total accounts" value={users.length} accent />
        <StatCard label="Active" value={activeCount} />
        <StatCard label="Deactivated" value={users.length - activeCount} />
      </div>

      <UsersManager users={rows} schools={schoolOptions} />
    </div>
  );
}
