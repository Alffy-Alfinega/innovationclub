import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import GalleryManager, { type ProjectRow } from "./GalleryManager";

export default async function GalleryPage() {
  const [projects, schools] = await Promise.all([
    prisma.project.findMany({
      include: { school: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.school.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);

  const rows: ProjectRow[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    url: p.url,
    trimester: p.trimester,
    studentNames: p.studentNames,
    schoolName: p.school.name,
  }));

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Gallery."
        subtitle="Real projects students have shipped at demo days. Add one here and it appears on the public /projects page automatically."
      />
      {rows.length === 0 && (
        <div className="mb-8">
          <EmptyState
            title="No projects added yet"
            description="Add the first one below once a student's project is ready to show — this list feeds the public Gallery directly."
          />
        </div>
      )}
      <GalleryManager projects={rows} schools={schools} />
    </div>
  );
}
