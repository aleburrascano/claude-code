---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 10
tags: [claude-code, memory, claude-md, primitive, context-engineering, persistent, auto-memory]
aliases: [CLAUDE.md, Project Memory, Auto Memory]
---

# Memory

Two complementary mechanisms for persistent context across sessions:

| | CLAUDE.md files | Auto Memory |
|---|---|---|
| **Who writes** | You | Claude |
| **Contains** | Instructions and rules | Learnings and patterns |
| **Scope** | Project, user, or org | Per working tree (git repo) |
| **Loaded into** | Every session, in full | Every session (first 200 lines or 25KB of MEMORY.md) |
| **Use for** | Coding standards, workflows, project architecture | Build commands, debugging insights, preferences Claude discovers |

Both are **context, not enforced configuration**. Specific + concise instructions = better adherence.

## CLAUDE.md hierarchy

| Scope | Location | Purpose | Shared via |
|---|---|---|---|
| **Managed policy** | macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md`<br>Linux: `/etc/claude-code/CLAUDE.md`<br>Windows: `C:\Program Files\ClaudeCode\CLAUDE.md` | Org-wide instructions | All users in org |
| **Project** | `./CLAUDE.md` or `./.claude/CLAUDE.md` | Team-shared project instructions | Source control |
| **User** | `~/.claude/CLAUDE.md` | Personal preferences | Just you, all projects |
| **Local** | `./CLAUDE.local.md` | Personal project-specific (`.gitignore`) | Just you, this project |

Files in directory hierarchy **above** working dir loaded in full at launch. Files in **subdirectories** load on demand when Claude reads files in those directories.

Within each directory: `CLAUDE.local.md` is appended **after** `CLAUDE.md`. Conflicts → last-loaded wins.

> Per [[Boris Cherny Tips Compendium|Boris]]: "CLAUDE.md should target under **200 lines** per file." HumanLayer hits 60. Bloated files cause Claude to ignore your instructions.

## What goes in CLAUDE.md (Anthropic's framing)

> Add when:
> - Claude makes the same mistake twice
> - Code review catches something Claude should have known
> - You type the same correction last session
> - A new teammate would need this context to be productive

| ✅ Include | ❌ Exclude |
|---|---|
| Bash commands Claude can't guess | Anything Claude can figure out by reading code |
| Code style rules differing from defaults | Standard conventions Claude already knows |
| Testing instructions, preferred test runners | Detailed API docs (link instead) |
| Repo etiquette (branch naming, PR conventions) | Information that changes frequently |
| Architectural decisions specific to your project | Long explanations or tutorials |
| Developer environment quirks (env vars) | File-by-file descriptions of the codebase |
| Common gotchas / non-obvious behaviors | Self-evident practices ("write clean code") |

If Claude keeps doing something despite a rule, the file is too long; rule is getting lost. Treat CLAUDE.md like code: review when things go wrong, prune regularly.

## Imports

CLAUDE.md can import additional files via `@path` syntax:

```markdown
See @README.md for project overview and @package.json for available npm commands.

# Additional Instructions
- Git workflow: @docs/git-instructions.md
- Personal overrides: @~/.claude/my-project-instructions.md
```

- Relative paths resolve relative to the file containing the import
- Imported files can recursively import (max depth: 5 hops)
- First time encountering external imports: Claude shows approval dialog
- For private per-project settings: `CLAUDE.local.md` (gitignore'd)

## AGENTS.md

> Claude Code reads `CLAUDE.md`, NOT `AGENTS.md`.

If your repo uses `AGENTS.md` for other agents, create a CLAUDE.md that imports it:

```markdown
@AGENTS.md

## Claude Code

Use plan mode for changes under `src/billing/`.
```

## `.claude/rules/` — modular memory with path scoping

For larger projects, split instructions across multiple files:

```
your-project/
├── .claude/
│   ├── CLAUDE.md           # main project instructions
│   └── rules/
│       ├── code-style.md
│       ├── testing.md
│       └── security.md
```

All `.md` files discovered recursively. Subdirectories supported.

### Path-specific rules (high-leverage feature)

YAML frontmatter limits when a rule applies:

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules
- All API endpoints must include input validation
- Use the standard error response format
```

Rules without `paths:` load unconditionally. Rules WITH `paths:` trigger when Claude reads matching files. Glob patterns supported, including brace expansion:

```yaml
paths:
  - "src/**/*.{ts,tsx}"
  - "lib/**/*.ts"
  - "tests/**/*.test.ts"
```

This is **lazy memory** — rules only enter context when relevant. Saves tokens; reduces noise.

### Symlinks supported
Maintain shared rules across projects:
```bash
ln -s ~/shared-claude-rules .claude/rules/shared
ln -s ~/company-standards/security.md .claude/rules/security.md
```

Circular symlinks handled gracefully.

### User-level rules
`~/.claude/rules/` applies to every project. Project rules override.

## Discipline patterns

### `<important if="...">` tags ([[Boris Cherny Tips Compendium|Boris]])
Wrap domain-specific rules to keep Claude from ignoring them as files grow:
```markdown
<important if="modifying database migrations">
Never modify migrations once they've shipped to production.
</important>
```

### Block-level HTML comments
```markdown
<!-- maintainer note: this section due for review 2026-Q3 -->
```
Stripped before injection into Claude's context. Use for human notes that don't spend tokens.

### Use `--append-system-prompt` for system-prompt-level instructions
CLAUDE.md is delivered as a user message AFTER the system prompt. For system-prompt-level customization, use `--append-system-prompt` (must pass each invocation, not interactive-friendly; better for scripts).

## Auto Memory (Anthropic v2.1.59+)

Claude **writes notes for itself** based on your corrections and preferences. Saves to `~/.claude/projects/<project>/memory/`.

### Storage layout
```
~/.claude/projects/<project>/memory/
├── MEMORY.md          # concise index, loaded into every session
├── debugging.md       # detailed debugging notes (loaded on demand)
├── api-conventions.md # API design decisions
└── ...
```

`MEMORY.md` acts as the index. Topic files are NOT loaded at startup; Claude reads them on demand using its tools.

### Loading limit
First **200 lines or 25KB** of `MEMORY.md`, whichever first. Content beyond that not loaded at session start.

### Project = git repository
All worktrees and subdirectories within the same git repo share one auto memory directory. Outside git: project root used.

### Toggling
`/memory` → use the auto memory toggle. Or:
```json
{ "autoMemoryEnabled": false }
```
Or env var: `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`.

### Custom location
```json
{ "autoMemoryDirectory": "~/my-custom-memory-dir" }
```
**Not accepted from project settings** — prevents shared projects from redirecting writes to sensitive locations.

### Audit and edit
Auto memory files are plain markdown. Run `/memory` to browse and edit.

## When to use which (CLAUDE.md vs Auto Memory vs `.claude/rules/`)

| Need | Use |
|---|---|
| Always-true facts (build commands, conventions) | CLAUDE.md |
| Path-specific rules (TS-only style) | `.claude/rules/` with `paths:` |
| Personal overrides (gitignored) | CLAUDE.local.md |
| Multi-step procedures | [[Skills]] (load on demand) |
| Things Claude discovers about your project | Auto Memory (Claude writes itself) |
| Rules that should fire on events | [[Hooks]] |
| Org-wide behavioral guidance | Managed CLAUDE.md |
| Org-wide enforcement | Managed [[Hooks|settings]] (not memory) |

CLAUDE.md vs settings: settings enforce; CLAUDE.md guides. "Don't add Co-Authored-By" → use `attribution.commit: ""` (deterministic) not CLAUDE.md (advisory).

## `claudeMdExcludes` — skip files in monorepos

```json
{
  "claudeMdExcludes": [
    "**/monorepo/CLAUDE.md",
    "/home/user/monorepo/other-team/.claude/rules/**"
  ]
}
```

Patterns match absolute paths via glob. Configurable at any layer; arrays merge across layers. **Managed policy CLAUDE.md cannot be excluded.**

## Subagents and memory

[[Subagents|Subagents]] can maintain their own auto memory. See [Subagent persistent memory docs](https://code.claude.com/docs/en/sub-agents#enable-persistent-memory).

## What survives compaction

- **Project-root CLAUDE.md**: re-read from disk and re-injected after compaction
- **Nested CLAUDE.md** (subdirectories): NOT re-injected automatically; reload next time Claude reads in that subdir
- **Conversation-only instructions**: lost. If important, write to CLAUDE.md before compaction.

## Anti-patterns

- **The memory dump** — multi-thousand-line CLAUDE.md. Burns tokens every turn; Claude can't track. Split.
- **Out-of-date facts** — claims no longer true. Worse than no memory; misleads. Lint periodically.
- **Memory that should be a skill** — task-specific instructions belong in [[Skills]].
- **Memory that should be a hook** — "never let X happen" belongs in [[Hooks]] (deterministic) not CLAUDE.md (advisory).
- **AGENTS.md instead of CLAUDE.md** — won't be read.

## The `/memory` command

- Lists all CLAUDE.md, CLAUDE.local.md, and rules files loaded
- Toggle auto memory
- Open auto memory folder
- Select files to open in editor

If Claude isn't following an instruction: run `/memory` to verify the file is actually loaded. If not listed, Claude can't see it.

## Patterns from the deep-dives

### Karpathy CLAUDE.md ([[Andrej Karpathy Skills (forrestchang)]])
Memory-as-discipline. Drop-in, language-agnostic, project-agnostic. Four [[Karpathy Coding Principles|principles]].

### codebase-map injection per turn ([[claudekit (Carl Rannaberg)]])
`UserPromptSubmit` hook injects project map per turn. Same effect as memory but contextual rather than persistent. Useful for fast-decaying state.

### `/common-ground` ([[jeffallan claude-skills|jeffallan]])
Surfaces hidden assumptions. Pair with CLAUDE.md design: things commonly mis-assumed should be in memory, named explicitly.

### Boris's "compounding engineering" ([[Boris Cherny Tips Compendium]])
Tag Claude on PRs to update CLAUDE.md during code review. Institutional memory accumulates without manual effort.

### Multi-CLAUDE.md for monorepos ([[shanraisshan Claude Code Best Practice]])
Ancestor + descendant loading. Top-level CLAUDE.md for org-wide, subdirectory CLAUDE.md for module-specific.

### CLAUDE.md as constitution ([[Diwank Field Notes]])
The Julep team's framing: CLAUDE.md is the **project's constitution**, not a tip-jar of preferences. Implications: every line is load-bearing (don't pad); contradictions matter (lint regularly); the document is amendment-friendly (review like code). Pairs with the AIDEV-* anchor comments pattern — durable in-code annotations that survive editing, so the constitution doesn't have to encode every detail. See [[Diwank Field Notes]] for the full pattern + the sacred-tests rule.

### Karpathy's "CLAUDE.md alone is insufficient" warning ([[Karpathy LLM Coding Notes (Dec 2025)]])
> "All of this happens despite a few simple attempts to fix it via instructions in CLAUDE.md."

Memory is necessary but not sufficient. Karpathy's observation justifies the **stack-of-defenses** thinking in [[Reducing Hallucinations]] — CLAUDE.md is layer 1; TDD, hooks, classifiers add the rest. Don't expect any single layer to do all the work.

### `~/.claude/tasks/` — the second file-system-resident state store

Per [[Thariq - Tasks Tool (Todos to Tasks)]] (Jan 2026), Claude Code has a *second* file-system state store alongside Auto Memory:

| Path | Contents | Lifecycle |
|---|---|---|
| `~/.claude/projects/<project>/memory/` | Auto Memory (Claude's notes; first 200 lines / 25KB loaded each session) | Persistent across sessions for this project |
| `~/.claude/tasks/` | Tasks (work items + dependencies + blockers) | Persistent; cross-session broadcast on update |

Together: **Auto Memory carries facts; Tasks carries work**. Both are file-system-resident, both survive session boundaries, both are scriptable from outside Claude. The `~/.claude/` directory is now the canonical surface for "things Claude shares across sessions."

For multi-subagent coordination on the same Task List, set `CLAUDE_CODE_TASK_LIST_ID=<id>` — works with `claude -p` headless and the Agent SDK.

## Cross-references

- [[Skills]] (when to use over memory)
- [[Hooks]] (when to use over memory)
- [[Auto Mode]] (auto-memory boundaries; classifier re-reads from transcript)
- [[Context Engineering]] (where memory fits in the broader discipline)
- [[Token Efficiency]] (200-line discipline + lazy `paths:` rules)
- [[CLAUDE]] (this wiki's own memory file)
- Sources: [[Thariq Anthropic Skills + Sessions]] · [[Boris Cherny Tips Compendium]] · [[Andrej Karpathy Skills (forrestchang)]] · [[Karpathy LLM Coding Notes (Dec 2025)]] (CLAUDE.md alone insufficient warning) · [[Claude Code System Prompts (Piebald)]] · [[Claude Code Tips (ykdojo)]] · [[claude-mem (thedotmack)]] · [[Diwank Field Notes]] (constitution framing + AIDEV anchor comments) · [[HumanLayer]] (60-line CLAUDE.md exemplar) · [Anthropic Memory docs](https://code.claude.com/docs/en/memory) · [Anthropic Best Practices](https://code.claude.com/docs/en/best-practices)
