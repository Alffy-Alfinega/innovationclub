"use client";

import { useActionState } from "react";
import { updateProfileAction, type ProfileActionState } from "./actions";

const initial: ProfileActionState = { errors: [] };
const field =
  "w-full mt-1 rounded-md bg-surface-2 border border-line px-3 py-2 text-sm focus:border-brand outline-none transition-colors";
const label = "text-xs text-ink-faint";

export default function AccountForm({ name, email }: { name: string; email: string }) {
  const [state, formAction, pending] = useActionState(updateProfileAction, initial);

  return (
    <form action={formAction} className="border border-line bg-surface rounded-xl p-6 space-y-5 max-w-lg">
      {state.errors.length > 0 && (
        <ul className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-3 py-2 space-y-1">
          {state.errors.map((e) => <li key={e}>{e}</li>)}
        </ul>
      )}
      {state.success && (
        <p className="text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-900 rounded-md px-3 py-2">{state.success}</p>
      )}

      <div>
        <label className={label}>Email</label>
        <input value={email} disabled className={`${field} opacity-60`} />
        <p className="text-xs text-ink-faint mt-1">Contact your admin to change your email.</p>
      </div>

      <div>
        <label className={label} htmlFor="profile-name">Full name</label>
        <input id="profile-name" name="name" defaultValue={name} required minLength={2} className={field} />
      </div>

      <div className="border-t border-line pt-5 space-y-4">
        <p className={label}>Change password (optional)</p>
        <div>
          <label className={label} htmlFor="current-password">Current password</label>
          <input id="current-password" name="currentPassword" type="password" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="new-password">New password (12+ characters)</label>
          <input id="new-password" name="newPassword" type="password" minLength={12} className={field} />
        </div>
      </div>

      <button
        disabled={pending}
        className="bg-brand hover:bg-brand-dim disabled:opacity-50 transition-colors rounded-lg px-4 py-2 text-sm font-medium"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
