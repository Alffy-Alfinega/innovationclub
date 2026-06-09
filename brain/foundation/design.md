# Design System

## Colors

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#04040C` | Page background |
| `--bg-nav` | `rgba(4,4,12,0.92)` | Navbar (scrolled) |
| `--surface` | `#0A0A16` | Card/section backgrounds |
| `--surface-2` | `#10101E` | Elevated surfaces |
| `--border` | `#1C1C34` | Borders |
| `--text` | `#E4E4F0` | Primary text |
| `--text-muted` | `#CCCCEE` | Secondary text |
| `--text-faint` | `#8A8AAA` | Subtle text |
| `--text-dimmer` | `#7A7A9A` | Low-priority text |
| `--blue` | `#2C6FED` | Primary accent |
| `--blue-dim` | `#1A52C4` | Button hover/dark |
| `--gold` | `#D4A843` | Secondary accent |

## Typography

| Role | Font | Weights |
|---|---|---|
| Display/Headings | Syne | 400, 500, 600, 700, 800 |
| Body | Outfit | 300, 400, 500, 600 |
| Mono/Tags | JetBrains Mono | 400, 500 |

## Background Effects

- Three radial gradients using `rgba(44,111,237, 0.03–0.07)` pinned to corners
- Grid overlay with `rgba(44,111,237, 0.05)` lines at 80px spacing

## Component Patterns

| Component | Style |
|---|---|
| Cards | `--surface` bg, `--border` border, 16px radius, hover lift + blue border |
| Buttons (primary) | Blue gradient `#2C6FED → #1A52C4`, pill shape, blue glow shadow |
| Buttons (outline) | Transparent bg, `--border` border, blue on hover |
| Tags | Mono font, 11px, uppercase, `--tag-border` border, pill shape |
| Service rows | Border-bottom list, hover shifts title to blue, arrow circle icon |
| Form inputs | `--surface` bg, `--border` border, 8px radius, blue focus ring |
