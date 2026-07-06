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
} from "lucide-react";

const ROLE_ICON: Record<string, React.ElementType> = {
  SUPER_ADMIN: Building2,
  SCHOOL_ADMIN: GraduationCap,
  MENTOR: Users,
  PARENT: UserCircle,
  BREAK_GLASS: ShieldAlert,
};

const LINK_ICON: Record<string, React.ElementType> = {
  "/dashboard/super": Building2,
  "/dashboard/super/users": UserCog,
  "/dashboard/school": GraduationCap,
  "/dashboard/mentor": Users,
  "/dashboard/parent": UserCircle,
};

export type NavLink = { href: string; label: string };

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

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map((link) => {
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

      <div className="px-3 py-4 border-t border-line space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-faint hover:text-ink hover:bg-surface-2 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to site
        </Link>
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
