# Brain Conventions

Rules for maintaining the project brain.

## File conventions

- Use `.md` (Obsidian-compatible markdown)
- Frontmatter: optional YAML `---` for metadata
- Wikilinks: `[[target-file]]` without extension
- Keep under 200 lines per file — split when exceeded

## Update rules

1. **Every AI session** must write a session log in `brain/sessions/`
2. **Update affected topic files** when new information is discovered
3. **Keep the index** (`brain/_index.md`) in sync with available files
4. **Create ADRs** for significant architectural decisions
5. **Remove stale information** — don't accumulate obsolete notes

## Session log format

```markdown
# Session YYYY-MM-DD — Short Description

## What was done
- List of tasks accomplished

## Decisions made
- Any decisions taken during this session

## Files modified
- List of files touched

## What's next
- Follow-up tasks for next session

## Brain updates
- List of brain files created or updated
```

## ADR format

```markdown
# ADR-N: Title

Status: [proposed | accepted | deprecated]

## Context
What prompted this decision?

## Decision
What was decided?

## Consequences
What trade-offs result?
```
