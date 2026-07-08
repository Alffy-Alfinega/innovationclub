# Design System — inherited from parent brand (alffy.alfinega.com)

Verified against the live parent site + tokens recovered from old site CSS
(git 3f8228a). The club site is a child brand: same DNA, education-flavored.

## Tokens
| Token | Value | Use |
|---|---|---|
| --bg | #04040C | page background (matches parent theme-color) |
| --surface | #0A0A16 | cards |
| --surface-2 | #10101E | raised cards |
| --border | #1C1C34 | card/dividers |
| --text | #E4E4F0 | body |
| --text-faint | #8A8AAA | captions |
| --blue | #2C6FED | primary accent, CTAs, ::selection |
| --gold | #D4A843 | prize/award accents ONLY (scarcity = meaning) |

## Type
- Display: **Syne** (700/800) — split two-line headlines, second line blue
- Body: **Outfit** (300–600)
- Utility: **JetBrains Mono** — section eyebrows ("02 / The Problem"), stats, contact lines

## Structural language (from parent)
- Numbered section eyebrows `NN / Label` — legitimate here: curriculum &
  process ARE sequences
- ✦-separated scrolling marquee of program topics
- Stat counters row; numbered feature cards; process timeline
- Big split-headline CTA section before footer

## Signature
The 3D hero (react-babylonjs, mandated as core identity) — everything else
stays quiet and disciplined around it. Data-Saver fallback retained.

## Pages
- / — full marketing home (hero+3D, marquee, programme, why, fees, CTA)
- /makss/zayed/soilSkeleton — Vascular Earth restored VERBATIM from git
  3f8228a content (URL is in the official Zayed Prize application — never move it)
- /register, /login — brand-styled
- /dashboard/* — functional, token-aligned, NO 3D (bundle discipline)

## /projects (added 2026-07-04)
Index page for all club projects. Zayed = featured flagship card linking to
the contracted URL (/makss/zayed/soilSkeleton — NEVER moved). Honest-scope
rule: no fake portfolio padding; future slots framed as "ships at trimester
demo days," which is a real programme promise, not filler. Nav "Projects"
now points to /projects (previously deep-linked the Zayed page).

## Dashboard design system (added 2026-07-04)
Shared components in `src/components/dashboard/`: PageHeader (eyebrow +
title + optional subtitle), StatCard (large Syne numeral + faint label,
`accent` prop for the primary metric only — restraint, not every card is blue),
EmptyState (title + description + optional action, always points toward a
next step rather than just stating absence, per copy guidance: "an empty
screen is an invitation to act").

Stats are real Prisma aggregates, not decorative placeholders — school
counts, day/boarding scholar counts, club membership counts, per-role.
Club badges color-coded: Innovation = brand blue, AI = gold (the one place
outside prize/award content gold appears — deliberate, marks "special
program" status consistently with its use elsewhere).

No 3D anywhere in /dashboard — holds from the original architecture
decision. Signature restraint principle: only ONE stat per dashboard uses
the accent color (the headline metric), everything else stays quiet.

## Sidebar dashboard shell (added 2026-07-04)
Replaced the top-nav-only layout with a real two-column shell:
`src/components/dashboard/Sidebar.tsx` (client component — active-route
highlighting via usePathname, role avatar, per-link icons keyed by
destination not viewer role since BREAK_GLASS has 2 distinct links),
desktop fixed rail (w-64, sticky), mobile drawer with overlay + hamburger
toggle. `src/app/dashboard/layout.tsx` passes the sign-out server action
down as a prop (Next.js supports this — server actions are serializable).

Added StudentTable.tsx as a real feature, not just restyling: client-side
search/filter by name or class on the school dashboard's student list —
the one table that can realistically grow past a glance-able size.

Icons via lucide-react (added as a new dependency).

## Sidebar nav flattened (2026-07-08)
Per explicit request: no more visually-separate "shared" bottom block.
Role-specific links + Account/Lessons/Back-to-site now render as ONE
continuous nav list at the top; only Sign Out remains pinned to the
bottom (border-t, separate from the scrollable nav above). Profile
renamed to Account throughout — folder, route, page title, component —
avoiding a label/URL mismatch.
