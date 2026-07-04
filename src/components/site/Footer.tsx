import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo-nav.png" alt="Alffy (Alfinega) logo" width={32} height={32} />
            <span className="font-[family-name:var(--font-display)] font-bold">
              Innovation <span className="text-ink-faint font-medium text-sm">Club</span>
            </span>
          </Link>
          <p className="text-sm text-ink-faint max-w-xs">
            An Alffy (Alfinega) initiative — empowering Ugandan secondary school students through
            innovation and technology.
          </p>
          <div className="text-sm text-ink-faint space-y-1 font-[family-name:var(--font-mono)] text-[13px]">
            <p><a href="mailto:innovation@alfinega.com" className="hover:text-ink">innovation@alfinega.com</a></p>
            <p><a href="tel:+256747113059" className="hover:text-ink">+256 747 113 059</a></p>
            <p>Makindye, Kampala, Uganda</p>
          </div>
        </div>
        <div className="text-sm space-y-2">
          <p className="text-ink-faint font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider mb-3">Quick links</p>
          <p><Link href="/#programme" className="text-ink-muted hover:text-ink">The Programme</Link></p>
          <p><Link href="/projects" className="text-ink-muted hover:text-ink">Projects</Link></p>
          <p><Link href="/makss/zayed/soilSkeleton" className="text-ink-muted hover:text-ink">Vascular Earth Initiative</Link></p>
          <p><Link href="/register" className="text-ink-muted hover:text-ink">Register</Link></p>
          <p><Link href="/login" className="text-ink-muted hover:text-ink">Member sign in</Link></p>
        </div>
        <div className="text-sm space-y-2">
          <p className="text-ink-faint font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider mb-3">Alffy (Alfinega)</p>
          <p><a href="https://alffy.alfinega.com" className="text-ink-muted hover:text-ink">Main agency site</a></p>
          <p><a href="https://alffy.alfinega.com/about" className="text-ink-muted hover:text-ink">About</a></p>
          <p><a href="https://alffy.alfinega.com/contact" className="text-ink-muted hover:text-ink">Contact</a></p>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="max-w-6xl mx-auto px-6 py-5 text-xs text-ink-faint">
          © 2026 Alffy (Alfinega). Est. 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
