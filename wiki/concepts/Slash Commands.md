---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 4
tags: [claude-code, slash-commands, primitive, manual-invocation]
---

# Slash Commands

User-invoked shortcuts (`/cmd`) stored as Markdown files. Each slash command is essentially a **named, parameterized prompt** that the user fires manually. Distinguishes from [[Skills]] (auto-invoked) and [[Subagents]] (delegated).

## Where slash commands live

- **Project**: `.claude/commands/<name>.md`
- **User**: `~/.claude/commands/<name>.md`

The filename (sans `.md`) becomes the command name: `optimize.md` → `/optimize`.

## Anatomy

A slash command file is a Markdown prompt. Optional YAML frontmatter for metadata. Body can use placeholders for arguments. Example pattern (from `optimize.md` in [[Claude HowTo (luongnv89)]]):

```markdown
Analyze the current code for performance bottlenecks.
Identify:
- Hot paths
- Unnecessary allocations
- Algorithm complexity issues
Suggest concrete optimizations with implementation guidance.
```

When the user types `/optimize`, the body is sent as the user's prompt. Simple but powerful: any well-crafted prompt becomes a reusable command.

## Categories (from [[Awesome Claude Code (hesreallyhim)|the awesome list]])

- **Version control & Git** — `/commit`, `/create-pr`, `/fix-github-issue`, `/create-worktrees`, `/husky`
- **Code analysis & testing** — `/check`, `/code_analysis`, `/optimize`, `/repro-issue`, `/tdd`
- **Context loading & priming** — `/context-prime`, `/initref`, `/load-llms-txt`, `/prime`, `/rsi`
- **Documentation & changelogs** — `/add-to-changelog`, `/create-docs`, `/update-docs`
- **CI / deployment** — `/release`, `/run-ci`
- **Project & task management** — `/create-command`, `/create-prp`, `/do-issue`, `/prd-generator`, `/todo`

## When to use over alternatives

| Need | Use |
|---|---|
| Repeated prompt you fire manually | Slash command |
| Automatic activation based on context | [[Skills]] |
| Isolated-context delegation | [[Subagents]] |
| Event-triggered automation | [[Hooks]] |
| Bundle of all the above for distribution | [[Plugins]] |

## Patterns worth lifting

### Context-priming commands
`/context-prime`, `/prime`, `/rsi` — load standard project context at session start. Pairs with [[Memory|CLAUDE.md]] for the persistent layer; slash commands are the **session-start ritual** layer.

### Meta-commands
`/create-command` (scopecraft), `/create-prompt` (TÂCHES), `/dx:handoff` (ykdojo) — commands that produce other commands or session artifacts. The wiki's [[TACHES Claude Code Resources|TÂCHES]] source is rich in these.

### Argument-passing commands
`/dx:gha`, `/fix-github-issue 42`, `/load_dango_pipeline` — commands that accept arguments to scope their behavior. Useful when the same workflow applies to many specific instances.

### Reasoning-frame commands ([[TACHES Claude Code Resources|TÂCHES]])
`/consider:pareto`, `/consider:first-principles`, `/consider:inversion` — explicit reasoning lenses the user can request. Worth treating as a category in itself: *user-named reasoning frames* surface assumptions that implicit reasoning hides.

## Anti-patterns

- **Slash commands for things skills should do** — if the trigger is contextual ("when editing TypeScript"), use a [[Skills|skill]] instead so it auto-activates.
- **Massive slash commands** — if the prompt is multi-thousand-line, it should probably be split into a workflow with subagents or staged via [[Planning Mode]].
- **Project-specific commands committed to user-scope** — keep generic commands in `~/.claude/commands/`, project-specific ones in `.claude/commands/` where they version with the code.

## Distribution

- **Bundled in [[Plugins]]** — most plugin marketplaces ship slash commands as part of larger bundles.
- **Manual copy** — `cp 01-slash-commands/*.md .claude/commands/`
- **Direct authoring** — write your own; they're just Markdown.

## Cross-references

- [[Skills]] · [[Subagents]] · [[Plugins]] · [[Memory]] · [[Hooks]]
- Sources: [[Claude HowTo (luongnv89)]] (taxonomy) · [[Awesome Claude Code (hesreallyhim)]] (catalog) · [[TACHES Claude Code Resources]] (meta-commands) · [[Claude Code Tips (ykdojo)]] (DX plugin)
