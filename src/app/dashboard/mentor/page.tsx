import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function MentorDashboard() {
  const session = await auth();
  const schoolId = session?.user?.schoolId;
  if (!schoolId) redirect("/dashboard/denied");

  const students = await prisma.student.findMany({
    where: { schoolId, OR: [{ innovationClub: true }, { aiClub: true }] },
    orderBy: { className: "asc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Students</h1>
      <p className="text-ink-faint text-sm">Innovation Club / AI Club members at your school</p>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left text-ink-faint border-b border-line">
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Class</th>
            <th className="py-2 pr-4">Clubs</th>
          </tr>
        </thead>
        <tbody>
          {students.map((st) => (
            <tr key={st.id} className="border-b border-line/50">
              <td className="py-2 pr-4">{st.firstName} {st.lastName}</td>
              <td className="py-2 pr-4">{st.className}</td>
              <td className="py-2 pr-4">
                {[st.innovationClub && "Innovation", st.aiClub && "AI"].filter(Boolean).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
