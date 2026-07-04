import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SchoolAdminDashboard() {
  const session = await auth();
  const schoolId = session?.user.schoolId;
  if (!schoolId) redirect("/dashboard/denied");

  const [school, students] = await Promise.all([
    prisma.school.findUnique({ where: { id: schoolId } }),
    prisma.student.findMany({ where: { schoolId }, orderBy: { createdAt: "desc" }, take: 100 }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{school?.name ?? "My School"}</h1>
      <p className="text-neutral-400 text-sm">{students.length} registered students (most recent 100)</p>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left text-neutral-500 border-b border-neutral-800">
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Class</th>
            <th className="py-2 pr-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((st) => (
            <tr key={st.id} className="border-b border-neutral-900">
              <td className="py-2 pr-4">{st.firstName} {st.lastName}</td>
              <td className="py-2 pr-4">{st.className}</td>
              <td className="py-2 pr-4">{st.status ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
