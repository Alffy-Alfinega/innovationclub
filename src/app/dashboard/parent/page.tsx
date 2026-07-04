import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ParentDashboard() {
  const session = await auth();

  const links = await prisma.parentStudent.findMany({
    where: { parentId: session!.user.id },
    include: { student: true },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Child</h1>
      {links.length === 0 ? (
        <p className="text-ink-faint text-sm">
          No student is linked to your account yet — contact your school admin.
        </p>
      ) : (
        links.map(({ student }) => (
          <div key={student.id} className="border border-line rounded-lg p-4">
            <p className="font-medium">{student.firstName} {student.lastName}</p>
            <p className="text-ink-faint text-sm">{student.className} · {student.stream ?? "—"}</p>
          </div>
        ))
      )}
    </div>
  );
}
