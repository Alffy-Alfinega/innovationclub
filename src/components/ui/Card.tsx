interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'blue' | 'gold';
}

const variantStyles = {
  default: 'bg-[#0A0A1A]',
  blue: 'bg-gradient-to-br from-[#0D1E3D] to-[#0A1628]',
  gold: 'bg-gradient-to-br from-[#2A1E08] to-[#1C1408]',
};

export default function Card({ children, className = '', variant = 'default' }: CardProps) {
  return (
    <div
      className={`p-7 border border-[#1C1C34] rounded-2xl ${variantStyles[variant]} hover:border-[#2C6FED]/30 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
