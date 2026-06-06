import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'px-8 py-4 font-syne font-semibold text-sm text-white rounded-full bg-gradient-to-r from-[#2C6FED] to-[#1A52C4] hover:opacity-90 transition-opacity',
  secondary:
    'px-8 py-4 font-syne font-semibold text-sm border border-[#1C1C34] text-[#CCCCCC] rounded-full hover:border-[#2C6FED] hover:text-[#2C6FED] transition-colors',
  ghost:
    'px-4 py-2 font-outfit text-sm text-[#9A9ABB] hover:text-white hover:bg-white/5 rounded-md transition-colors',
};

export default function Button({ href, children, variant = 'primary', className = '' }: ButtonProps) {
  return (
    <Link href={href} className={`inline-block ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
