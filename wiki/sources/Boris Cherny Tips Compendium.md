---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 7
tags: [claude-code, tips, boris-cherny, anthropic, creator]
source_url: https://github.com/shanraisshan/claude-code-best-practice/tree/main/tips
source_author: Boris Cherny (Anthropic, creator of Claude Code), compiled by shanraisshan
---

# Boris Cherny Tips Compendium

A consolidated source page covering [[Boris Cherny]]'s public guidance on Claude Code, organized into one citable artifact. Compiled from **seven** of his tweet threads (Jan–Apr 2026), as collated by shanraisshan into single docs.

For our wiki, this is the canonical "creator's intent" reference. When the wiki conflicts with Boris's stated guidance, the wiki is wrong.

## Source documents

- **13 tips (3 Jan 2026)** — "How I use Claude Code — 13 tips from my surprisingly vanilla setup"
- **10 tips (1 Feb 2026)** — Tips for using Claude Code from the team
- **12 tips (12 Feb 2026)** — How people are customizing their claudes
- **2 tips (10 Mar 2026)** — Code Review & Test Time Compute
- **2 tips (25 Mar 2026)** — Squash Merging & PR Size Distribution
- **15 tips (30 Mar 2026)** — Hidden & under-utilized features
- **6 tips (16 Apr 2026)** — Getting more out of Opus 4.7

## Cross-document themes

Three architectural principles recur across all three documents:

### 1. Verification loops over prompt perfection
> "Provide Claude mechanisms to verify its own output. This feedback mechanism amplifies quality by 2-3x."

Boris validates every landed change. The pattern: don't try to make Claude perfect on the first try; give it a way to *check itself*. See [[Reducing Hallucinations]] and [[Test-Driven Development with Claude]].

### 2. Distributed / parallel compute
Tips 1, 2, 10, 11 (across docs) emphasize running multiple Claude instances simultaneously — terminal parallelism, web parallelism, [[Subagents]], git worktrees, `/batch` for parallel changesets. **Many independent tasks beat one giant task.**

### 3. Context engineering through accumulated artifacts
[[Memory|CLAUDE.md]], [[Slash Commands|slash commands]], [[Subagents|specialized subagents]], `.claude/agents/` — these compound team knowledge. "Compounding engineering" is Boris's framing for **institutional memory at the tooling layer**.

## The 13 vanilla-setup tips (Jan)

Distilled:

| # | Tip | Cross-ref |
|---|---|---|
| 1 | Five numbered Claude instances in terminal tabs | parallelism |
| 2 | 5–10 instances on `claude.ai/code` for further parallelism | parallelism |
| 3 | **Opus + thinking on everything** — heavier but needs less steering | [[Extended Thinking]] |
| 4 | Shared CLAUDE.md repo for institutional memory | [[Memory]] |
| 5 | Tag Claude on PRs to update CLAUDE.md (compounding engineering) | [[Compound Engineering]] |
| 6 | **Plan mode first** (shift+tab twice), iterate, then auto-accept | [[Planning Mode]] |
| 7 | Slash commands for inner-loop workflows | [[Slash Commands]] |
| 8 | Specialized subagents (`code-simplifier`, `verify-app`) | [[Subagents]] |
| 9 | PostToolUse hooks for auto-format | [[Hooks]] |
| 10 | `/permissions` whitelist instead of `--dangerously-skip-permissions` | safety |
| 11 | MCP for org tools (Slack, BigQuery, Sentry) | [[Model Context Protocol]] |
| 12 | Background verification agents (prompting, Stop hooks, ralph-wiggum plugin) | [[Ralph Wiggum Technique]] |
| 13 | **Verification loops** (the 2-3x quality multiplier) | [[Reducing Hallucinations]] |

Boris's framing of "vanilla" is itself a tip: **the tool is well-designed enough that you don't need exotic customization**. Customizations should ride within intentional extension points (hooks, MCP, agents), not work around the tool.

## The 15 hidden / under-utilized features (Mar)

Highlights:

- **Mobile app** (iOS + Android) for review-on-the-go
- **Session teleportation** (`claude --teleport`, `/remote-control`) — switch between mobile/web/desktop/terminal
- **`/loop` and `/schedule`** — recurring tasks (up to a week)
- **Lifecycle hooks** — beyond PreToolUse/PostToolUse (e.g., SessionStart context loading, PermissionRequest external routing)
- **Cowork dispatch** — secure remote control for non-coding tasks (email, files)
- **Chrome extension** — Claude verifies frontend visually
- **Desktop app web server + browser testing** — bundled
- **Session branching** (`/branch` or `claude --resume <id> --fork-session`) — parallel conversation threads
- **`/btw` side queries** — quick questions without interrupting current task
- **Git worktrees** — parallel Claude instances on same repo
- **`/batch`** — fan out large migrations across multiple worktree agents
- **`--bare` flag** — 10x faster SDK startup; explicit params, skip auto-discovery
- **`--add-dir`** — multi-repo access in one session
- **Custom agents** — restricted tools, custom prompts in `.claude/agents/`
- **`/voice`** — push-to-talk dictation

## The 10 team-usage tips (Feb 1)

- **Parallel git worktrees** — 3-5 worktrees + separate Claude sessions; shell aliases for navigation ("2a", "2b", "2c")
- **Plan mode for complex tasks** — comprehensive planning before implementation; second Claude as staff-engineer reviewer
- **Invest in CLAUDE.md** — after each correction, ask Claude to update its own custom instructions; project-specific notes directories referenced in CLAUDE.md
- **Build skills + commit to git** — `/techdebt` for duplicated code; sync commands for Slack/GDrive/Asana/GitHub; analytics-focused agents
- **Claude fixes most bugs by itself** — paste Slack bug threads with minimal instructions; point Claude at Docker logs; "fix the failing CI tests" without prescribing approach
- **Level up prompting** — "challenge Claude to review changes before PR"; "prove to me this works"; "scrap this and implement the elegant solution"
- **Terminal/environment** — Ghostty for synchronized rendering + unicode; `/statusline` for context + git branch; voice dictation (fn×2 macOS)
- **Subagents** — append "use subagents" for additional compute; route permission requests to Opus via hook for attack scanning + auto-approval
- **Data & analytics** — `bq` CLI for real-time metrics; BigQuery skill in codebase
- **Learning with Claude** — "Explanatory" output style; HTML presentations explaining unfamiliar code; ASCII protocol diagrams; **spaced-repetition skills** that identify knowledge gaps via follow-up questions

## The 12 customization patterns (Feb 12)

Three categories of how teams customize:

### Environment & interface
- Terminal config (themes, notifications, multiline input)
- Keybinding customization (every key remappable; immediate effect)
- Status lines (model, directory, tokens, costs); per-team-member variants
- Spinner verbs (custom loading messages; commit to version control)

### Safety & governance
- **Permission pre-approval** — `/permissions` allowlists/blocklists with wildcards (`Bash(bun run *)`, `Edit(/docs/**)`); team configs
- **Sandboxing** — open-source runtime; file + network isolation
- **Hooks** — Slack-routed permission requests; Opus escalation for tool calls; custom logging

### Workflow & intelligence
- **Effort levels** — low/medium/high/max; Boris personally uses max for everything
- **Custom agents** — `.claude/agents/<name>.md` with name, color, tools, permission modes; per-project defaults
- **Plugins/MCPs/Skills** — internal marketplaces; commit marketplace references to `settings.json`
- **Output Styles** — Explanatory, Learning; team-defined custom styles
- **Model configuration** — effort-level selection via simple commands

> "37 settings + 84 environment variables" — Anthropic anticipated diverse team needs.

The pattern: **configuration-as-infrastructure**. Check `settings.json` into version control to democratize customizations across team / per-codebase / per-subfolder / per-individual / enterprise-wide layers.

## The Code Review + Test Time Compute tips (Mar 10) — IMPORTANT

### `/code-review` (the new feature)
"A team of agents runs a deep review on every PR." Anthropic-internal use case where code review became the bottleneck (output per engineer +200% YoY). Multiple agents dispatched per PR to identify bugs systematically.

### Test Time Compute (the principle)
> "The more tokens you throw at a coding problem, the better the result."

Specifically, **separate context windows beat single agents** even with the same model. Why?
- One agent introduces a bug → another agent (same model, fresh context) catches it
- Cognitive diversity from independent contexts
- Mirrors human team dynamics

> "Agents will probably write perfect bug-free code — until then, multiple uncorrelated context windows tends to be a good approach." — Boris

### Wiki implications

This re-frames how to think about subagents:
- Not just "cost optimization" — they're **cognitive diversity engines**
- Each subagent's separate context = different reasoning pathway = uncorrelated failures
- Multi-agent verification structurally reduces hallucination

Folded into the wiki as concept page [[Test Time Compute]] and updates to [[Subagents]], [[When to Delegate to Subagents]], [[Reducing Hallucinations]].

## The Squash Merge + PR Size tips (Mar 25)

### Squash merge religiously
> "Squash merging combines all branch commits into a single commit on the target branch — keeping history clean and linear."

Each PR = one atomic commit. Enables clean revert and `git bisect`. AI-assisted workflows generate many intermediate commits (lint fixes, alternative attempts, iteration); squash eliminates this noise from permanent history.

### PR size distribution data (Boris's own GitHub)
266 contributions in **one day** from **141 PRs**:
- Total: 45,032 lines changed
- **p50: 118 lines** (half of all PRs at or below)
- 90% under 500 lines
- Only ~1 PR exceeded 3,000 lines
- Smallest: 2 lines; largest: 10,459 (likely bulk migration)

Distribution heavily right-skewed. Small focused PRs are the norm.

### Why this matters for AI coding
- 141 PRs/day requires structural discipline; manual review impractical without
- Small PRs reduce merge conflicts when multiple AI-assisted devs work in parallel
- Squash merge keeps history bisectable despite extreme velocity
- The development model: **leverage AI speed → focused changes rapidly → tight reviewable PRs → squash merge → clean bisectable history**

> Result: high velocity AND maintainability — a rare combination Boris demonstrates is achievable.

## The 6 Opus 4.7 tips (Apr)

Opus 4.7 is "2-3x what you get out of Claude" previously, which makes verification *more* important, not less:

| # | Tip | Why |
|---|---|---|
| 1 | **[[Auto Mode]]** for hands-free operation | safety classifier handles permissions; great for parallel instances |
| 2 | `/fewer-permission-prompts` skill | scans session history for safe-but-prompted commands; recommends allowlist |
| 3 | **Recaps** for long sessions | brief elapsed-time summaries; quick context on return |
| 4 | **`/focus` mode** — hide intermediate work, show only result | "model has reached a point where he generally trusts it to run the right commands" |
| 5 | **Adaptive thinking effort** (low / medium / high / xhigh / max) | replaces fixed thinking budgets; granular reasoning resource control |
| 6 | **Built-in verification patterns** (`/go` skill: test E2E + simplify + PR) | mandatory verification because higher-capability model = more rope |

Boris's typical Opus 4.7 prompt structure: `Claude do [task] /go`. The `/go` skill handles the verification suffix.

## Quotes worth saving

> "The model has reached a point where I generally trust it to run the right commands and make the right edits."

> "Provide Claude mechanisms to verify its own output. This feedback mechanism amplifies quality by 2-3x."

> "Use auto mode instead of dangerously-skip-permissions — a model-based classifier decides if each command is safe."

> "Compounding engineering" — the term Boris uses for shared CLAUDE.md + GitHub PR review feeding back into team memory.

## Implications for the wiki

Several existing wiki pages should be updated based on this compendium:

- [[Memory]] — add the "compounding engineering" framing for shared CLAUDE.md
- [[Subagents]] — Boris's framing of subagents as "operationalized team best practices"
- [[Hooks]] — PermissionRequest hook for routing to external services
- [[Token Efficiency]] — adaptive thinking effort levels
- [[Reducing Hallucinations]] — verification loops as the 2-3x lever
- [[Claude Code]] — add new features (mobile, teleportation, /branch, /btw, /batch, --bare, --add-dir, /voice, /focus, recaps, auto mode, adaptive effort)

## Cross-references

- [[Boris Cherny]] (creator profile)
- [[shanraisshan Claude Code Best Practice]] (the source compilation)
- [[Auto Mode]] · [[Compound Engineering]] · [[Verification Loops]] · [[Subagents]]
- [[Reducing Hallucinations]] · [[Token Efficiency]] · [[Context Engineering]]
