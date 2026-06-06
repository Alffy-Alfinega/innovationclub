# ADR-001: Brain Directory Structure

Status: accepted

## Context

The project requires persistent knowledge storage across multiple AI sessions. Without a structured brain, each session starts from zero context, leading to repetitive questions, inconsistent decisions, and lost history.

## Decision

Create a `brain/` directory with Obsidian-compatible markdown files organized into subdirectories:

```
brain/
  _index.md              # Master navigation
  README.md              # Usage guide
  meta/                  # Brain metadata (conventions, changelog)
  architecture/          # System design, tech stack, file map
  design/                # Visual design system
  development/           # Commands, conventions, framework guides
  sessions/              # Per-session development logs
  decisions/             # Architecture Decision Records
```

## Consequences

- ✅ AI agents can quickly onboard by reading `brain/_index.md` and relevant topic files
- ✅ Small files prevent context overflow and enable precise updates
- ✅ Obsidian format enables future use with Obsidian or similar tools
- ✅ Session logs create auditable development history
- ⚠️ Requires discipline to keep brain updated — agents must read and write on every session
