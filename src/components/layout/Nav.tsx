'use client';

import { useState } from 'react';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/events', label: 'Events' },
  { href: '/join', label: 'Join' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center px-6 md:px-16 bg-[#04040C]/80 backdrop-blur-md border-b border-[#1C1C34]">
      <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2C6FED] to-[#1A52C4] flex items-center justify-center">
            <span className="font-syne font-bold text-xs text-white">IC</span>
          </div>
          <span className="font-syne font-semibold text-sm text-white hidden sm:block">
            Innovation Club
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-outfit text-[#9A9ABB] hover:text-white hover:bg-white/5 rounded-md transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/join"
            className="ml-4 px-5 py-2 font-syne font-semibold text-xs text-white rounded-full bg-gradient-to-r from-[#2C6FED] to-[#1A52C4] hover:opacity-90 transition-opacity tracking-widest uppercase"
          >
            Join Free
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label="Toggle navigation"
        >
          <span className={`block w-5 h-[1.5px] bg-[#9A9ABB] transition-transform ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#9A9ABB] transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#9A9ABB] transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-[68px] left-0 right-0 bg-[#04040C]/95 backdrop-blur-md border-b border-[#1C1C34] md:hidden">
          <div className="flex flex-col p-6 gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-outfit text-[#9A9ABB] hover:text-white hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-5 py-3 font-syne font-semibold text-xs text-white rounded-full bg-gradient-to-r from-[#2C6FED] to-[#1A52C4] text-center tracking-widest uppercase"
            >
              Join Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
