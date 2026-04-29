---
type: source
created: 2026-04-27
updated: 2026-04-27
sources: 1
tags: [claude-code, token-efficiency, observability, cost-tracking, optimization, tui, multi-provider]
source_path: raw/repos/getagentseal-codeburn.md
source_date: 2026-04-27
source_author: AgentSeal (agentseal.org)
source_url: https://github.com/getagentseal/codeburn
license: MIT
---

# CodeBurn (AgentSeal)

> "See where your AI coding tokens go."

CodeBurn is a TUI cost-observability dashboard that reads session data **directly from disk** for 9 AI coding tools (Claude Code, Codex, Cursor, cursor-agent, OpenCode, Pi, OMP, GitHub Copilot, Claude Desktop). No wrapper, no proxy, no API keys. Pricing data comes from [LiteLLM's `model_prices_and_context_window.json`](https://github.com/BerriAI/litellm) (auto-cached 24h).

For our wiki, CodeBurn fills the previously-missing **observability/measurement layer** in [[Token Efficiency]]. The five compression layers (caching · AST graphs · sandboxing · tool-output filtering · memory compression) all answer "how do I waste fewer tokens?" — but you can't optimize what you don't measure. CodeBurn is **layer 0**: see where the tokens are actually going.

## Lineage

CodeBurn cites two predecessors in its credits:

- **[[ccusage (ryoppippi)|ccusage]]** — the originator of CC token-usage analysis (13.5k stars, MIT). Daily/monthly/session reports + statusline. CodeBurn is the multi-provider TUI evolution.
- **CodexBar** (nicklama) — macOS menubar app for OpenAI Codex usage. CodeBurn ships its own native macOS menubar app in `mac/`.

## What it tracks

**13 task categories** classified deterministically (no LLM calls): Coding, Debugging, Feature Dev, Refactoring, Testing, Exploration, Planning, Delegation, Git Ops, Build/Deploy, Brainstorming, Conversation, General. Triggers come from tool-usage patterns + user-message keywords.

**Breakdowns per period**: daily cost chart, per-project, per-model, per-activity (with one-shot rate), core tools, shell commands, MCP servers.

**One-shot rate** — the genuinely novel metric. For categories that involve code edits, CodeBurn detects edit/test/fix retry cycles (`Edit → Bash → Edit` patterns) and reports the percentage of edit turns that succeeded without retries. **Coding at 90% means the AI got it right first try 9 of 10 times.** This is a clean operationalization of [[Verification Loops]] effectiveness — and a measurable proxy for model quality on *your* workload.

## `codeburn optimize` — actionable token-waste detection

The command that elevates CodeBurn from observability to actionable optimization. Scans sessions and `~/.claude/` setup, returns ranked findings with copy-paste fixes (never writes files itself):

| Pattern | What it catches |
|---|---|
| **Re-reads** | Files Claude reads across sessions with same content, same context |
| **Low Read:Edit ratio** | Editing without reading → retries + wasted tokens |
| **Wasted bash output** | Uncapped `BASH_MAX_OUTPUT_LENGTH`, trailing noise |
| **Unused MCP servers** | Tool-schema overhead every session for servers you never invoke |
| **Ghost agents/skills/commands** | Defined in `~/.claude/` but never actually invoked |
| **Bloated `CLAUDE.md`** | Including `@-import` expansion (matches the [[Memory|200-line target]]) |
| **Cache creation overhead** | Junk directory reads breaking cache stability |

Each finding has estimated token + dollar savings, a copy-paste fix (CLAUDE.md line, env var, `mv` command), an A–F setup health grade, and classifies findings as new/improving/resolved against a 48-hour window across runs.

The "ghost skills" check is particularly useful given the size of skill collections in the ecosystem ([[claude-skills (alirezarezvani)|alirezarezvani]] alone is 235+ skills) — without measurement, install-and-forget bloat is the default.

## Reading the dashboard — diagnostic patterns

CodeBurn's README ships a "patterns to look for" table that's a reusable diagnostic framework:

| Signal | Likely meaning |
|---|---|
| Cache hit < 80% | System prompt or context isn't stable, or caching not enabled |
| Lots of `Read` calls per session | Agent re-reading same files, missing context |
| Low 1-shot rate (Coding 30%) | Agent struggling with edits, retry loops |
| Opus 4.6 dominating cost on small turns | Overpowered model for simple tasks |
| Heavy `dispatch_agent` / `task` | Sub-agent fan-out — expected or excessive |
| No MCP usage shown | Either you don't use MCPs, or your config is broken |
| Bash dominated by `git status`, `ls` | Agent exploring instead of executing |
| Conversation category dominant | Agent talking instead of doing |

This table directly maps to actionable knobs in the wiki: cache hit < 80% → [[Thariq - Prompt Caching Is Everything|Thariq's cache discipline]]; re-reads → [[Hooks|claude-mem PostToolUse compression]]; low one-shot → [[Reducing Hallucinations|verification loops]]; Bash bloat → [[rtk (rtk-ai)|rtk filtering]].

## Compare mode — model A/B from your real data

```
codeburn compare --provider claude
```

Side-by-side metrics on any two models from your own session history: one-shot rate, retry rate, self-correction rate, cost/call, cost/edit, output tokens/call, cache hit rate. **Per-category one-shot rates** so you see "Sonnet better at refactoring, Opus better at debugging" *on your codebase*. Working-style comparison (delegation rate, planning rate, tools/turn, fast-mode usage). All deterministic, no LLM calls.

This is the kind of evidence that answers "should I default to Opus or Sonnet for this work?" with personal data instead of marketing benchmarks.

## Yield (experimental) — productive vs reverted spend

```
codeburn yield -p 30days
```

Correlates AI sessions with git commits by timestamp. Categorizes as Productive (commits landed in main), Reverted (commits later reverted), Abandoned (no commits, or never merged). Output: cost and session count per category. Closes the loop on "did this AI spend actually ship?" — the closest the wiki has seen to **measurable AI ROI** at the IC level.

## Multi-provider data sources (read-only)

- **Claude Code** — JSONL at `~/.claude/projects/<sanitized-path>/<session-id>.jsonl`
- **Codex** — `~/.codex/sessions/YYYY/MM/DD/rollout-*.jsonl`
- **Cursor** — SQLite `state.vscdb` (token counts in `cursorDiskKV` with `bubbleId:` prefix; "Auto" mode hides actual model so estimated as Sonnet)
- **OpenCode** — SQLite databases at `~/.local/share/opencode/opencode*.db`
- **Pi/OMP** — JSONL at `~/.pi/agent/sessions/` and `~/.omp/agent/sessions/`
- **GitHub Copilot** — `~/.copilot/session-state/` (output tokens only — Copilot doesn't log input)

Codex tool names normalize to Claude conventions (`exec_command` → `Bash`, `read_file` → `Read`). Cross-provider activity classifier works uniformly.

## Cross-references

- [[Token Efficiency]] — adds the **measurement/observability layer** preceding the five compression layers; "you can't optimize what you don't measure"
- [[Verification Loops]] — one-shot rate is a measurable proxy for verification-loop effectiveness
- [[Reducing Hallucinations]] — one-shot rate per task category as a quality metric
- [[Memory]] — bloated-CLAUDE.md detection in `optimize` enforces the 200-line target
- [[Model Context Protocol]] — unused-MCP detection is the only feedback signal that would tell you to remove an MCP server
- [[ccusage (ryoppippi)|ccusage]] — predecessor; CodeBurn is the multi-provider TUI evolution
- [[rtk (rtk-ai)|rtk]] — `rtk gain` is the same observability-of-savings idea but scoped to RTK's own filtering
- [[Claude Code Ecosystem]] — Cost / observability subsection

## Open questions

> [!question] Yield analysis on AI-flavoured commits
> Yield correlates sessions with commits by timestamp. Doesn't yet distinguish "AI wrote this commit" from "I committed during a session that wasn't actually about this code." Heuristic, not ground truth. Worth knowing the noise floor.

> [!question] Copilot output-only tokens
> GitHub Copilot only logs output tokens; CodeBurn explicitly notes Copilot rows sit below actual API cost. Comparison to other providers is asymmetric until Copilot logs input.
