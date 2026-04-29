---
type: concept
created: 2026-04-26
updated: 2026-04-27
sources: 18
tags: [claude-code, skills, primitive, auto-invoked, agentskills-standard, cross-platform, skill-collections]
---

# Skills

Reusable, **auto-invocable** capabilities for Claude Code. A skill is a directory containing a `SKILL.md` (instructions + frontmatter) plus optional bundled resources (scripts, templates, references). Claude uses skills when relevant, OR you invoke directly with `/skill-name`.

> Per official docs: "Create a skill when you keep pasting the same playbook, checklist, or multi-step procedure into chat, or when a section of CLAUDE.md has grown into a procedure rather than a fact."

**Custom commands have been merged into skills.** A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy`. Existing `.claude/commands/` files keep working; skills add optional features.

Skills follow the [agentskills.io](https://agentskills.io) open standard, which works across multiple AI tools (Claude Code, Codex, Cursor, OpenCode). Claude Code adds: invocation control, subagent execution (`context: fork`), dynamic context injection (`!command`).

## Where skills live (priority order)

| Location | Path | Applies to |
|---|---|---|
| Enterprise | (managed settings) | All users in your org |
| **Personal** | `~/.claude/skills/<name>/SKILL.md` | All your projects |
| **Project** | `.claude/skills/<name>/SKILL.md` | This project only |
| Plugin | `<plugin>/skills/<name>/SKILL.md` | Where plugin is enabled |

**Conflict resolution**: Enterprise > Personal > Project. Plugin skills use `plugin-name:skill-name` namespace (no conflict). If a skill and a command (`.claude/commands/`) share a name, **the skill wins**.

### Live change detection
Adding/editing/removing skills under `~/.claude/skills/`, project `.claude/skills/`, or `.claude/skills/` in `--add-dir` directories takes effect within the current session **without restarting**.

### Nested directory discovery
Working in `packages/frontend/`? Claude also looks in `packages/frontend/.claude/skills/`. Supports monorepo setups where packages have their own skills.

## SKILL.md anatomy

```markdown
---
name: my-skill
description: When to use, named explicitly (not just what it does)
disable-model-invocation: true
allowed-tools: Read Grep
context: fork
agent: Explore
paths:
  - "**/*.ts"
---

Your skill instructions here...
```

### Frontmatter reference (full)

| Field | Required | Purpose |
|---|---|---|
| `name` | No | Display name; otherwise directory name. Lowercase, numbers, hyphens, max 64 chars. |
| `description` | **Recommended** | What the skill does AND when to use it. **Front-load the key use case** — combined with `when_to_use`, truncated at 1,536 chars in skill listing. |
| `when_to_use` | No | Additional context for invocation; trigger phrases, example requests. Counts toward the 1,536-char cap. |
| `argument-hint` | No | Autocomplete hint, e.g. `[issue-number]` |
| `arguments` | No | Named positional arguments for `$name` substitution. Space-separated string or YAML list. |
| `disable-model-invocation` | No | `true` → only you can invoke (Claude can't auto-load). Use for side-effecting workflows. Also prevents [preloading into subagents](https://code.claude.com/docs/en/sub-agents#preload-skills-into-subagents). Default: `false`. |
| `user-invocable` | No | `false` → hide from `/` menu (background knowledge). Default: `true`. |
| `allowed-tools` | No | Tools Claude uses without permission while skill is active. |
| `model` | No | Model override for current turn. Same values as `/model`, or `inherit`. Not saved. |
| `effort` | No | Effort level (low/medium/high/xhigh/max). Inherits from session by default. |
| `context` | No | `fork` → run in a forked subagent. |
| `agent` | No | Which subagent type when `context: fork`. |
| `hooks` | No | Hooks scoped to skill's lifecycle. |
| `paths` | No | Glob patterns limiting auto-activation. Same format as path-scoped rules in [[Memory]]. |
| `shell` | No | `bash` (default) or `powershell`. PowerShell requires `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`. |

## Two skill content types

### Reference content
Knowledge Claude applies to current work. Conventions, patterns, style guides, domain knowledge. Inline; runs alongside conversation.

```yaml
---
name: api-conventions
description: API design patterns for this codebase
---

When writing API endpoints:
- Use RESTful naming conventions
- Return consistent error formats
- Include request validation
```

### Task content
Step-by-step instructions. Often want to invoke directly with `/skill-name`. Add `disable-model-invocation: true` to prevent auto-trigger.

```yaml
---
name: deploy
description: Deploy the application to production
context: fork
disable-model-invocation: true
---

Deploy the application:
1. Run the test suite
2. Build the application
3. Push to the deployment target
```

## Argument substitutions

| Variable | Description |
|---|---|
| `$ARGUMENTS` | All arguments. If absent, appended as `ARGUMENTS: <value>`. |
| `$ARGUMENTS[N]` or `$N` | Specific argument by 0-based index. |
| `$name` | Named arg from frontmatter `arguments` list. |
| `${CLAUDE_SESSION_ID}` | Current session ID. |
| `${CLAUDE_SKILL_DIR}` | Skill's directory. Use in bash injection to reference bundled scripts. |

Indexed args use shell-style quoting: `/my-skill "hello world" second` → `$0` = `hello world`, `$1` = `second`.

## Bundled supporting files

Skills are folders, not files. Use additional files for knowledge that should load on demand:

```
my-skill/
├── SKILL.md        # required - overview + navigation
├── reference.md    # detailed docs (load when needed)
├── examples.md     # usage examples
└── scripts/
    └── helper.py   # executable utility
```

Reference them from SKILL.md so Claude knows what's available:
```markdown
## Additional resources
- For complete API details, see [reference.md](reference.md)
- For usage examples, see [examples.md](examples.md)
```

> Per official docs: "Keep SKILL.md under 500 lines."

This is the **500-line rule**. Originally documented by [[Claude Code Infrastructure Showcase (diet103)|diet103]]; now in Anthropic's official guidance.

## Control who invokes a skill

| Frontmatter | You | Claude | Loaded in context |
|---|---|---|---|
| (default) | Yes | Yes | Description always; full skill loads on invoke |
| `disable-model-invocation: true` | Yes | No | Description NOT in context; full skill loads when you invoke |
| `user-invocable: false` | No | Yes | Description always; full skill loads when invoked |

`disable-model-invocation: true` is for **side-effecting workflows**: `/commit`, `/deploy`, `/send-slack-message`. You don't want Claude deciding to deploy on its own.

`user-invocable: false` is for **background knowledge**: `legacy-system-context` should be available to Claude when relevant but isn't a useful direct command.

## Skill content lifecycle (important)

When invoked:
1. Rendered SKILL.md content enters conversation as **a single message**
2. **Stays for the rest of the session**
3. Claude does NOT re-read the skill on later turns

Implications:
- Write guidance as **standing instructions** (apply throughout task), not one-time steps
- If a skill seems to stop influencing behavior, content is usually still there — model may be choosing other tools/approaches; strengthen description

### Compaction handling
Auto-compaction carries invoked skills forward within a token budget:
- After compaction summary, **most recent invocation of each skill** is re-attached
- **First 5,000 tokens of each** preserved
- Re-attached skills share **combined budget of 25,000 tokens**
- Filled from most recently invoked → older skills can be dropped entirely if you've invoked many

If a skill's effect disappears after compaction in a long session, **re-invoke it** to restore.

## Pre-approve tools

```yaml
allowed-tools: Bash(git add *) Bash(git commit *) Bash(git status *)
```

Grants permission for listed tools while skill is active — Claude uses without prompting. Does **not** restrict other tools (every tool remains callable; permission settings still apply).

To **block** specific tools, add deny rules in `/permissions`.

## Inject dynamic context with `!`command``

Pre-execution syntax — runs shell commands BEFORE skill content reaches Claude:

```yaml
---
name: pr-summary
description: Summarize changes in a pull request
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

## Your task
Summarize this pull request...
```

Each `` !`command` `` runs immediately; output replaces the placeholder; Claude receives fully-rendered prompt with actual PR data.

**Multi-line variant**:
````
## Environment
```!
node --version
npm --version
git status --short
```
````

This is **preprocessing**, not execution Claude initiates. Disable with `"disableSkillShellExecution": true`.

## Run skills in a subagent (`context: fork`)

Add `context: fork` to run isolated. The skill content becomes the subagent's prompt; conversation history NOT inherited.

```yaml
---
name: deep-research
description: Research a topic thoroughly
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:
1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with specific file references
```

The `agent` field picks the subagent configuration (built-in: `Explore`, `Plan`, `general-purpose`; or custom from `.claude/agents/`).

> ⚠️ `context: fork` requires explicit instructions in skill content. A skill of pure guidelines ("use these conventions") run as fork = subagent receives guidelines but no actionable task → returns empty.

## Restrict Claude's skill access

Three controls:

```text
# In /permissions:
Skill            # deny entirely (still works for /commands and /init etc.)
Skill(commit)    # allow specific
Skill(review-pr *)  # prefix match
Skill(deploy *)  # deny specific
```

Or `disable-model-invocation: true` in skill frontmatter (removes from Claude's context entirely).

## Bundled skills

Always available: `/simplify`, `/batch`, `/debug`, `/loop`, `/claude-api`. **Prompt-based** (not fixed logic): give Claude a detailed playbook; let it orchestrate using tools.

## Design principles ([[Thariq Anthropic Skills + Sessions|Thariq's 9 from Anthropic]])

1. **Don't state obvious knowledge** — Claude already has it. Skills should surface organizational-specific or counterintuitive info.
2. **Prioritize Gotchas sections** — "highest-signal content in any skill." Living document; add failure points over time.
3. **Leverage the file system** — folder, not file. Progressive disclosure via subdirectories.
4. **Avoid over-specification** — goals + constraints, not prescriptive step-by-step. Don't railroad Claude.
5. **Structure configuration thoughtfully** — `config.json` for skill-side settings.
6. **Write descriptions for the model, not humans** — trigger specification, not summary.
7. **Enable memory/data persistence** — append-only logs, JSON, SQLite via `${CLAUDE_PLUGIN_DATA}`.
8. **Provide reusable code/scripts** — Claude composes, doesn't reconstruct boilerplate.
9. **Use on-demand hooks strategically** — guards for destructive operations (`/careful`, `/freeze`).

### Thariq's 9 skill categories
1. Library & API Reference
2. Product Verification
3. Data Fetching & Analysis
4. Business Process & Team Automation
5. Code Scaffolding & Templates
6. Code Quality & Review
7. CI/CD & Deployment
8. Runbooks
9. Infrastructure Operations

**Best skills fit cleanly into one category.** Confusion comes from skills spanning multiple types.

### Distribution and curation
- Small teams: check skills into repos
- Large orgs: build plugin marketplaces
- High-performing skills graduate from sandbox to marketplace via community validation
- **Skill composition** (skills depending on other skills) isn't natively managed yet but works through references

### Measurement
> Use `PreToolUse` hook to log skill usage. Reveals popular vs undertriggering skills. Drives maintenance.

[[CodeBurn (AgentSeal)|CodeBurn's `optimize`]] formalizes this: scans `~/.claude/` and session data for **ghost skills** (defined but never invoked) and ranks them by "wasted tool-schema overhead per session." At collection scale (the largest skill repo in the ecosystem, [[claude-skills (alirezarezvani)]], is 235+ skills) install-and-forget is the default; ghost-skill detection is the corrective signal.

## The skill-collection landscape (community-scale)

The wiki tracks **9 distinct skill / agent collections** as of April 2026. Pattern: there is no single canonical skill set; collections specialize by domain and design philosophy.

| Collection | Skills/agents | Domain |
|---|---|---|
| [[Anthropic Skills]] | ~21 (4 categories) | Official reference; document-skill production code |
| [[Anthropic Claude Code]] | ~10 skills | Official plugins/configs |
| [[Matt Pocock Skills]] | 18 | TS engineering |
| [[Superpowers (obra)]] | 14 | Composable workflow |
| [[Trail of Bits Security Skills]] | 40+ | Security |
| [[jeffallan claude-skills]] | 65 | Eng + meta (`/common-ground`) |
| [[claude-skills (alirezarezvani)]] | **235+** | Persona-driven, business + eng |
| [[agents (wshobson)]] | **184 agents + 150 skills** | 25 categories, three-tier model routing |
| [[claude-scientific-skills (K-Dense-AI)]] | 133 | Scientific R&D (biology, chemistry, medicine) |
| [[gstack (Garry Tan)]] | 41+ | Role-based, multi-vendor |

What this teaches:
- **Skills generalize beyond engineering.** The K-Dense scientific collection and alirezarezvani's C-level / marketing skills demonstrate that the [[Skills|primitive]] is domain-agnostic.
- **Collection scale matters for design.** Ghost-skill detection (CodeBurn) and per-plugin-component minimization (wshobson's avg 3.6 components/plugin) only make sense once collections are large enough that bloat is real.
- **The Agent Skills standard at agentskills.io enables cross-tool portability.** [[claude-scientific-skills (K-Dense-AI)]] explicitly markets compatibility beyond Claude.

## Cross-platform skill portability ([[graphify (safishamsi)]] as existence proof)

**A skill can be ported to 15+ AI assistants** with platform-appropriate always-on plumbing. graphify ships installation paths for: Claude Code · Codex · OpenCode · Cursor · Gemini CLI · GitHub Copilot CLI · VS Code Copilot Chat · Aider · OpenClaw · Factory Droid · Trae (+ Trae CN) · Hermes · Kiro · Google Antigravity.

Each platform gets the *same skill* with different always-on plumbing — see [[graphify (safishamsi)|graphify install table]]. Where hooks are supported (Claude Code, Codex, Gemini CLI, OpenCode), they fire before search/read tools. Where hooks aren't supported, project-level rules files (`AGENTS.md`, Cursor `.cursor/rules/`, Kiro steering, Antigravity `.agents/rules/`) become always-on substitutes.

The pattern generalizes beyond graphify: **skills targeting `agentskills.io` + a platform-detection install script** can hit most of the 2026 AI-coding-tool landscape with a single source.

## Skill auto-generation from graph topology ([[GitNexus (abhigyanpatwari)]])

GitNexus's `--skills` flag runs Leiden community detection on the indexed codebase, identifies functional areas, and **auto-generates a `SKILL.md` per area** with that area's key files, entry points, execution flows, and cross-area connections. Re-runs regenerate to keep current.

This is **skills-as-derivative-of-codebase-structure** — generated, not handwritten. Worth tracking as a distinct design pattern from the handwritten skill collections above. The same idea could apply to [[graphify (safishamsi)|graphify]]'s communities for non-code corpora.

## Anti-patterns

- **Skill clutter** — adding skills without auto-activation rules. Sit dormant.
- **Knowledge dumps** — multi-thousand-line SKILL.md. Use progressive disclosure or split.
- **Vague descriptions** — descriptions that don't name trigger conditions.
- **Overlapping skills** — multiple skills competing for same trigger. Audit.
- **Stating the obvious** — restating what Claude already knows.
- **Railroading** — prescriptive step-by-step that prevents flexibility.

## Cross-references

- [[Skill Building]] (the topic page synthesizing how to design skills well)
- [[Subagents]] · [[Hooks]] · [[Plugins]] · [[Memory]] · [[Slash Commands]]
- [[Output Styles]] (modify formatting; skills modify capabilities)
- Sources: [[Thariq Anthropic Skills + Sessions]] · [[Boris Cherny Tips Compendium]] · [[Claude Code Infrastructure Showcase (diet103)]] · [[TACHES Claude Code Resources]] · [[Superpowers (obra)]] · [[Matt Pocock Skills]] · [[Everything Claude Code (affaan-m)]] · [[Anthropic Skills]] · [[claude-skills (alirezarezvani)]] · [[agents (wshobson)]] · [[claude-scientific-skills (K-Dense-AI)]] · [[graphify (safishamsi)]] · [[GitNexus (abhigyanpatwari)]] · [Anthropic Skills docs](https://code.claude.com/docs/en/skills)
