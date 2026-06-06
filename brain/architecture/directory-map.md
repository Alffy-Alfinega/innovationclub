# Directory Map

```
innovationclub/
├── AGENTS.md              # OpenCode agent instructions
├── brain/                 # Obsidian-style project knowledge base
│   ├── _index.md          # Master navigation index
│   ├── README.md          # Brain usage guide
│   ├── architecture/
│   │   ├── overview.md    # High-level architecture
│   │   ├── tech-stack.md  # Dependencies & versions
│   │   └── directory-map.md # This file
│   ├── decisions/
│   │   └── adr-001-brain-structure.md
│   ├── design/
│   │   ├── design-system.md  # Colors, typography, spacing, components
│   │   ├── animations.md     # Animation patterns & keyframes
│   │   └── layout.md         # Layout system & responsive breakpoints
│   ├── development/
│   │   ├── commands.md       # CLI commands
│   │   ├── conventions.md    # Code style, naming, patterns
│   │   ├── nextjs.md         # Next.js configuration details
│   │   └── reactylon.md      # Reactylon/Babylon.js usage guide
│   ├── meta/
│   │   ├── changelog.md      # Brain structure changes
│   │   └── conventions.md    # Rules for maintaining the brain
│   └── sessions/
│       ├── _index.md         # Session log index
│       ├── 001-initial-scaffold.md
│       └── 002-analyse-and-update-brain.md
├── public/
│   └── vercel.svg            # Default Vercel favicon/asset
├── src/
│   ├── app/
│   │   ├── favicon.ico       # Browser tab icon
│   │   ├── globals.css       # Global styles + CSS custom properties + keyframes
│   │   ├── layout.tsx        # Root layout (Syne/Outfit/JetBrains Mono, Nav, Footer)
│   │   ├── page.tsx          # Home — Engine + Scene entrypoint (reactylon/web)
│   │   ├── Content.tsx       # Home page sections (hero, programs, process, testimonials, CTA)
│   │   ├── about/
│   │   │   └── page.tsx      # About page (stats, story, team)
│   │   ├── events/
│   │   │   └── page.tsx      # Events page (upcoming events list)
│   │   ├── join/
│   │   │   └── page.tsx      # Join page (benefits + application form)
│   │   └── programs/
│   │       └── page.tsx      # Programs page (program grid)
│   └── components/
│       ├── home/
│       │   ├── Hero3D.tsx             # 3D torus knot with Babylon.js
│       │   ├── StatsMarquee.tsx       # Horizontal scrolling stats strip
│       │   └── TestimonialCarousel.tsx # Marquee-style testimonial cards
│       ├── layout/
│       │   ├── Nav.tsx                # Fixed nav (desktop + mobile)
│       │   └── Footer.tsx             # Multi-column footer
│       └── ui/
│           ├── Badge.tsx              # Blue/Gold pill badge
│           ├── Button.tsx             # Link button (primary/secondary/ghost)
│           ├── Card.tsx               # Card (default/blue/gold variants)
│           └── SectionHeading.tsx     # Reusable section heading
├── .env                  # Neon/Postgres database credentials
├── .gitattributes        # Git attributes (text=auto)
├── .gitignore            # Git ignore rules
├── babel.config.js       # Required for Reactylon JSX transform
├── eslint.config.mjs     # ESLint 9 flat config
├── next.config.ts        # Next.js configuration
├── next-env.d.ts         # Next.js TypeScript declarations
├── package.json          # Dependencies and scripts
├── package-lock.json     # Lockfile
├── postcss.config.js     # PostCSS config (Tailwind + Autoprefixer)
├── tailwind.config.js    # Tailwind CSS config (custom font families)
├── tsconfig.json         # TypeScript (strict, @/* → ./src/*)
├── LICENSE               # Apache 2.0
└── README.md             # Project readme
```
