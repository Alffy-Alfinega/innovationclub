import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import EmptyState from "@/components/dashboard/EmptyState";

export default async function PatronDashboard() {
  const session = await auth();
  const schoolId = session?.user?.schoolId;
  if (!schoolId) redirect("/dashboard/denied");

  const [students, innovationCount, aiCount] = await Promise.all([
    prisma.student.findMany({
      where: { schoolId, OR: [{ innovationClub: true }, { aiClub: true }] },
      orderBy: { className: "asc" },
    }),
    prisma.student.count({ where: { schoolId, innovationClub: true } }),
    prisma.student.count({ where: { schoolId, aiClub: true } }),
  ]);

  return (
    <div>
      <PageHeader eyebrow="Patron" title="My Students." subtitle="Innovation Club / AI Club members at your school." />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        <StatCard label="Total club members" value={students.length} accent />
        <StatCard label="Innovation Club" value={innovationCount} />
        <StatCard label="AI Club" value={aiCount} />
      </div>

      {students.length === 0 ? (
        <EmptyState
          title="No club members yet"
          description="Students who tick Innovation Club or AI Club at registration will show up here."
        />
      ) : (
        <div className="border border-line bg-surface rounded-xl overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-ink-faint border-b border-line bg-surface-2">
                <th className="py-3 px-5 font-medium">Name</th>
                <th className="py-3 px-5 font-medium">Class</th>
                <th className="py-3 px-5 font-medium">Clubs</th>
              </tr>
            </thead>
            <tbody>
              {students.map((st) => (
                <tr key={st.id} className="border-b border-line last:border-0 hover:bg-surface-2/50 transition-colors">
                  <td className="py-3 px-5 font-medium">{st.firstName} {st.lastName}</td>
                  <td className="py-3 px-5">{st.className}</td>
                  <td className="py-3 px-5 flex gap-1.5">
                    {st.innovationClub && (
                      <span className="text-xs bg-brand/10 text-brand border border-brand/30 rounded-full px-2 py-0.5">Innovation</span>
                    )}
                    {st.aiClub && (
                      <span className="text-xs bg-gold/10 text-gold border border-gold/30 rounded-full px-2 py-0.5">AI</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
