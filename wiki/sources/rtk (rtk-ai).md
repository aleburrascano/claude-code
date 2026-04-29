---
type: source
created: 2026-04-27
updated: 2026-04-27
sources: 1
tags: [claude-code, hooks, token-efficiency, cli-proxy, output-compression, rust]
source_path: raw/repos/rtk-ai-rtk.md
source_date: 2026-04-27
source_author: rtk-ai (Patrick Szymkowiak, Florian Bruniaux, Adrien Eppling)
source_url: https://github.com/rtk-ai/rtk
license: MIT
---

# rtk (rtk-ai)

A **CLI proxy that compresses tool-output tokens** before they reach the LLM context. Single Rust binary, <10ms overhead, 100+ supported commands, 12 supported AI tools. Installs as a `PreToolUse` hook that transparently rewrites Bash commands (`git status` → `rtk git status`) so Claude never sees the rewrite — it just gets compressed output.

For our wiki, RTK adds a **new named layer** to the [[Token Efficiency|token-efficiency stack]]: tool-output filtering, sitting alongside (not competing with) prompt caching, AST graphs, sandboxing, and memory compression. RTK is also a **second canonical example of "hooks as token-efficiency lever"** alongside [[claude-mem (thedotmack)|claude-mem]] — but at the opposite end of the loop (PreToolUse rewrite vs PostToolUse compression).

## Headline claim — 30-min Claude Code session

| Operation | Frequency | Standard | rtk | Savings |
|---|---|---|---|---|
| `ls` / `tree` | 10× | 2,000 | 400 | -80% |
| `cat` / `read` | 20× | 40,000 | 12,000 | -70% |
| `grep` / `rg` | 8× | 16,000 | 3,200 | -80% |
| `git status` | 10× | 3,000 | 600 | -80% |
| `git diff` | 5× | 10,000 | 2,500 | -75% |
| `git log` | 5× | 2,500 | 500 | -80% |
| `git add/commit/push` | 8× | 1,600 | 120 | **-92%** |
| `cargo test` / `npm test` | 5× | 25,000 | 2,500 | **-90%** |
| `pytest` | 4× | 8,000 | 800 | **-90%** |
| `go test` | 3× | 6,000 | 600 | **-90%** |
| **Total** | | **~118,000** | **~23,900** | **-80%** |

Caveat (the README's own): "Estimates based on medium-sized TypeScript/Rust projects. Actual savings vary by project size."

## How it works

```
Without rtk:                              With rtk:
Claude --git status--> shell --> git      Claude --git status--> RTK --> git
        ~2,000 tokens (raw)                       ~200 tokens (filtered)
```

The hook runs at `PreToolUse` on Bash commands and rewrites the call. RTK runs the real command, applies command-specific filters, and returns the compact output. **Claude never sees the rewrite or the raw output.**

Four strategies applied per command type:
1. **Smart filtering** — strips noise (comments, whitespace, boilerplate)
2. **Grouping** — aggregates similar items (files by directory, errors by type)
3. **Truncation** — keeps relevant context, cuts redundancy
4. **Deduplication** — collapses repeated log lines with counts

## Tee recovery (the smart fail-open design)

When a command fails, RTK saves the **full unfiltered output** to disk and surfaces a path:

```
FAILED: 2/15 tests
[full output: ~/.local/share/rtk/tee/1707753600_cargo_test.log]
```

Claude can `cat` the saved log without re-executing — no work lost, no spurious re-runs. Configurable per project (`mode = "failures" | "always" | "never"`). This is a meaningful design choice: **failure is exactly when you want full context**, and RTK gives it back without forcing a retry that might consume more tokens than the original run.

## Scope honesty (worth respecting)

The README is explicit about what RTK does *not* cover:

> "the hook only runs on Bash tool calls. Claude Code built-in tools like `Read`, `Grep`, and `Glob` do not pass through the Bash hook, so they are not auto-rewritten."

Operational implication: to get RTK filtering on file reads, you must either call `rtk read` / `rtk grep` / `rtk find` explicitly, or shell out (`cat` / `rg` / `find`) instead of using Claude's built-in tools. Doesn't conflict with the [[Hooks|hook system]] — it just doesn't reach where hooks can't see.

## Command coverage

100+ commands across categories. Breadth is the differentiator vs. ad-hoc per-project filters:

- **Files** — `ls`, `read`, `find`, `grep`, `diff`, plus `smart` (2-line code summary) and `read -l aggressive` (signatures only, strips bodies)
- **Git** — full surface: `status`, `log`, `diff`, `add`, `commit`, `push`, `pull` — with the highest single-command savings (`git push` 200→10 tokens = -95%)
- **GitHub CLI** — `gh pr list/view`, `gh issue list`, `gh run list`
- **Test runners** — Jest, Vitest, Playwright, pytest, go test, cargo test, RSpec, minitest. Failures-only mode is the default for most. -90% claims for pytest/go test/cargo test.
- **Build & lint** — ESLint, Biome, tsc, Next build, Prettier, cargo build/clippy, ruff, golangci-lint, rubocop
- **Package managers** — pnpm, pip (auto-detects `uv`), bundle, prisma
- **AWS** — sts, ec2, lambda (strips secrets), logs, cloudformation, dynamodb (unwraps type annotations), iam (strips policy docs), s3
- **Containers** — docker (ps, images, logs deduplicated), docker compose, kubectl (pods/logs/services)
- **Data & analytics** — `json` (structure without values), `deps`, `env -f` (filtered env), `log` (deduplicated), `curl` / `wget` (truncate + save full), `summary` (heuristic), `proxy` (raw passthrough + tracking)

For commands without a dedicated filter, `rtk err <cmd>` and `rtk test <cmd>` are generic wrappers — extract errors/failures from anything. `rtk proxy <cmd>` is the escape valve: passes raw output through but counts tokens for analytics.

## Built-in observability — `rtk gain` and `rtk discover`

```
rtk gain                    # summary stats
rtk gain --graph            # ASCII graph (last 30 days)
rtk gain --history          # recent command history
rtk gain --daily            # day-by-day breakdown
rtk gain --all --format json # JSON export

rtk discover                # find missed savings opportunities
rtk discover --all --since 7
rtk session                 # show RTK adoption across recent sessions
```

This is the closest thing the wiki has seen to a **token-efficiency feedback loop built into a tool**. Most wiki-listed measurement tools (CC Usage, ccflare, ccxray) measure session-level cost from the outside; RTK measures per-command savings from inside. `rtk discover` is particularly interesting — it identifies commands you ran without `rtk` that *could have been* compressed, surfacing low-hanging fruit.

## Cross-platform AI tool support

| Tool | Method |
|---|---|
| Claude Code | `PreToolUse` hook (Bash) — full auto-rewrite |
| GitHub Copilot (VS Code) | PreToolUse hook |
| GitHub Copilot CLI | PreToolUse deny-with-suggestion (CLI limitation) |
| Cursor | `preToolUse` hook (`hooks.json`) |
| Gemini CLI | `BeforeTool` hook |
| Codex (OpenAI) | `AGENTS.md` + `RTK.md` instructions |
| Windsurf | `.windsurfrules` (project-scoped) |
| Cline / Roo Code | `.clinerules` (project-scoped) |
| OpenCode | Plugin TS (`tool.execute.before`) |
| Kilo Code | `.kilocode/rules/rtk-rules.md` (project-scoped) |
| Antigravity | `.agents/rules/antigravity-rtk-rules.md` |
| OpenClaw | Plugin TS (`before_tool_call`) |

The PreToolUse-rewrite mechanism only works where the host tool exposes that lifecycle event. For tools without it (Codex, Windsurf, Cline, Kilo, Antigravity), RTK falls back to **rules-injection mode**: it adds RTK.md to the project's instructions so the agent *learns* to use `rtk` prefixes — less reliable than transparent rewriting, but degrades gracefully.

## Windows note (relevant to Alessandro)

Native Windows: hook does **not** auto-rewrite (no Unix shell). Falls back to CLAUDE.md injection mode — Claude is told about RTK but commands aren't rewritten. To get full functionality on Windows, use **WSL**. Filters and `rtk gain` analytics work either way.

| Feature | WSL | Native Windows |
|---|---|---|
| Filters | Full | Full |
| Auto-rewrite hook | Yes | No (CLAUDE.md fallback) |
| `rtk init -g` | Hook mode | CLAUDE.md mode |
| `rtk gain` / analytics | Full | Full |

## Where this sits in the token-efficiency stack

RTK is a **new named layer** the wiki hasn't had a tool for:

| Layer | What it compresses | Reference |
|---|---|---|
| Prompt caching | The cached prompt prefix | [[Thariq - Prompt Caching Is Everything]] |
| AST graphs | Codebase structural context | [[code-review-graph (tirth8205)]] |
| Sandboxing | The system prompt itself | [[Sandboxing]] (84% reduction) |
| **Tool-output filtering** | **Bash command stdout/stderr** | **RTK** ← this page |
| Memory compression | Cross-session history | [[claude-mem (thedotmack)]] |

These are **multiplicative**, not competing. They target different sources of context bloat:
- Prompt caching makes re-sending cheap; doesn't reduce what you read.
- AST graphs reduce *what you ask Claude to read* (codebase scoping).
- Sandboxing reduces the *system-prompt overhead*.
- **RTK reduces the firehose of raw command output that hits context every Bash call.**
- claude-mem reduces *cross-session* history.

For Alessandro's primary focus area ([[Token Efficiency]]), RTK is among the strongest single levers in the wiki — the 60-90% claims are per-command and apply to commands Claude runs constantly.

## Pattern: hooks as token-efficiency levers

RTK + claude-mem are two faces of the same architectural pattern — using [[Hooks]] to insert compression into the agentic loop:

| Hook event | Pattern | Example |
|---|---|---|
| **PreToolUse** | Rewrite the call | RTK (`git status` → `rtk git status`) |
| **PostToolUse** | Compress the result | claude-mem (record observations into memory) |

Both are **transparent to Claude** — neither requires Claude to know the hook is there. Both pay the latency cost outside the LLM's perception. Both turn what would otherwise be lost context into structured savings.

This is worth lifting as a **design pattern**, not just an artifact: anywhere there's a verbose deterministic transform between the agent and the world, a hook that performs it can shave context without touching the agent's logic. See [[Hooks]] for further development of this pattern.

## Telemetry — notably transparent (worth flagging)

Opt-in by default (GDPR Art. 6/7 compliant). Collects:
- Salted device hash (SHA-256, not reversible)
- RTK version, OS, architecture
- Command counts, tokens saved
- Top 5 passthrough commands (no args, just tool names like "git", "cargo")
- Parse failure counts
- Estimated USD savings

**Does not collect**: source code, file paths, command arguments, secrets, environment variables, repository contents.

```
rtk telemetry status
rtk telemetry enable
rtk telemetry disable
rtk telemetry forget    # withdraw + delete local + request server-side erasure
```

Plus an env-var override (`RTK_TELEMETRY_DISABLED=1`) that blocks regardless of consent state. This is a stricter-than-typical telemetry posture for a tool in this category — worth noting as a model.

## Installation

```bash
brew install rtk                                       # macOS
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh   # Linux/macOS
cargo install --git https://github.com/rtk-ai/rtk      # any
# Pre-built Windows binary: rtk-x86_64-pc-windows-msvc.zip from releases

rtk init -g       # install hook + RTK.md (Claude Code default)
# restart Claude Code
git status        # auto-rewrites to: rtk git status
```

Verify with `rtk --version` (current: 0.28.2) and `rtk gain` (shows token savings stats).

> **Name collision**: another project named "rtk" (Rust Type Kit) exists on crates.io. If `rtk gain` fails after `cargo install rtk`, you have the wrong package — use `cargo install --git` above.

## Configuration

`~/.config/rtk/config.toml`:

```toml
[hooks]
exclude_commands = ["curl", "playwright"]   # skip rewrite for these

[tee]
enabled = true
mode = "failures"   # "failures" | "always" | "never"
```

Per-project filters supported (full reference: rtk-ai.app/guide/getting-started/configuration).

## Limitations / tradeoffs

- **Bash-only auto-rewrite.** Claude's built-in `Read`/`Grep`/`Glob` bypass the hook. To filter those workflows, shell out or call `rtk read`/`rtk grep`/`rtk find` explicitly. Honest scope, not a defect.
- **Native Windows degrades.** Hook requires Unix shell. WSL recommended for full functionality.
- **Filter quality varies by command.** Generic `rtk err <cmd>` / `rtk test <cmd>` wrappers fall back to heuristics for commands without dedicated filters. The 60-90% headline applies to commands with dedicated filters.
- **Tool-call lifecycle event must exist on host.** Only ~half the supported AI tools get full hook-based rewriting; others use rules injection (less reliable).

## My assessment

For Alessandro's #1 focus area ([[Token Efficiency]]), RTK is the **strongest single lever in the "tool-output" layer** that the wiki has surfaced — and that layer was previously unnamed. The 80% session-level reduction is concrete and per-command savings compound across a long agentic session.

Where RTK fits cleanly:
1. **Daily Claude Code use, multi-language projects.** Test/lint/build commands are where the biggest savings live (-90% for cargo test / pytest / go test). If you run any of those frequently, install RTK.
2. **Long-running sessions on the 1M model.** RTK compounds with [[Thariq - Prompt Caching Is Everything|prompt caching]] to delay [[Token Efficiency|context-rot zones]]. Multiplicative, different layers.
3. **Pair-with-`rtk discover`** — its built-in observability (`rtk gain` / `rtk discover`) is itself a token-efficiency feedback loop. Run it weekly to find missed opportunities.

Where RTK doesn't help much:
- One-off scripted runs where Bash output is small to begin with.
- Workflows dominated by `Read`/`Grep`/`Glob` (Claude's built-in tools bypass the hook).
- Native Windows without WSL — degraded to instructions-only mode.

Architectural note: RTK is also worth studying as a **clean implementation of the PreToolUse-rewrite pattern**. Most discussion of [[Hooks]] in the wiki centers on guardrails (block dangerous calls) and quality gates (lint after write). RTK shows the same primitive used as a **token-efficiency transformer**. The pattern generalizes: any deterministic noise-stripping transform between agent and world can sit in a PreToolUse / PostToolUse hook.

For the wiki: this source page promotes RTK to canonical-example status alongside [[claudekit (Carl Rannaberg)]] (quality-gate hooks) and [[claude-mem (thedotmack)]] (memory hooks).

Cross-references: [[Token Efficiency]] · [[Hooks]] · [[Claude Code Ecosystem]] · [[claude-mem (thedotmack)]] · [[code-review-graph (tirth8205)]] · [[Thariq - Prompt Caching Is Everything]] · [[Reducing Hallucinations]] · [[Sandboxing]]
