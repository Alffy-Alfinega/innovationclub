import { prisma } from "@/lib/prisma";

export default async function SuperAdminDashboard() {
  const schools = await prisma.school.findMany({
    include: { _count: { select: { students: true, users: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">All Schools</h1>
      <p className="text-neutral-400 text-sm">
        Cross-school view — this is the one dashboard that can see every tenant.
      </p>
      {schools.length === 0 ? (
        <p className="text-neutral-500 text-sm">No schools onboarded yet.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-neutral-500 border-b border-neutral-800">
              <th className="py-2 pr-4">School</th>
              <th className="py-2 pr-4">Students</th>
              <th className="py-2 pr-4">Staff accounts</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((s) => (
              <tr key={s.id} className="border-b border-neutral-900">
                <td className="py-2 pr-4">{s.name}</td>
                <td className="py-2 pr-4">{s._count.students}</td>
                <td className="py-2 pr-4">{s._count.users}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
