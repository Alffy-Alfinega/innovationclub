"use client";

import { useActionState } from "react";
import { addSchoolAction, type AddSchoolState } from "./actions";

const initialState: AddSchoolState = { errors: [] };

export default function AddSchoolForm() {
  const [state, formAction, pending] = useActionState(addSchoolAction, initialState);

  return (
    <form
      action={formAction}
      className="border border-neutral-800 rounded-xl p-5 space-y-4 max-w-md"
    >
      <h2 className="font-medium">Add a school</h2>

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
        <label className="text-sm text-neutral-300" htmlFor="school-name">
          School name *
        </label>
        <input
          id="school-name"
          name="name"
          required
          minLength={3}
          maxLength={120}
          placeholder="e.g. Makindye Secondary School"
          className="w-full mt-1 rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm text-neutral-300" htmlFor="school-address">
          Address
        </label>
        <input
          id="school-address"
          name="address"
          placeholder="e.g. Makindye, Kampala"
          className="w-full mt-1 rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm"
        />
      </div>

      <button
        disabled={pending}
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-colors rounded-lg px-4 py-2 text-sm font-medium"
      >
        {pending ? "Adding…" : "Add school"}
      </button>
    </form>
  );
}
