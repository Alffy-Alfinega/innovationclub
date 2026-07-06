import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import EmptyState from "@/components/dashboard/EmptyState";
import StudentTable from "@/components/dashboard/StudentTable";

export default async function SystemOperatorDashboard() {
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
      <PageHeader eyebrow="System Operator" title={`${school?.name ?? "My School"}.`} />

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
        <StudentTable students={students} />
      )}
    </div>
  );
}
