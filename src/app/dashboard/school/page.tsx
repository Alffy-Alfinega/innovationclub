import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import EmptyState from "@/components/dashboard/EmptyState";

export default async function SchoolAdminDashboard() {
  const session = await auth();
  const schoolId = session?.user?.schoolId;
  if (!schoolId) redirect("/dashboard/denied");

  const [school, students, dayCount, boardingCount, clubCount] = await Promise.all([
    prisma.school.findUnique({ where: { id: schoolId } }),
    prisma.student.findMany({ where: { schoolId }, orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.student.count({ where: { schoolId, status: "DAY_SCHOLAR" } }),
    prisma.student.count({ where: { schoolId, status: "BOARDING_SCHOLAR" } }),
    prisma.student.count({ where: { schoolId, OR: [{ innovationClub: true }, { aiClub: true }] } }),
  ]);

  return (
    <div>
      <PageHeader eyebrow="School Admin" title={`${school?.name ?? "My School"}.`} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total students" value={students.length} accent />
        <StatCard label="Day scholars" value={dayCount} />
        <StatCard label="Boarding scholars" value={boardingCount} />
        <StatCard label="Club members" value={clubCount} />
      </div>

      {students.length === 0 ? (
        <EmptyState
          title="No students registered yet"
          description="Share the registration link with students to get started — new registrations will appear here automatically."
          action={
            <code className="font-[family-name:var(--font-mono)] text-xs text-brand bg-surface-2 border border-line rounded-md px-3 py-1.5 inline-block">
              innovate.alfinega.com/register
            </code>
          }
        />
      ) : (
        <div className="border border-line bg-surface rounded-xl overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-ink-faint border-b border-line bg-surface-2">
                <th className="py-3 px-5 font-medium">Name</th>
                <th className="py-3 px-5 font-medium">Class</th>
                <th className="py-3 px-5 font-medium">Stream</th>
                <th className="py-3 px-5 font-medium">Status</th>
                <th className="py-3 px-5 font-medium">Clubs</th>
              </tr>
            </thead>
            <tbody>
              {students.map((st) => (
                <tr key={st.id} className="border-b border-line last:border-0 hover:bg-surface-2/50 transition-colors">
                  <td className="py-3 px-5 font-medium">{st.firstName} {st.lastName}</td>
                  <td className="py-3 px-5">{st.className}</td>
                  <td className="py-3 px-5 text-ink-faint">{st.stream ?? "—"}</td>
                  <td className="py-3 px-5">
                    <span className="text-xs bg-surface-2 border border-line rounded-full px-2 py-0.5 text-ink-faint">
                      {st.status === "DAY_SCHOLAR" ? "Day" : st.status === "BOARDING_SCHOLAR" ? "Boarding" : "—"}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-ink-faint text-xs">
                    {[st.innovationClub && "Innovation", st.aiClub && "AI"].filter(Boolean).join(", ") || "—"}
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
