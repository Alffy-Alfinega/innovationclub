import Link from 'next/link';

const footerLinks = {
  Programs: [
    { href: '/programs', label: 'Innovation Bootcamp' },
    { href: '/programs', label: 'Hackathons' },
    { href: '/programs', label: 'Mentorship' },
    { href: '/programs', label: 'Maker Space' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/about', label: 'Our Story' },
    { href: '/events', label: 'Events' },
    { href: '/join', label: 'Join' },
  ],
  Connect: [
    { href: 'https://alffy.alfinega.com', label: 'Alffy (Alfinega)' },
    { href: 'mailto:hello@innovationclub.africa', label: 'Email Us' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#1C1C34] py-16 px-6 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2C6FED] to-[#1A52C4] flex items-center justify-center">
                <span className="font-syne font-bold text-xs text-white">IC</span>
              </div>
              <span className="font-syne font-semibold text-sm text-white">
                Innovation Club
              </span>
            </div>
            <p className="font-outfit text-sm text-[#8A8AAA] leading-relaxed max-w-[260px]">
              A youth innovation hub by{' '}
              <Link href="https://alffy.alfinega.com" className="text-[#2C6FED] hover:underline">
                Alffy (Alfinega)
              </Link>
              . Empowering young innovators in Uganda and across Africa.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-syne font-semibold text-xs text-white tracking-widest uppercase mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-outfit text-sm text-[#8A8AAA] hover:text-[#2C6FED] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#1C1C34] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-outfit text-xs text-[#666666]">
            &copy; {new Date().getFullYear()} Innovation Club by{' '}
            <Link
              href="https://alffy.alfinega.com"
              className="text-[#666666] hover:text-[#2C6FED] transition-colors"
            >
              Alffy (Alfinega)
            </Link>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/join" className="font-outfit text-xs text-[#666666] hover:text-[#2C6FED] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/join" className="font-outfit text-xs text-[#666666] hover:text-[#2C6FED] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
