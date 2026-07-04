import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center  px-4">
      <form
        action={loginAction}
        className="w-full max-w-sm bg-surface border border-line rounded-xl p-8 space-y-5"
      >
        <div>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-xl">Innovation Club</h1>
          <p className="text-sm text-ink-faint mt-1">Sign in to your dashboard</p>
        </div>

        {params.error && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-3 py-2">
            Incorrect email or password.
          </p>
        )}

        <input type="hidden" name="callbackUrl" value={params.callbackUrl || "/dashboard"} />

        <div className="space-y-1">
          <label className="text-sm text-ink-muted" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md bg-surface-2 border border-line px-3 py-2 text-ink text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-ink-muted" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-md bg-surface-2 border border-line px-3 py-2 text-ink text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-brand hover:bg-brand-dim transition-colors text-ink text-sm font-medium py-2"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
