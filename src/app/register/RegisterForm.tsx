"use client";

import { useActionState, useState } from "react";
import { registerAction, type RegisterState } from "./actions";

const CLASSES = ["Form 1", "Form 2", "Form 3", "Form 5"];
const STREAMS: Record<string, string[]> = {
  "Form 1": ["North", "South", "East", "West"],
  "Form 2": ["North", "South", "East", "West"],
  "Form 3": ["North", "South", "East", "West"],
  "Form 5": ["Arts", "Sciences"],
};
const STATUSES = ["Day scholar", "Boarding scholar"];
const TERMS = ["Term 1", "Term 2", "Term 3"];

const initialState: RegisterState = { errors: [] };

const fieldClasses =
  "w-full mt-1.5 rounded-md bg-surface-2 border border-line px-3 py-2.5 text-sm text-ink focus:border-brand outline-none transition-colors";
const labelClasses = "font-[family-name:var(--font-mono)] text-xs text-ink-faint uppercase tracking-wider";

type SchoolOption = { id: string; name: string };

export default function RegisterForm({ schools }: { schools: SchoolOption[] }) {
  const [state, formAction, pending] = useActionState(registerAction, initialState);
  const [selectedClass, setSelectedClass] = useState("");

  return (
    <form action={formAction} className="max-w-3xl mx-auto space-y-10">
      <div>
        <p className={labelClasses}>Register</p>
        <h1 className="font-[family-name:var(--font-display)] font-extrabold text-4xl sm:text-5xl mt-2">
          Join Innovation Club.
          <br />
          <span className="text-brand">A few steps away.</span>
        </h1>
        <p className="text-ink-faint mt-4">Fill in the details below to register. We&apos;ll follow up within 48 hours.</p>
      </div>

      {state.errors.length > 0 && (
        <ul className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-4 py-3 space-y-1">
          {state.errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      {/* Full name */}
      <fieldset className="space-y-4">
        <legend className={labelClasses}>Full name</legend>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm text-ink-muted" htmlFor="firstName">First name *</label>
            <input id="firstName" name="firstName" required minLength={2} placeholder="e.g. Nakato" className={fieldClasses} />
          </div>
          <div>
            <label className="text-sm text-ink-muted" htmlFor="middleName">Middle name</label>
            <input id="middleName" name="middleName" placeholder="e.g. Grace" className={fieldClasses} />
          </div>
          <div>
            <label className="text-sm text-ink-muted" htmlFor="lastName">Last name *</label>
            <input id="lastName" name="lastName" required minLength={2} placeholder="e.g. Brenda" className={fieldClasses} />
          </div>
          <div>
            <label className="text-sm text-ink-muted" htmlFor="otherName">Other name</label>
            <input id="otherName" name="otherName" placeholder="e.g. Nickname" className={fieldClasses} />
          </div>
        </div>
      </fieldset>

      {/* Gender / Class */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm text-ink-muted" htmlFor="gender">Gender</label>
          <select id="gender" name="gender" className={fieldClasses}>
            <option value="">Select gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-ink-muted" htmlFor="className">Class *</label>
          <select
            id="className"
            name="className"
            required
            className={fieldClasses}
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select class</option>
            {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Stream / Status */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm text-ink-muted" htmlFor="stream">Stream</label>
          <select id="stream" name="stream" className={fieldClasses} disabled={!selectedClass}>
            <option value="">Select stream</option>
            {(STREAMS[selectedClass] || []).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-ink-muted" htmlFor="status">Status</label>
          <select id="status" name="status" className={fieldClasses}>
            <option value="">Select status</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Term / School */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm text-ink-muted" htmlFor="termJoined">Term joined</label>
          <select id="termJoined" name="termJoined" className={fieldClasses}>
            <option value="">Select term</option>
            {TERMS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-ink-muted" htmlFor="school">School *</label>
          <input
            id="school"
            name="school"
            required
            minLength={3}
            placeholder="e.g. Makindye Secondary School"
            list="school-suggestions"
            autoComplete="off"
            className={fieldClasses}
          />
          <datalist id="school-suggestions">
            {schools.map((s) => (
              <option key={s.id} value={s.name} />
            ))}
          </datalist>
          <p className="text-xs text-ink-faint mt-1.5">
            Type your school&apos;s name. Start typing to see existing schools, or enter a new one if yours isn&apos;t listed yet.
          </p>
        </div>
      </div>

      {/* Contact */}
      <fieldset className="space-y-4">
        <legend className={labelClasses}>Contact information</legend>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm text-ink-muted" htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="e.g. brenda@example.com" className={fieldClasses} />
          </div>
          <div>
            <label className="text-sm text-ink-muted" htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" placeholder="e.g. +256 7XX XXX XXX" className={fieldClasses} />
          </div>
        </div>
      </fieldset>

      {/* Clubs */}
      <fieldset className="space-y-3">
        <legend className={labelClasses}>Clubs &amp; programs</legend>
        <div className="flex flex-wrap gap-6 text-sm text-ink-muted">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="innovationClub" className="accent-blue-600" /> Innovation Club
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="aiClub" className="accent-blue-600" /> AI Club
          </label>
        </div>
      </fieldset>

      <label className="flex items-start gap-3 text-sm text-ink-muted">
        <input type="checkbox" name="agree" required className="mt-1 accent-blue-600" />
        I confirm the information above is accurate and agree to the{" "}
        <a href="/terms" className="text-brand hover:underline">terms of participation</a>.
      </label>

      <button
        disabled={pending}
        type="submit"
        className="w-full bg-brand hover:bg-brand-dim disabled:opacity-50 transition-colors rounded-lg py-3 text-sm font-medium"
      >
        {pending ? "Submitting…" : "Submit Registration →"}
      </button>
    </form>
  );
}
