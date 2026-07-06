"use client";

import { Fragment, useActionState, useState } from "react";
import {
  createUserAction,
  updateUserAction,
  setUserActiveAction,
  type UserActionState,
} from "./actions";

export type SchoolOption = { id: string; name: string };
export type UserRow = {
  id: string;
  email: string;
  name: string;
  role: string;
  schoolId: string | null;
  schoolName: string | null;
  isActive: boolean;
  lastLogin: string; // preformatted server-side
};

const ROLES = ["ADMIN", "SYSTEM_OPERATOR", "PATRON", "STUDENT", "BREAK_GLASS"];
const SCHOOL_SCOPED = new Set(["SYSTEM_OPERATOR", "PATRON", "STUDENT"]);
const initial: UserActionState = { errors: [] };

const field =
  "w-full mt-1 rounded-md bg-surface-2 border border-line px-3 py-2 text-sm focus:border-brand outline-none transition-colors";
const label = "text-xs text-ink-faint";

function Feedback({ state }: { state: UserActionState }) {
  if (state.errors.length > 0)
    return (
      <ul className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-3 py-2 space-y-1">
        {state.errors.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    );
  if (state.success)
    return (
      <p className="text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-900 rounded-md px-3 py-2">
        {state.success}
      </p>
    );
  return null;
}

function RoleSchoolFields({
  defaultRole,
  defaultSchoolId,
  schools,
  idPrefix,
}: {
  defaultRole: string;
  defaultSchoolId: string;
  schools: SchoolOption[];
  idPrefix: string;
}) {
  const [role, setRole] = useState(defaultRole);
  const needsSchool = SCHOOL_SCOPED.has(role);
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <label className={label} htmlFor={`${idPrefix}-role`}>Role *</label>
        <select id={`${idPrefix}-role`} name="role" value={role} onChange={(e) => setRole(e.target.value)} className={field}>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r.replace("_", " ")}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={label} htmlFor={`${idPrefix}-school`}>
          School {needsSchool ? "*" : "(not applicable — cross-school role)"}
        </label>
        <select
          id={`${idPrefix}-school`}
          name="schoolId"
          defaultValue={needsSchool ? defaultSchoolId : ""}
          disabled={!needsSchool}
          className={`${field} disabled:opacity-50`}
        >
          <option value="">Select school</option>
          {schools.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function CreateUserForm({ schools }: { schools: SchoolOption[] }) {
  const [state, formAction, pending] = useActionState(createUserAction, initial);
  return (
    <form action={formAction} className="border border-line bg-surface rounded-xl p-6 space-y-4 max-w-2xl">
      <h2 className="font-[family-name:var(--font-display)] font-bold">Create an account</h2>
      <Feedback state={state} />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={label} htmlFor="new-name">Full name *</label>
          <input id="new-name" name="name" required minLength={2} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="new-email">Email *</label>
          <input id="new-email" name="email" type="email" required className={field} />
        </div>
      </div>
      <RoleSchoolFields defaultRole="SYSTEM_OPERATOR" defaultSchoolId="" schools={schools} idPrefix="new" />
      <div>
        <label className={label} htmlFor="new-password">Initial password * (12+ characters — share it with the person privately; they should not reuse it elsewhere)</label>
        <input id="new-password" name="password" type="password" required minLength={12} className={field} />
      </div>
      <button
        disabled={pending}
        className="bg-brand hover:bg-brand-dim disabled:opacity-50 transition-colors rounded-lg px-4 py-2 text-sm font-medium"
      >
        {pending ? "Creating…" : "Create account"}
      </button>
    </form>
  );
}

function EditUserForm({ user, schools }: { user: UserRow; schools: SchoolOption[] }) {
  const [state, formAction, pending] = useActionState(updateUserAction, initial);
  return (
    <form action={formAction} className="bg-surface-2/50 border-t border-line p-5 space-y-4">
      <Feedback state={state} />
      <input type="hidden" name="userId" value={user.id} />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={label} htmlFor={`name-${user.id}`}>Full name *</label>
          <input id={`name-${user.id}`} name="name" defaultValue={user.name} required minLength={2} className={field} />
        </div>
        <div>
          <label className={label} htmlFor={`pw-${user.id}`}>Set new password (leave blank to keep current)</label>
          <input id={`pw-${user.id}`} name="newPassword" type="password" minLength={12} className={field} />
        </div>
      </div>
      <RoleSchoolFields defaultRole={user.role} defaultSchoolId={user.schoolId ?? ""} schools={schools} idPrefix={user.id} />
      <button
        disabled={pending}
        className="bg-brand hover:bg-brand-dim disabled:opacity-50 transition-colors rounded-lg px-4 py-2 text-sm font-medium"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

function ActiveToggle({ user }: { user: UserRow }) {
  const [state, formAction, pending] = useActionState(setUserActiveAction, initial);
  return (
    <div>
      <form action={formAction} className="inline">
        <input type="hidden" name="userId" value={user.id} />
        <input type="hidden" name="makeActive" value={user.isActive ? "false" : "true"} />
        <button
          disabled={pending}
          className={`text-xs rounded-full px-2.5 py-1 border transition-colors disabled:opacity-50 ${
            user.isActive
              ? "border-red-900 text-red-400 hover:bg-red-950/40"
              : "border-emerald-900 text-emerald-400 hover:bg-emerald-950/40"
          }`}
        >
          {pending ? "…" : user.isActive ? "Deactivate" : "Reactivate"}
        </button>
      </form>
      {state.errors.length > 0 && (
        <p className="text-xs text-red-400 mt-1 max-w-[220px]">{state.errors[0]}</p>
      )}
    </div>
  );
}

export default function UsersManager({
  users,
  schools,
}: {
  users: UserRow[];
  schools: SchoolOption[];
}) {
  const [editing, setEditing] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      <div className="border border-line bg-surface rounded-xl overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-ink-faint border-b border-line bg-surface-2">
              <th className="py-3 px-5 font-medium">Name</th>
              <th className="py-3 px-5 font-medium">Email</th>
              <th className="py-3 px-5 font-medium">Role</th>
              <th className="py-3 px-5 font-medium">School</th>
              <th className="py-3 px-5 font-medium">Last login</th>
              <th className="py-3 px-5 font-medium">Status</th>
              <th className="py-3 px-5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <Fragment key={u.id}>
                <tr
                  className={`border-b border-line last:border-0 hover:bg-surface-2/50 transition-colors ${
                    !u.isActive ? "opacity-50" : ""
                  }`}
                >
                  <td className="py-3 px-5 font-medium">{u.name}</td>
                  <td className="py-3 px-5 text-ink-faint">{u.email}</td>
                  <td className="py-3 px-5">
                    <span className="text-xs bg-surface-2 border border-line rounded-full px-2 py-0.5 text-ink-faint">
                      {u.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-ink-faint">{u.schoolName ?? "—"}</td>
                  <td className="py-3 px-5 text-ink-faint text-xs">{u.lastLogin}</td>
                  <td className="py-3 px-5">
                    <span className={`text-xs ${u.isActive ? "text-emerald-400" : "text-red-400"}`}>
                      {u.isActive ? "Active" : "Deactivated"}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right space-x-3 whitespace-nowrap">
                    <button
                      onClick={() => setEditing(editing === u.id ? null : u.id)}
                      className="text-xs text-brand hover:underline"
                    >
                      {editing === u.id ? "Close" : "Edit"}
                    </button>
                    <ActiveToggle user={u} />
                  </td>
                </tr>
                {editing === u.id && (
                  <tr>
                    <td colSpan={7} className="p-0">
                      <EditUserForm user={u} schools={schools} />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <CreateUserForm schools={schools} />
    </div>
  );
}
