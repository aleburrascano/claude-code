---
type: source
created: 2026-04-27
updated: 2026-04-27
sources: 1
tags: [token-efficiency, observability, cost-tracking, multi-provider, statusline, cli]
source_path: (no raw — discovered via hyperlink in raw/repos/getagentseal-codeburn.md)
source_date: 2026-04-27
source_author: ryoppippi
source_url: https://github.com/ryoppippi/ccusage
license: MIT
---

# ccusage (ryoppippi)

The **originator of the Claude Code cost-observability tooling lineage**: 13.5k stars, 109 releases (latest v18.0.11 April 2026), 1,162+ commits. Cited as direct inspiration in [[CodeBurn (AgentSeal)]]'s credits.

## Why it matters for the wiki

ccusage is the simpler, longer-running predecessor to CodeBurn. The wiki should track it because:

1. **It's where this entire category started.** Before ccusage, there was no standard tool for "where did my Claude Code tokens go?"
2. **It pioneered the read-from-disk-no-API-keys pattern** that CodeBurn, CodexBar, and the broader ecosystem now share — avoiding the latency, security, and rate-limit overhead of API-based cost tracking.
3. **It ships a statusline mode** — `ccusage statusline` — directly relevant to [[Claude Code|Claude Code statusline customization]] for "what did today cost?" at a glance.
4. **It now has a multi-provider package family**, not just Claude.

## Commands

```bash
npx ccusage@latest          # Daily report (default)
npx ccusage monthly         # Monthly aggregation
npx ccusage session         # By conversation
npx ccusage blocks          # 5-hour billing windows
npx ccusage statusline      # Compact status-line output
```

Filters: `--since`, `--until`, `--json`, `--breakdown`, `--timezone`, `--locale`, `--compact`, `--instances`.

## Multi-provider package family

A pattern worth noting: each provider gets its own npm sibling package, not flags on a monolith.

- `@ccusage/codex` — OpenAI Codex
- `@ccusage/opencode` — OpenCode
- `@ccusage/pi` — pi-agent
- `@ccusage/amp` — Amp
- `@ccusage/mcp` — MCP server integration

This contrasts with [[CodeBurn (AgentSeal)|CodeBurn]]'s monolith-with-`--provider`-flag approach. ccusage trades discoverability for surface area — different design philosophy, same goal.

## Distinguishing features

- **Historical analysis** — daily/monthly with date-range filtering
- **5-hour billing-window blocks** with active monitoring (Claude API quota windows)
- **Per-model cost visibility** — input, output, cache create, cache read tracked separately
- **Offline pricing** — pre-cached, no network required
- **Multi-instance grouping** — track usage by project
- **Minimal footprint** — extremely small bundle size, npx-only is the canonical run mode

## Position vs CodeBurn

| Dimension | ccusage | [[CodeBurn (AgentSeal)|CodeBurn]] |
|---|---|---|
| **Style** | Minimal CLI / statusline | Full TUI dashboard + macOS menubar |
| **Providers** | Sibling packages | Single tool, `--provider` flag |
| **One-shot rate** | No | Yes (per task category) |
| **Optimize / health** | No | Yes (`codeburn optimize` with copy-paste fixes) |
| **Compare** | No | Yes (model A/B from real data) |
| **Yield (productive vs reverted)** | No | Yes (experimental) |
| **Stars** | 13.5k | New |
| **Audience** | "Quick check what today cost" | "Where am I wasting tokens, fix it" |

The split is healthy: ccusage is the lightweight statusline + reports; CodeBurn is the analytical / optimization layer.

## Cross-references

- [[CodeBurn (AgentSeal)]] — explicit successor; CodeBurn cites ccusage in credits
- [[Token Efficiency]] — ccusage and CodeBurn both fill the observability/measurement layer
- [[Claude Code]] — `ccusage statusline` is canonical for the CC statusline integration
- [[rtk (rtk-ai)|rtk]] — `rtk gain` is filtering-scoped observability vs ccusage's full-session view
- [[Claude Code Ecosystem]] — Cost / observability subsection
