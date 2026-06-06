# Design System

References: [[alffy.alfinega.com]]

## Color palette

### CSS custom properties (design tokens)

```css
--bg           : #04040C    /* Page/section background */
--text         : #FFFFFF    /* Primary text (near-white) */
--text-muted   : #9A9ABB   /* Secondary text */
--text-dimmer  : #8A8AAA   /* Tertiary text */
--text-faint   : #666666   /* Captions / lowest emphasis */
--border       : #1C1C34   /* Card borders, dividers */
--surface      :            /* Card surface (slightly lighter than --bg) */
```

### Brand colors

| Token | Hex | Usage |
|---|---|---|
| Primary | `#2C6FED` | Links, headings highlights, buttons, icons, focus ring |
| Primary dark | `#1A52C4` | Gradient pair with primary |
| Secondary | `#D4A843` | Star ratings, gold-accented cards, highlights |
| Background | `#04040C` | Page body, hero |

### Opacity variants

| Value | Usage |
|---|---|
| `rgba(44,111,237,0.08)` | Subtle card glow |
| `rgba(44,111,237,0.12)` | Hero section radial glow |
| `rgba(44,111,237,0.25)` | Button glow box-shadow |
| `#2C6FED0D` (5%) | Badge/tag backgrounds |
| `#2C6FED30` (19%) | Badge/tag borders |

### Gradients

- Primary button: `linear-gradient(135deg, #2C6FED, #1A52C4)`
- Blue card bg: `linear-gradient(135deg, #0D1E3D, #0A1628)`
- Gold card bg: `linear-gradient(135deg, #2A1E08, #1C1408)`

## Typography

| Font | Weights | Used for |
|---|---|---|
| **Syne** | 400, 600, 700, 800 | Headings, buttons, navigation |
| **Outfit** | 300, 400, 500, 600 | Body text, paragraphs |
| **JetBrains Mono** | 400, 500 | Tags, technical labels, code |

Font loading: via `next/font` or Google Fonts import.

### Fluid type scale (clamp)

```css
/* Hero heading */   clamp(2.5rem, 7vw, 5.5rem)
/* Section title */  clamp(2.5rem, 5vw, 5rem)
/* Sub-heading */    clamp(2.2rem, 4.5vw, 4rem)
/* Small heading */  clamp(2rem, 5vw, 3.5rem)
```

### Letter spacing

- `-0.03em` — Hero headings
- `-0.02em` — Section headings
- `0.12em` — Mono/tag text
- `0.05em` — Badge text

## Spacing

- Container: `max-w-[1440px] mx-auto`
- Section padding: `py-20 md:py-32 px-6 md:px-16`
- Card padding: `p-7`
- Gap scale: Tailwind defaults (1 = 0.25rem)

## Border radius

| Class | Value | Usage |
|---|---|---|
| `rounded-md` | 6px | Small elements |
| `rounded-xl` | 12px | Medium containers |
| `rounded-2xl` | 16px | Cards |
| `rounded-3xl` | 24px | Large containers |
| `rounded-full` | 9999px | Buttons, avatars, pills |

## Components

### Buttons

| Variant | Style |
|---|---|
| Primary solid | `px-8 py-4 font-syne font-semibold text-sm text-white rounded-full bg-[#2C6FED]` (or gradient) |
| Secondary outline | `px-8 py-4 font-syne font-semibold text-sm border border-[#1C1C34] text-[#ccc] rounded-full` hover → `border-[#2C6FED] text-[#2C6FED]` |

### Cards

- Base: `p-7 border rounded-2xl`
- Service cards: gradient background + top border fade
- Testimonial cards: `shrink-0 w-[340px] md:w-[400px]`

### Badges / tags

```css
/* Blue tag */
border border-[#2C6FED30] text-[#2C6FED] bg-[#2C6FED0D]

/* Gold tag */
border border-[#D4A84330] text-[#D4A843] bg-[#D4A8430D]
```
