export default function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="border border-line bg-surface rounded-xl p-5">
      <p
        className={`font-[family-name:var(--font-display)] font-bold text-3xl ${
          accent ? "text-brand" : "text-ink"
        }`}
      >
        {value}
      </p>
      <p className="text-xs text-ink-faint mt-1.5">{label}</p>
    </div>
  );
}
