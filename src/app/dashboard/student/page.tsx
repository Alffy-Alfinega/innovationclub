import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";

function initials(first: string, last: string) {
  return `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();
}

export default async function StudentDashboard() {
  const session = await auth();

  // A STUDENT account links to their own record via StudentLink. Realistically
  // this is exactly one row — this is the student's own profile, not a
  // guardian's list of children (that was the old PARENT-role framing).
  const link = await prisma.studentLink.findFirst({
    where: { userId: session!.user.id },
    include: { student: { include: { school: true } } },
  });

  return (
    <div>
      <PageHeader eyebrow="Student" title="My Profile." />

      {!link ? (
        <EmptyState
          title="Your profile isn't linked yet"
          description="Contact your school's system operator to link your account to your registration record."
        />
      ) : (
        <div className="border border-line bg-surface rounded-xl p-6 flex items-start gap-5 max-w-lg">
          <div className="w-14 h-14 rounded-full bg-brand/15 border border-brand/30 text-brand font-[family-name:var(--font-display)] font-bold text-lg flex items-center justify-center shrink-0">
            {initials(link.student.firstName, link.student.lastName)}
          </div>
          <div>
            <p className="font-[family-name:var(--font-display)] font-bold text-lg">
              {link.student.firstName} {link.student.lastName}
            </p>
            <p className="text-sm text-ink-faint mt-0.5">{link.student.school.name}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <span className="text-xs bg-surface-2 border border-line rounded-full px-2 py-0.5 text-ink-faint">
                {link.student.className}
              </span>
              {link.student.stream && (
                <span className="text-xs bg-surface-2 border border-line rounded-full px-2 py-0.5 text-ink-faint">
                  {link.student.stream}
                </span>
              )}
              {link.student.innovationClub && (
                <span className="text-xs bg-brand/10 text-brand border border-brand/30 rounded-full px-2 py-0.5">Innovation</span>
              )}
              {link.student.aiClub && (
                <span className="text-xs bg-gold/10 text-gold border border-gold/30 rounded-full px-2 py-0.5">AI</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
