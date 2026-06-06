# Animations

## Easing curves

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-spring:   cubic-bezier(0.22, 1, 0.36, 1);
```

## Entrance animations (hero)

Staggered cascade with increasing delays:

| Animation | Duration | Delay | Element |
|---|---|---|---|
| `fadeIn` | 1.2s | 0.1s | Badge / tagline |
| `fadeUp` | 1.4s | 0.2s | Heading line 1 |
| `fadeUp` | 1.4s | 0.38s | Heading line 2 |
| `fadeUp` | 1.4s | 0.54s | Sub-text |
| `fadeUp` | 1.2s | 0.72s | CTA buttons |
| `fadeIn` | 1.4s | 1.0s | Scroll indicator |

## Scroll-triggered reveals

- Initial: `opacity: 0; transform: translateY(20px)`
- Visible: `opacity: 1; transform: translateY(0)`
- Transition: `opacity 0.6s ease, transform 0.6s ease`
- Staggered delays: 0s, 0.1s, 0.2s, 0.4s per item

## Continuous animations

- **Marquee**: `animation: marquee 40s linear infinite` → horizontal scroll of stats/testimonials
- **Scroll indicator**: `animation: scrollLine 1.8s ease-in-out infinite` → hero scroll-down prompt

## Keyframes reference

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scrollLine {
  0%, 100% { transform: scaleY(0); opacity: 0; }
  50%      { transform: scaleY(1); opacity: 1; }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 10px rgba(44, 111, 237, 0.25); }
  50%      { box-shadow: 0 0 20px rgba(44, 111, 237, 0.5); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}
```

## Usage reference

- `fadeIn` — hero scroll indicator, general fade-ins
- `fadeUp` — staggered section entry (.reveal class with IntersectionObserver)
- `fadeLeft` — sidebar/slide-in content
- `marquee` — stats strip (StatsMarquee) and testimonials (TestimonialCarousel), 40s linear infinite
- `scrollLine` — hero scroll-down prompt line
- `pulseGlow` — card hover glow effect
- `float` — subtle floating effect for decorative elements
