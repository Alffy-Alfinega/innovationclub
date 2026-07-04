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
