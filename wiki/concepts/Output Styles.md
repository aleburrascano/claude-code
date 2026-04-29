---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 4
tags: [claude-code, output-styles, primitive, presentation]
---

# Output Styles

A Claude Code primitive that **modifies the system prompt to set role, tone, and output format** — without changing core capabilities (Claude can still run scripts, read/write files, track TODOs).

Use Output Styles when you keep re-prompting for the same voice or format every turn, or when you want Claude to act as something other than a software engineer.

> Quote from official docs: "Output styles change how Claude responds, not what Claude knows."

## Built-in styles

| Style | What it does |
|---|---|
| **Default** | The existing software-engineering-focused system prompt |
| **Explanatory** | Educational "Insights" between coding tasks; explains implementation choices and codebase patterns |
| **Learning** | Collaborative; Claude shares Insights AND asks you to contribute small strategic pieces of code yourself, marking spots with `TODO(human)` |

## How they work mechanically

- Output Styles **directly modify Claude Code's system prompt**.
- Custom styles **exclude coding instructions** by default (no test-verification, no surgical-changes prompts) **unless** `keep-coding-instructions: true`.
- All styles add custom instructions at end of system prompt.
- All styles trigger **reminders** during conversation to adhere to the style.

## Token usage tradeoffs

- Custom instructions **increase input tokens** at the start of every turn — but [prompt caching](https://code.claude.com/docs/en/costs#reduce-token-usage) reduces this cost after the first request in a session.
- Built-in **Explanatory** and **Learning** styles produce **longer responses** by design → more output tokens.
- For custom styles, output token usage depends on what your instructions tell Claude to produce.

For [[Token Efficiency]]: a "concise" custom output style is among the highest-leverage levers — applies to every turn, no per-turn intervention needed.

## Changing your output style

```text
/config           → select Output style → pick from menu
```

Selection saves to `.claude/settings.local.json` at the local project level.

Set without menu:
```json
{ "outputStyle": "Explanatory" }
```

> The output style is set in the system prompt at session start. **Changes take effect the next time you start a new session** to keep prompt caching effective.

## Creating a custom output style

Custom styles are Markdown files with frontmatter + content appended to the system prompt:

```markdown
---
name: My Custom Style
description: A brief description shown in the /config picker
keep-coding-instructions: false
---

# Custom Style Instructions

You are an interactive CLI tool that helps users with software engineering
tasks. [Your custom instructions here...]

## Specific Behaviors

[Define how the assistant should behave in this style...]
```

Save to:
- **User level**: `~/.claude/output-styles/`
- **Project level**: `.claude/output-styles/`
- **Plugin**: `output-styles/` directory

Plugins can ship output styles.

### Frontmatter fields

| Field | Purpose | Default |
|---|---|---|
| `name` | Display name; otherwise file name | File name |
| `description` | Shown in `/config` picker | None |
| `keep-coding-instructions` | Whether to keep Claude Code's coding-related system prompt sections | `false` |

## Comparison to related features

### Output Styles vs CLAUDE.md vs `--append-system-prompt`

| | Output Styles | [[Memory\|CLAUDE.md]] | `--append-system-prompt` |
|---|---|---|---|
| Modifies default system prompt | YES (turns OFF coding-specific parts) | NO (added as user message AFTER system prompt) | NO (appends to system prompt) |
| Always applied | Once selected, every session | Every session | Every invocation, must pass each time |
| Best for | Voice/format/role | Project conventions | Scripts/automation |

**Key insight**: Output Styles are the only one of the three that **subtracts** from Claude Code's default system prompt. The others only add.

### Output Styles vs Subagents

[[Subagents]] are invoked for specific tasks; they have own model, tools, and context. Output Styles affect the **main agent loop's system prompt** continuously.

### Output Styles vs Skills

[[Skills]] are task-specific, invoked manually (`/skill-name`) or auto-loaded when relevant. Output Styles modify formatting/tone/structure and are **always active once selected**. Use Output Styles for consistent formatting; use Skills for reusable workflows.

## Practical applications

### Terse mode for high-volume turns
Custom style enforcing terseness for autonomous loops where every paragraph of explanation is wasted tokens. Significant token savings per session.

### Structured-output mode for downstream parsing
Custom style enforcing JSON/YAML output when subsequent steps consume Claude's output programmatically. More reliable than per-turn prompts.

### Persona / domain mode
Enforce domain conventions (medical terminology, specific frameworks, regulatory tone). Useful when Claude is acting outside default software-engineering role.

### Learning mode for new codebases
Built-in **Learning** style is genuinely useful when ramping on an unfamiliar codebase — Claude leaves `TODO(human)` markers asking you to contribute code, which forces you to engage rather than just accept.

### Explanatory mode for code reviews
[[Boris Cherny Tips Compendium|Boris recommends Explanatory style]] in `/config` for better understanding of Claude's decisions — "thinking mode true (to see reasoning) and Output Style Explanatory (to see detailed output with ★ Insight boxes)."

## Anti-patterns

- **Custom styles that duplicate CLAUDE.md content** — `keep-coding-instructions: false` already removes Claude Code's coding instructions. Don't restate them.
- **Verbose custom styles** — they're added to system prompt every turn. Aggressive trimming pays off.
- **Multiple competing styles** — only one applies at a time; switching mid-task may confuse continuity.

## Cross-references

- [[Claude Code]] · [[Memory]] · [[Skills]] · [[Subagents]]
- [[Token Efficiency]] (custom terse styles directly affect output tokens)
- [[Context Engineering]] (system-prompt level customization)
- [[Boris Cherny Tips Compendium]] (Boris recommends Explanatory style)
- [Anthropic Output Styles official docs](https://code.claude.com/docs/en/output-styles)
