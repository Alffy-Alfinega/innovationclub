import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";

// Real data, not invented "notifications" — every meaningful admin action
// already gets written to AuditLog (user/school CRUD, break-glass logins).
// This surfaces it instead of leaving it invisible in the database.
const ACTION_LABEL: Record<string, string> = {
  USER_CREATE: "created an account for",
  USER_UPDATE: "updated",
  USER_DEACTIVATE: "deactivated",
  USER_REACTIVATE: "reactivated",
  SCHOOL_CREATE: "added school",
  SCHOOL_UPDATE: "updated school",
  SCHOOL_DELETE: "deleted school",
  BREAK_GLASS_LOGIN: "used break-glass access",
};

function summarize(action: string, detail: unknown): string {
  const d = (detail ?? {}) as Record<string, unknown>;
  const label = ACTION_LABEL[action] ?? action.replace(/_/g, " ").toLowerCase();
  if (typeof d.email === "string") return `${label} ${d.email}`;
  if (typeof d.name === "string") return `${label} ${d.name}`;
  if (typeof d.targetUserId === "string") return `${label} a user account`;
  return label;
}

export default async function ActivityPage() {
  const logs = await prisma.auditLog.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Activity."
        subtitle="Every account and school change on the platform — pulled directly from the audit log, most recent first."
      />

      {logs.length === 0 ? (
        <EmptyState title="No activity yet" description="Actions like creating accounts or editing schools will appear here." />
      ) : (
        <div className="border border-line bg-surface rounded-xl overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-ink-faint border-b border-line bg-surface-2">
                <th className="py-3 px-5 font-medium">Actor</th>
                <th className="py-3 px-5 font-medium">Action</th>
                <th className="py-3 px-5 font-medium">When</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-line last:border-0 hover:bg-surface-2/50 transition-colors">
                  <td className="py-3 px-5 font-medium">{log.user.name}</td>
                  <td className="py-3 px-5 text-ink-faint">{summarize(log.action, log.detail)}</td>
                  <td className="py-3 px-5 text-ink-faint text-xs">
                    {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(log.createdAt)}
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
