# innovationclub Brain

Persistent project knowledge base. Every AI session must read and update this brain to maintain continuity across sessions.

## How to use

1. **Read first** — Start every session by reading `brain/_index.md` and any relevant topic files
2. **Update always** — End every session by writing a session log and updating any files with new information
3. **Keep files small** — Split topics into separate files and subdirectories so no single file becomes unwieldy
4. **Link freely** — Use `[[wikilinks]]` to connect related concepts across files
5. **Log decisions** — Architecture decisions go in `brain/decisions/` as ADRs

## Directory layout

```
brain/
  _index.md        # Master index — start here
  README.md        # This file
  meta/            # Brain conventions and changelog
  architecture/    # Project structure, tech stack, dependencies
  design/          # Design system, colors, typography, components
  development/     # Commands, conventions, framework guides
  sessions/        # Per-session logs (chronological)
  decisions/       # Architecture Decision Records
```
