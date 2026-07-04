"use client";

import { useEffect } from "react";

// Catches unexpected render/server errors anywhere under the root layout
// and shows a brand-styled message instead of the browser's raw crash page
// — the exact failure that hit 51 real registrants on 2026-07-04 (Prisma
// P2021, "table does not exist", surfaced as a generic browser error page).
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-4">
      <h1 className="font-[family-name:var(--font-display)] font-bold text-2xl">
        Something went wrong.
      </h1>
      <p className="text-ink-faint text-sm max-w-md">
        This isn&apos;t you — our systems hit a snag. Nothing you entered was lost.
      </p>
      <button
        onClick={reset}
        className="bg-brand hover:bg-brand-dim transition-colors px-5 py-2.5 rounded-lg text-sm font-medium mt-2"
      >
        Try again
      </button>
      {error.digest && (
        <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint mt-2">
          Reference: {error.digest}
        </p>
      )}
    </div>
  );
}
