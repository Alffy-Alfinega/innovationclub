import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";

function initials(first: string, last: string) {
  return `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();
}

export default async function ParentDashboard() {
  const session = await auth();

  const links = await prisma.parentStudent.findMany({
    where: { parentId: session!.user.id },
    include: { student: true },
  });

  return (
    <div>
      <PageHeader eyebrow="Parent Portal" title="My Child." />

      {links.length === 0 ? (
        <EmptyState
          title="No student linked yet"
          description="Contact your school admin to link your account to your child's registration."
        />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {links.map(({ student }) => (
            <div key={student.id} className="border border-line bg-surface rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-brand/15 border border-brand/30 text-brand font-[family-name:var(--font-display)] font-bold flex items-center justify-center shrink-0">
                {initials(student.firstName, student.lastName)}
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] font-bold">
                  {student.firstName} {student.lastName}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-xs bg-surface-2 border border-line rounded-full px-2 py-0.5 text-ink-faint">
                    {student.className}
                  </span>
                  {student.stream && (
                    <span className="text-xs bg-surface-2 border border-line rounded-full px-2 py-0.5 text-ink-faint">
                      {student.stream}
                    </span>
                  )}
                  {student.innovationClub && (
                    <span className="text-xs bg-brand/10 text-brand border border-brand/30 rounded-full px-2 py-0.5">Innovation</span>
                  )}
                  {student.aiClub && (
                    <span className="text-xs bg-gold/10 text-gold border border-gold/30 rounded-full px-2 py-0.5">AI</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
