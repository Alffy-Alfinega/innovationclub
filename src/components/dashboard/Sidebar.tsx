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
  ChevronDown,
} from "lucide-react";
import { CURRICULUM } from "@/lib/curriculum";

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
  "/": ArrowLeft,
};

export type NavLink = { href: string; label: string };

// Shared across every role — appended after the role-specific links so
// the whole thing reads as one continuous nav. Only Sign Out stays
// pinned to the bottom. "Lessons" is handled separately below (it's an
// expandable group, not a flat link) — it used to point at the PUBLIC
// /lessons page, which swapped out the whole dashboard chrome for the
// marketing site's Navbar/Footer. Now it stays in-app.
const SHARED_LINKS: NavLink[] = [
  { href: "/dashboard/account", label: "Account" },
  { href: "/", label: "Back to site" },
];

function NavLinkItem({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
        active
          ? "bg-brand/10 text-brand border border-brand/20"
          : "text-ink-faint hover:text-ink hover:bg-surface-2"
      }`}
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}

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
  const onLessonsPage = pathname === "/dashboard/lessons";
  const [lessonsOpen, setLessonsOpen] = useState(onLessonsPage);
  const RoleIcon = ROLE_ICON[role] ?? Users;
  const close = () => setMobileOpen(false);

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

      {/* One continuous nav: role-specific links, Lessons (expandable),
          then Account/Back to site. No visual break between sections —
          this is the "align the navigation" layout from before. */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navLinks.map((link) => (
          <NavLinkItem
            key={link.href}
            href={link.href}
            label={link.label}
            icon={LINK_ICON[link.href] ?? RoleIcon}
            active={pathname === link.href}
            onClick={close}
          />
        ))}

        {/* Lessons — expandable group, borrowed from a reference platform's
            nested-sidebar pattern rather than a flat link. The row itself
            navigates to the in-dashboard overview; the chevron only
            toggles the trimester sub-list, independent of navigation. */}
        <div>
          <div
            className={`flex items-center gap-1 rounded-lg text-sm transition-colors ${
              onLessonsPage
                ? "bg-brand/10 text-brand border border-brand/20"
                : "text-ink-faint hover:text-ink hover:bg-surface-2"
            }`}
          >
            <Link href="/dashboard/lessons" onClick={close} className="flex-1 flex items-center gap-2.5 px-3 py-2 min-w-0">
              <BookOpen size={16} />
              Lessons
            </Link>
            <button
              onClick={() => setLessonsOpen(!lessonsOpen)}
              className="px-2 py-2 shrink-0"
              aria-label={lessonsOpen ? "Collapse trimesters" : "Expand trimesters"}
            >
              <ChevronDown size={14} className={`transition-transform ${lessonsOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
          {lessonsOpen && (
            <div className="mt-1 ml-4 pl-3 border-l border-line space-y-0.5">
              {CURRICULUM.map((tri) => (
                <Link
                  key={tri.n}
                  href={`/dashboard/lessons#t${tri.n}`}
                  onClick={close}
                  className="block px-3 py-1.5 rounded-md text-xs text-ink-faint hover:text-ink hover:bg-surface-2 transition-colors truncate"
                >
                  T{tri.n} — {tri.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {SHARED_LINKS.map((link) => (
          <NavLinkItem
            key={link.href}
            href={link.href}
            label={link.label}
            icon={LINK_ICON[link.href] ?? RoleIcon}
            active={pathname === link.href}
            onClick={close}
          />
        ))}
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
