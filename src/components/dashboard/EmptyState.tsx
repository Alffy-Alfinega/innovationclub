export default function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="border border-dashed border-line rounded-xl p-10 text-center">
      <p className="font-[family-name:var(--font-display)] font-bold">{title}</p>
      <p className="text-sm text-ink-faint mt-2 max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
