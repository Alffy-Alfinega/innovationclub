import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import EmptyState from "@/components/dashboard/EmptyState";
import AddSchoolForm from "./schools/AddSchoolForm";
import SchoolRowActions from "./schools/SchoolRowActions";

export default async function SuperAdminDashboard() {
  const [schools, totalStudents, totalStaff] = await Promise.all([
    prisma.school.findMany({
      include: { _count: { select: { students: true, users: true } } },
      orderBy: { name: "asc" },
    }),
    prisma.student.count(),
    prisma.user.count({ where: { role: { not: "ADMIN" } } }),
  ]);

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="All Schools."
        subtitle="Cross-school view — this is the one dashboard that can see every tenant."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        <StatCard label="Schools onboarded" value={schools.length} accent />
        <StatCard label="Total students" value={totalStudents} />
        <StatCard label="Staff accounts" value={totalStaff} />
      </div>

      {schools.length === 0 ? (
        <EmptyState
          title="No schools yet"
          description="Add the first school below to start onboarding students and staff."
        />
      ) : (
        <div className="border border-line bg-surface rounded-xl overflow-hidden mb-10">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-ink-faint border-b border-line bg-surface-2">
                <th className="py-3 px-5 font-medium">School</th>
                <th className="py-3 px-5 font-medium">Slug</th>
                <th className="py-3 px-5 font-medium">Students</th>
                <th className="py-3 px-5 font-medium">Staff</th>
                <th className="py-3 px-5 font-medium text-right">Manage</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((s) => (
                <tr key={s.id} className="border-b border-line last:border-0 hover:bg-surface-2/50 transition-colors align-top">
                  <td className="py-3 px-5 font-medium">{s.name}</td>
                  <td className="py-3 px-5 text-ink-faint font-[family-name:var(--font-mono)] text-xs">{s.slug}</td>
                  <td className="py-3 px-5">{s._count.students}</td>
                  <td className="py-3 px-5">{s._count.users}</td>
                  <td className="py-3 px-5 text-right">
                    <SchoolRowActions
                      school={{
                        id: s.id,
                        name: s.name,
                        slug: s.slug,
                        address: s.address,
                        studentCount: s._count.students,
                        userCount: s._count.users,
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddSchoolForm />
    </div>
  );
}
