interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'gold';
}

const variants = {
  blue: 'border-[#2C6FED30] text-[#2C6FED] bg-[#2C6FED0D]',
  gold: 'border-[#D4A84330] text-[#D4A843] bg-[#D4A8430D]',
};

export default function Badge({ children, variant = 'blue' }: BadgeProps) {
  return (
    <span
      className={`inline-block font-mono text-[10px] tracking-[0.05em] uppercase px-3 py-1 rounded-full border ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
