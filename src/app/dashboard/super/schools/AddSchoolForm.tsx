"use client";

import { useActionState } from "react";
import { addSchoolAction, type AddSchoolState } from "./actions";

const initialState: AddSchoolState = { errors: [] };

export default function AddSchoolForm() {
  const [state, formAction, pending] = useActionState(addSchoolAction, initialState);

  return (
    <form
      action={formAction}
      className="border border-line bg-surface rounded-xl p-6 space-y-4 max-w-md"
    >
      <h2 className="font-[family-name:var(--font-display)] font-bold">Add a school</h2>

      {state.errors.length > 0 && (
        <ul className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-3 py-2 space-y-1">
          {state.errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
      {state.success && (
        <p className="text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-900 rounded-md px-3 py-2">
          {state.success}
        </p>
      )}

      <div>
        <label className="text-sm text-ink-muted" htmlFor="school-name">
          School name *
        </label>
        <input
          id="school-name"
          name="name"
          required
          minLength={3}
          maxLength={120}
          placeholder="e.g. Makindye Secondary School"
          className="w-full mt-1 rounded-md bg-surface-2 border border-line px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm text-ink-muted" htmlFor="school-address">
          Address
        </label>
        <input
          id="school-address"
          name="address"
          placeholder="e.g. Makindye, Kampala"
          className="w-full mt-1 rounded-md bg-surface-2 border border-line px-3 py-2 text-sm"
        />
      </div>

      <button
        disabled={pending}
        type="submit"
        className="bg-brand hover:bg-brand-dim disabled:opacity-50 transition-colors rounded-lg px-4 py-2 text-sm font-medium"
      >
        {pending ? "Adding…" : "Add school"}
      </button>
    </form>
  );
}
