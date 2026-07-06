"use client";

import { useActionState, useState } from "react";
import { updateSchoolAction, deleteSchoolAction, type AddSchoolState } from "./actions";

const initial: AddSchoolState = { errors: [] };
const field =
  "w-full mt-1 rounded-md bg-surface-2 border border-line px-3 py-2 text-sm focus:border-brand outline-none transition-colors";

export default function SchoolRowActions({
  school,
}: {
  school: { id: string; name: string; slug: string; address: string | null; studentCount: number; userCount: number };
}) {
  const [open, setOpen] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [editState, editAction, editPending] = useActionState(updateSchoolAction, initial);
  const [deleteState, deleteAction, deletePending] = useActionState(deleteSchoolAction, initial);
  const hasData = school.studentCount > 0 || school.userCount > 0;

  return (
    <div>
      <button onClick={() => setOpen(!open)} className="text-xs text-brand hover:underline">
        {open ? "Close" : "Manage"}
      </button>

      {open && (
        <div className="mt-3 border border-line bg-surface-2/50 rounded-lg p-4 space-y-4 text-left">
          <form action={editAction} className="space-y-3">
            {editState.errors.length > 0 && (
              <ul className="text-xs text-red-400 space-y-0.5">
                {editState.errors.map((e) => <li key={e}>{e}</li>)}
              </ul>
            )}
            {editState.success && <p className="text-xs text-emerald-400">{editState.success}</p>}
            <input type="hidden" name="schoolId" value={school.id} />
            <div>
              <label className="text-xs text-ink-faint" htmlFor={`sname-${school.id}`}>School name *</label>
              <input id={`sname-${school.id}`} name="name" defaultValue={school.name} required minLength={3} className={field} />
            </div>
            <div>
              <label className="text-xs text-ink-faint" htmlFor={`saddr-${school.id}`}>Address</label>
              <input id={`saddr-${school.id}`} name="address" defaultValue={school.address ?? ""} className={field} />
            </div>
            <p className="text-xs text-ink-faint">
              Slug <code className="font-[family-name:var(--font-mono)]">{school.slug}</code> is permanent — registration and tenant references depend on it.
            </p>
            <button disabled={editPending} className="bg-brand hover:bg-brand-dim disabled:opacity-50 transition-colors rounded-lg px-3 py-1.5 text-xs font-medium">
              {editPending ? "Saving…" : "Save"}
            </button>
          </form>

          <div className="border-t border-line pt-3">
            {deleteState.errors.length > 0 && (
              <p className="text-xs text-red-400 mb-2">{deleteState.errors[0]}</p>
            )}
            {hasData ? (
              <p className="text-xs text-ink-faint">
                Deletion unavailable: {school.studentCount} student(s), {school.userCount} account(s) still attached.
              </p>
            ) : !confirmingDelete ? (
              <button onClick={() => setConfirmingDelete(true)} className="text-xs text-red-400 hover:underline">
                Delete this school…
              </button>
            ) : (
              <form action={deleteAction} className="flex items-center gap-3">
                <input type="hidden" name="schoolId" value={school.id} />
                <span className="text-xs text-red-400">Permanently delete {school.name}?</span>
                <button disabled={deletePending} className="text-xs border border-red-900 text-red-400 hover:bg-red-950/40 rounded-full px-2.5 py-1 disabled:opacity-50">
                  {deletePending ? "Deleting…" : "Yes, delete"}
                </button>
                <button type="button" onClick={() => setConfirmingDelete(false)} className="text-xs text-ink-faint hover:text-ink">
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
