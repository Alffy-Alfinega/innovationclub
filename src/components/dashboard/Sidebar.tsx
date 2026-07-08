"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Building2,
  UserCog,
  GraduationCap,
  Users,
  UserCircle,
  LogOut,
  Menu,
  X,
  ArrowLeft,
  ShieldAlert,
  Image as ImageIcon,
  Activity,
  BookOpen,
  CircleUserRound,
} from "lucide-react";

const ROLE_ICON: Record<string, React.ElementType> = {
  ADMIN: Building2,
  SYSTEM_OPERATOR: GraduationCap,
  PATRON: Users,
  STUDENT: UserCircle,
  BREAK_GLASS: ShieldAlert,
};

const LINK_ICON: Record<string, React.ElementType> = {
  "/dashboard/admin": Building2,
  "/dashboard/admin/users": UserCog,
  "/dashboard/admin/gallery": ImageIcon,
  "/dashboard/admin/activity": Activity,
  "/dashboard/operator": GraduationCap,
  "/dashboard/patron": Users,
  "/dashboard/student": UserCircle,
  "/dashboard/account": CircleUserRound,
  "/lessons": BookOpen,
  "/": ArrowLeft,
};

export type NavLink = { href: string; label: string };

// Shared across every role — appended after the role-specific links so
// the whole thing reads as one continuous nav, not a role section plus a
// separate fixed block. Only Sign Out stays pinned to the bottom.
const SHARED_LINKS: NavLink[] = [
  { href: "/dashboard/account", label: "Account" },
  { href: "/lessons", label: "Lessons" },
  { href: "/", label: "Back to site" },
];

export default function Sidebar({
  role,
  userName,
  navLinks,
  signOutAction,
}: {
  role: string;
  userName: string;
  navLinks: NavLink[];
  signOutAction: () => Promise<void>;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const RoleIcon = ROLE_ICON[role] ?? Users;
  const allLinks = [...navLinks, ...SHARED_LINKS];

  const content = (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-line">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-display)] font-bold text-sm">
            Innovation <span className="text-ink-faint font-medium">Club</span>
          </span>
        </Link>
      </div>

      <div className="px-5 py-4 border-b border-line flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-brand/15 border border-brand/30 text-brand flex items-center justify-center shrink-0">
          <RoleIcon size={16} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{userName}</p>
          <p className="text-xs text-ink-faint">{role.replace("_", " ")}</p>
        </div>
      </div>

      {/* One continuous nav: role-specific links, then Account/Lessons/
          Back to site. No visual break between them — this IS the "align
          the navigation" fix. */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {allLinks.map((link) => {
          const active = pathname === link.href;
          const LinkIcon = LINK_ICON[link.href] ?? RoleIcon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-brand/10 text-brand border border-brand/20"
                  : "text-ink-faint hover:text-ink hover:bg-surface-2"
              }`}
            >
              <LinkIcon size={16} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Only Sign Out lives here now — everything else moved up top. */}
      <div className="px-3 py-4 border-t border-line">
        <form action={signOutAction}>
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-faint hover:text-ink hover:bg-surface-2 transition-colors">
            <LogOut size={16} />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur flex items-center justify-between px-4 py-3">
        <span className="font-[family-name:var(--font-display)] font-bold text-sm">Innovation Club</span>
        <button onClick={() => setMobileOpen(true)} className="text-ink-faint" aria-label="Open menu">
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-72 bg-bg border-r border-line h-full">
            <div className="flex justify-end px-3 pt-3">
              <button onClick={() => setMobileOpen(false)} className="text-ink-faint" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            {content}
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-line h-screen sticky top-0">
        {content}
      </aside>
    </>
  );
}
