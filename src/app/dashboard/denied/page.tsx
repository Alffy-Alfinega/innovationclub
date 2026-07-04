export default function DeniedPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-2">
      <h1 className="text-xl font-semibold">You don&apos;t have access to this page</h1>
      <p className="text-ink-faint text-sm">If you think this is a mistake, contact your school admin.</p>
    </div>
  );
}
