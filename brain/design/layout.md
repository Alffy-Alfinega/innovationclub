# Layout System

## Container

```html
<div class="max-w-[1440px] mx-auto">
  <!-- content -->
</div>
```

## Section pattern

```html
<section class="py-20 md:py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
  <!-- section content -->
</section>
```

## Responsive breakpoints

- Default: mobile-first
- `md:` — tablets (768px)
- `lg:` — desktop (1024px)
- `xl:` — wide (1280px)

## Common grid patterns

| Pattern | Classes |
|---|---|
| 2-col desktop | `grid grid-cols-1 lg:grid-cols-2 gap-8` |
| 3-col desktop | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` |
| Sidebar + content | Parent flex, child `lg:sticky lg:top-28` |
| Icon + text row | `grid grid-cols-[48px_1fr]` or `[80px_1fr]` |

## Navigation

Fixed nav bar at the top of every page:

- **Height**: `h-[68px]`
- **Styling**: `bg-[#04040C]/80 backdrop-blur-md border-b border-[#1C1C34]`
- **Position**: `fixed top-0 left-0 right-0 z-50`
- **Logo**: Gradient circle (IC) + "Innovation Club" text (hidden on mobile)
- **Desktop**: Centered nav links (Home, About, Programs, Events, Join) + "Join Free" CTA button
- **Mobile**: Hamburger button → dropdown menu below nav bar
- See: `src/components/layout/Nav.tsx`

## Footer

Multi-column footer on every page:

- **Columns**: Brand description + Programs / Company / Connect link groups
- **Layout**: `grid grid-cols-2 md:grid-cols-4 gap-8`
- **Brand**: Innovation Club logo + description with Alffy link
- **Connect links**: Alffy (Alfinega) and `mailto:hello@innovationclub.africa`
- **Copyright bar**: Year, Alffy credit, Privacy Policy, Terms of Service
- See: `src/components/layout/Footer.tsx`

## Page sections (typical order)

1. **Navigation** — fixed `h-[68px]` with `bg-[#04040C]/80 backdrop-blur-md border-b border-[#1C1C34]`
2. **Hero** — `min-h-screen` with staggered fade-up reveals, tagline, heading, CTAs, scroll indicator
3. **Stats/Marquee** — horizontal scrolling metrics strip (StatsMarquee)
4. **Content sections** — alternating cards, grids, section headings
5. **CTA section** — centered heading + buttons
6. **Footer** — multi-column grid (Programs, Company, Connect) + copyright

Pages use `pt-[68px]` on their wrapper to account for the fixed nav (home page uses full-screen hero instead).
