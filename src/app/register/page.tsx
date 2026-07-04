"use client";

import { useActionState } from "react";
import { registerAction } from "./actions";

const CLASSES = ["Form 1", "Form 2", "Form 3", "Form 5"];

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, { errors: [] });

  return (
    <main className="min-h-screen bg-neutral-950 text-white px-6 py-16">
      <form action={formAction} className="max-w-lg mx-auto space-y-5">
        <h1 className="text-2xl font-semibold">Register</h1>

        {state.errors.length > 0 && (
          <ul className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-4 py-3 space-y-1">
            {state.errors.map((e) => <li key={e}>{e}</li>)}
          </ul>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-neutral-300">First name *</label>
            <input name="firstName" required minLength={2} className="w-full mt-1 rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm text-neutral-300">Last name *</label>
            <input name="lastName" required minLength={2} className="w-full mt-1 rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm" />
          </div>
        </div>

        <div>
          <label className="text-sm text-neutral-300">Class *</label>
          <select name="className" required className="w-full mt-1 rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm">
            <option value="">Select class</option>
            {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-neutral-300">Email</label>
            <input name="email" type="email" className="w-full mt-1 rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm text-neutral-300">Phone</label>
            <input name="phone" type="tel" className="w-full mt-1 rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" name="innovationClub" /> Innovation Club</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="aiClub" /> AI Club</label>
        </div>

        <label className="flex items-start gap-2 text-sm text-neutral-300">
          <input type="checkbox" name="agree" required className="mt-1" />
          I confirm the information above is accurate and agree to the terms.
        </label>

        <button disabled={pending} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-colors rounded-lg py-2.5 text-sm font-medium">
          {pending ? "Submitting…" : "Submit Registration →"}
        </button>
      </form>
    </main>
  );
}
