"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { CURRICULUM } from "@/lib/curriculum";

// In-dashboard curriculum view. Previously "Lessons" in the sidebar linked
// straight to the public marketing page — different chrome entirely
// (Navbar/Footer, no sidebar), which felt like getting bounced out of the
// app. This stays inside the dashboard shell and actually shows the
// topics, not just a link elsewhere.
export default function DashboardLessonsPage() {
  // Sidebar sub-links point at #t01, #t02, etc. Read the hash to compute
  // the correct initial open trimester directly in the lazy initializer —
  // not via useEffect+setState, which causes an extra render pass and
  // trips React 19's set-state-in-effect lint rule for what's really just
  // initial-state computation. SSR-safe: window is undefined server-side,
  // where this correctly falls back to "01".
  const [openTrimester, setOpenTrimester] = useState<string | null>(() => {
    if (typeof window === "undefined") return "01";
    const hash = window.location.hash.replace("#t", "");
    return CURRICULUM.some((tri) => tri.n === hash) ? hash : "01";
  });

  // Scrolling to the element IS a genuine side effect (DOM manipulation
  // after mount), unlike the state computation above.
  useEffect(() => {
    if (openTrimester) {
      document.getElementById(`t${openTrimester}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Lessons"
        title="Curriculum, trimester by trimester."
        subtitle="The full topic breakdown for all six trimesters — the same content as the public curriculum page, without leaving the dashboard."
      />

      <div className="space-y-3 max-w-3xl">
        {CURRICULUM.map((tri) => {
          const isOpen = openTrimester === tri.n;
          return (
            <div key={tri.n} id={`t${tri.n}`} className="border border-line bg-surface rounded-xl overflow-hidden scroll-mt-6">
              <button
                onClick={() => setOpenTrimester(isOpen ? null : tri.n)}
                className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-surface-2/50 transition-colors"
              >
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="font-[family-name:var(--font-mono)] text-brand text-sm shrink-0">{tri.n}</span>
                  <h2 className="font-[family-name:var(--font-display)] font-bold truncate">{tri.title}</h2>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-ink-faint shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <ul className="px-5 pb-5 space-y-2">
                  {tri.topics.map((topic) => (
                    <li key={topic} className="text-sm text-ink-faint leading-relaxed flex gap-2.5">
                      <span className="text-brand shrink-0">·</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
