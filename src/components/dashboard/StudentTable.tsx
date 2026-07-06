"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  className: string;
  stream: string | null;
  status: "DAY_SCHOLAR" | "BOARDING_SCHOLAR" | null;
  innovationClub: boolean;
  aiClub: boolean;
};

export default function StudentTable({ students }: { students: Student[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return students;
    const q = query.toLowerCase();
    return students.filter(
      (s) =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
        s.className.toLowerCase().includes(q)
    );
  }, [students, query]);

  return (
    <div>
      <div className="relative mb-3">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or class…"
          className="w-full sm:w-72 pl-9 pr-3 py-2 rounded-lg bg-surface-2 border border-line text-sm focus:border-brand outline-none transition-colors"
        />
      </div>

      <div className="border border-line bg-surface rounded-xl overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-ink-faint border-b border-line bg-surface-2">
              <th className="py-3 px-5 font-medium">Name</th>
              <th className="py-3 px-5 font-medium">Class</th>
              <th className="py-3 px-5 font-medium">Stream</th>
              <th className="py-3 px-5 font-medium">Status</th>
              <th className="py-3 px-5 font-medium">Clubs</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 px-5 text-center text-ink-faint">
                  No students match &ldquo;{query}&rdquo;.
                </td>
              </tr>
            ) : (
              filtered.map((st) => (
                <tr key={st.id} className="border-b border-line last:border-0 hover:bg-surface-2/50 transition-colors">
                  <td className="py-3 px-5 font-medium">{st.firstName} {st.lastName}</td>
                  <td className="py-3 px-5">{st.className}</td>
                  <td className="py-3 px-5 text-ink-faint">{st.stream ?? "—"}</td>
                  <td className="py-3 px-5">
                    <span className="text-xs bg-surface-2 border border-line rounded-full px-2 py-0.5 text-ink-faint">
                      {st.status === "DAY_SCHOLAR" ? "Day" : st.status === "BOARDING_SCHOLAR" ? "Boarding" : "—"}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-ink-faint text-xs">
                    {[st.innovationClub && "Innovation", st.aiClub && "AI"].filter(Boolean).join(", ") || "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {query && (
        <p className="text-xs text-ink-faint mt-2">
          {filtered.length} of {students.length} students match
        </p>
      )}
    </div>
  );
}
