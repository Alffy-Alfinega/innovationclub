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

## Page sections (typical order)

1. **Preloader** — full-screen overlay with progress bar
2. **Navigation** — fixed `h-[68px]` transparent bar, z-50
3. **Hero** — `min-h-screen` with radial glow, grid overlay, CTAs
4. **Stats/Marquee** — horizontal scrolling metrics strip
5. **Content sections** — alternating cards, grids, sidebars
6. **CTA section** — full-width with gradient button
7. **Footer** — multi-column links + newsletter + copyright
