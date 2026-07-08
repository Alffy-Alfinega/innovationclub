"use client";

import { useActionState } from "react";
import { addProjectAction, deleteProjectAction, type GalleryActionState } from "./actions";

export type SchoolOption = { id: string; name: string };
export type ProjectRow = {
  id: string;
  title: string;
  url: string;
  trimester: string;
  studentNames: string;
  schoolName: string;
};

const TRIMESTERS = [
  "Trimester 1", "Trimester 2", "Trimester 3", "Trimester 4", "Trimester 5", "Trimester 6",
];
const initial: GalleryActionState = { errors: [] };
const field =
  "w-full mt-1 rounded-md bg-surface-2 border border-line px-3 py-2 text-sm focus:border-brand outline-none transition-colors";
const label = "text-xs text-ink-faint";

function Feedback({ state }: { state: GalleryActionState }) {
  if (state.errors.length > 0)
    return (
      <ul className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-3 py-2 space-y-1">
        {state.errors.map((e) => <li key={e}>{e}</li>)}
      </ul>
    );
  if (state.success)
    return <p className="text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-900 rounded-md px-3 py-2">{state.success}</p>;
  return null;
}

function DeleteButton({ projectId }: { projectId: string }) {
  const [state, formAction, pending] = useActionState(deleteProjectAction, initial);
  return (
    <form action={formAction} className="inline">
      <input type="hidden" name="projectId" value={projectId} />
      <button disabled={pending} className="text-xs text-red-400 hover:underline disabled:opacity-50">
        {pending ? "Removing…" : "Remove"}
      </button>
      {state.errors.length > 0 && <p className="text-xs text-red-400 mt-1">{state.errors[0]}</p>}
    </form>
  );
}

export default function GalleryManager({ projects, schools }: { projects: ProjectRow[]; schools: SchoolOption[] }) {
  const [state, formAction, pending] = useActionState(addProjectAction, initial);

  return (
    <div className="space-y-10">
      {projects.length > 0 && (
        <div className="border border-line bg-surface rounded-xl overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-ink-faint border-b border-line bg-surface-2">
                <th className="py-3 px-5 font-medium">Project</th>
                <th className="py-3 px-5 font-medium">Students</th>
                <th className="py-3 px-5 font-medium">Trimester</th>
                <th className="py-3 px-5 font-medium">School</th>
                <th className="py-3 px-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-line last:border-0 hover:bg-surface-2/50 transition-colors">
                  <td className="py-3 px-5 font-medium">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                      {p.title} ↗
                    </a>
                  </td>
                  <td className="py-3 px-5 text-ink-faint">{p.studentNames}</td>
                  <td className="py-3 px-5 text-ink-faint">{p.trimester}</td>
                  <td className="py-3 px-5 text-ink-faint">{p.schoolName}</td>
                  <td className="py-3 px-5 text-right">
                    <DeleteButton projectId={p.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <form action={formAction} className="border border-line bg-surface rounded-xl p-6 space-y-4 max-w-2xl">
        <h2 className="font-[family-name:var(--font-display)] font-bold">Add a shipped project</h2>
        <Feedback state={state} />
        <div>
          <label className={label} htmlFor="p-title">Title *</label>
          <input id="p-title" name="title" required minLength={3} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="p-url">Project URL * (GitHub Pages, deployed link, etc.)</label>
          <input id="p-url" name="url" type="url" required placeholder="https://…" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="p-desc">Short description</label>
          <input id="p-desc" name="description" className={field} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={label} htmlFor="p-trimester">Trimester *</label>
            <select id="p-trimester" name="trimester" required className={field}>
              <option value="">Select trimester</option>
              {TRIMESTERS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="p-school">School *</label>
            <select id="p-school" name="schoolId" required className={field}>
              <option value="">Select school</option>
              {schools.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className={label} htmlFor="p-students">Student(s) credited *</label>
          <input id="p-students" name="studentNames" required minLength={2} placeholder="e.g. Nakato B., Okello J." className={field} />
        </div>
        <button disabled={pending} className="bg-brand hover:bg-brand-dim disabled:opacity-50 transition-colors rounded-lg px-4 py-2 text-sm font-medium">
          {pending ? "Adding…" : "Add to gallery"}
        </button>
      </form>
    </div>
  );
}
