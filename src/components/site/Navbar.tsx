import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo-nav.png" alt="Alffy (Alfinega) logo" width={34} height={34} />
          <span className="font-[family-name:var(--font-display)] font-bold">
            Innovation <span className="text-ink-faint font-medium text-sm">Club</span>
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/#programme" className="text-ink-faint hover:text-ink transition-colors hidden sm:block">
            Programme
          </Link>
          <Link href="/projects" className="text-ink-faint hover:text-ink transition-colors hidden sm:block">
            Projects
          </Link>
          <Link href="/login" className="text-ink-faint hover:text-ink transition-colors">
            Sign in
          </Link>
          <Link
            href="/register"
            className="bg-brand hover:bg-brand-dim transition-colors px-4 py-2 rounded-lg font-medium"
          >
            Register →
          </Link>
        </div>
      </div>
    </nav>
  );
}
