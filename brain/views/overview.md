# Views Overview

## Structure

```
views/
├── index.ejs              Homepage
├── register.ejs           Registration form
├── success.ejs            Post-registration confirmation
├── partials/
│   ├── header.ejs         DOCTYPE, <head>, navbar, mobile menu, <main> open
│   └── footer.ejs         <main> close, footer, </body>, </html>
```

## Pattern

- All pages `include('partials/header')` at top and `include('partials/footer')` at bottom
- Title is passed as `title` variable for the `<title>` tag
- Form errors passed as `errors[]` array and `form` object for value preservation
- Dropdown options passed as arrays (`classes`, `streams`, `terms`, `sections`, `statuses`)

## Header Block

- Fixed navbar with transparent → blurred-on-scroll background
- Logo: Alffy logo + "Innovation Club" text
- Nav links: Home, Register, Join CTA
- Mobile hamburger: animated bars → X with full-screen overlay
- Escape key closes mobile menu; body scroll locked while open

## Footer Block

- 4-column grid: brand info, quick links, Alffy services, newsletter
- Social icons (Instagram, Facebook, X, LinkedIn, WhatsApp) with inline SVGs
- Legal links: Privacy Policy, Terms of Service, Data Handling
