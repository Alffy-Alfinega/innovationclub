import { prisma } from "@/lib/prisma";
import AddSchoolForm from "./schools/AddSchoolForm";

export default async function SuperAdminDashboard() {
  const schools = await prisma.school.findMany({
    include: { _count: { select: { students: true, users: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">All Schools</h1>
        <p className="text-ink-faint text-sm mt-1">
          Cross-school view — this is the one dashboard that can see every tenant.
        </p>
      </div>

      {schools.length === 0 ? (
        <p className="text-ink-faint text-sm">No schools onboarded yet — add the first one below.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-ink-faint border-b border-line">
              <th className="py-2 pr-4">School</th>
              <th className="py-2 pr-4">Slug</th>
              <th className="py-2 pr-4">Students</th>
              <th className="py-2 pr-4">Staff accounts</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((s) => (
              <tr key={s.id} className="border-b border-line/50">
                <td className="py-2 pr-4">{s.name}</td>
                <td className="py-2 pr-4 text-ink-faint">{s.slug}</td>
                <td className="py-2 pr-4">{s._count.students}</td>
                <td className="py-2 pr-4">{s._count.users}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <AddSchoolForm />
    </div>
  );
}
