import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <form
        action={loginAction}
        className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-xl p-8 space-y-5"
      >
        <div>
          <h1 className="text-xl font-semibold text-white">Innovation Club</h1>
          <p className="text-sm text-neutral-400 mt-1">Sign in to your dashboard</p>
        </div>

        {params.error && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-3 py-2">
            Incorrect email or password.
          </p>
        )}

        <input type="hidden" name="callbackUrl" value={params.callbackUrl || "/dashboard"} />

        <div className="space-y-1">
          <label className="text-sm text-neutral-300" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-white text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-neutral-300" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-white text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium py-2"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
