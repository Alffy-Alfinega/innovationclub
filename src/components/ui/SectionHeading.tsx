interface SectionHeadingProps {
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}

export default function SectionHeading({ tag, title, highlight, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16">
      {tag && (
        <span className="inline-block font-mono text-[11px] text-[#2C6FED] tracking-[0.12em] uppercase mb-4 border border-[#2C6FED30] bg-[#2C6FED0D] px-3 py-1 rounded-full">
          {tag}
        </span>
      )}
      <h2 className="font-syne font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.9] tracking-[-0.02em]">
        {title}
        {highlight && (
          <span className="text-[#2C6FED] block mt-2">{highlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 font-outfit text-base md:text-lg text-[#9A9ABB] max-w-[600px] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
