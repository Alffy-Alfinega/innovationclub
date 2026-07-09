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

## Curriculum restructure (2026-07-08, synced from "Curriculum reorganization
## by trimester" chat — this is now the authoritative structure, supersedes
## the original 6-theme list used at initial platform build)
1. Computer Fundamentals & Web Foundations (merged) — hardware/OS, office
   automation, HTML/CSS, GitHub Pages deploy
2. Web App Development & Databases — JS, DOM, databases, Git/software
   engineering principles
3. Desktop App Development & Python — Python, Tkinter GUI, files/data,
   debugging/testing/documentation
4. Mobile App Development & Flutter — Dart, Flutter, multi-screen nav,
   real-device deployment
5. Computing Fundamentals to Advanced (NEW) — OS administration, hardware
   maintenance, Linux, networking, security/troubleshooting
6. AI & Business Communication — AI tools/APIs, prompt engineering,
   entrepreneurship, business writing, pitching (capstone + demo day)

**Open strategic flag, NOT resolved, deliberately left honest in copy**:
T5's real-life project (assemble/configure/network machines) is hard to
make visually compelling for non-technical funders/parents compared to
an app demo. Flagged to Nashif; he may want a GUI front-end (e.g. network
monitoring dashboard) bolted on later. Public copy should not oversell
this trimester's demo-ability until that's actually decided.

## Verification pass on the curriculum sync (2026-07-08)
User caught me before shipping — asked to verify all 6 trimesters against
the actual pasted source rather than trust the first transcription. Found
real issues on review:
- T4 had a genuine redundancy (layouts mentioned twice via a merged bullet
  + a leftover separate bullet) — fixed.
- T3 and T6 had bullets silently compressed from 2 source items into 1 —
  restored to match source exactly.
- T2 and T5 were exact 1:1 matches, no changes needed.
- T1 carries 3 items NOT in this specific paste (file-paths-as-repository-
  discipline, Git basics, PowerPoint) — these come from earlier confirmed
  decisions in other project chats (PowerPoint explicitly added to T1 in
  "Parent document preparation"), not fabricated, but flagged to the user
  rather than silently kept — his call whether they stay.

## In-dashboard Lessons (2026-07-09)
Real bug fixed: sidebar "Lessons" pointed at the PUBLIC /lessons page,
which swapped the entire dashboard shell (Navbar/Footer, no sidebar) —
felt like getting bounced out of the app on every click.

Studied a reference platform's screenshots (interschoolscoding.com,
"IISCC Dashboard") for the fix pattern, not its gamification features
(leaderboard/practice were already explicitly declined earlier) —
specifically their expandable "Lessons ⌄" sidebar group with nested
sub-items. Built the equivalent: src/lib/curriculum.ts is now the single
source of truth for the CURRICULUM array (previously only lived inside
the public page — extracted to prevent the public and in-dashboard
versions from silently drifting apart, the same failure class fixed
several times already today). Sidebar's Lessons row navigates to
/dashboard/lessons; a separate chevron toggles a sub-list of all 6
trimesters as quick-jump anchor links. The dashboard page itself is an
accordion (one trimester open at a time, real topic data, no fabricated
progress bars/completion percentages — that data doesn't exist and
wasn't invented to match the reference app's look).

Also independently confirmed by the reference platform: "Patron" is
genuinely standard terminology for a club-supervising role, not just
Nashif's or Claude's invention — same word, same concept, different app.
