export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <p className="font-[family-name:var(--font-mono)] text-xs text-ink-faint uppercase tracking-wider">
        {eyebrow}
      </p>
      <h1 className="font-[family-name:var(--font-display)] font-bold text-2xl sm:text-3xl mt-1.5">
        {title}
      </h1>
      {subtitle && <p className="text-sm text-ink-faint mt-2 max-w-xl">{subtitle}</p>}
    </div>
  );
}
