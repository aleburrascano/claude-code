---
type: source
created: 2026-04-26
updated: 2026-04-27
sources: 2
tags: [claude-code, aggregator, dashboard, analytics, discovery, marketplace]
source_path: raw/repos/davila7-claude-code-templates.md
source_date: 2026-04-27
source_url: https://github.com/davila7/claude-code-templates
source_author: Daniel Avila
license: MIT
---

# Claude Code Templates (Daniel Avila)

A curated ecosystem aggregating ready-made configurations across all Claude Code primitives, with a polished web UI and **usage analytics**. Functions as both a **discovery layer** and a **measurement system**.

For our wiki, this source pairs with [[Awesome Claude Code (hesreallyhim)]] — Awesome List is the curation/index layer, Claude Code Templates is the **install/measure** layer.

## What's in it

Six primary categories:

| Category | What |
|---|---|
| **Agents** | AI specialists (security auditors, performance optimizers, database architects) |
| **Commands** | Custom slash commands (`/generate-tests`, `/optimize-bundle`) |
| **MCPs** | Integrations with GitHub, PostgreSQL, Stripe, AWS, etc. |
| **Settings** | Behavior config (timeouts, memory parameters) |
| **Hooks** | Automation (pre-commit, post-completion) |
| **Skills** | Reusable capabilities with progressive disclosure (PDF processing, custom workflows) |

**1000+ components** aggregated as of April 2026 (confirmed via aitmpl.com header). Skills are now a 6th component type alongside Agents/Commands/MCPs/Settings/Hooks.

### Aggregated skill / agent collections

The repo's CONTRIBUTING attributions enumerate the upstream collections — many of which the wiki tracks as standalone sources. Note that **the cited counts in the README are stale** and the actual current numbers are larger:

| Source | README cite | Actual current |
|---|---|---|
| [[claude-scientific-skills (K-Dense-AI)|K-Dense-AI scientific skills]] | 139 | **133 skills** |
| [[Anthropic Skills|anthropics/skills]] (official) | 21 | 4 categories, 125k stars |
| [[Anthropic Claude Code|anthropics/claude-code]] (official) | 10 skills | configs/plugins repo, 119k stars |
| [[Superpowers (obra)]] | 14 | composable workflow skills |
| [[claude-skills (alirezarezvani)]] | 36 | **235+ skills**, 9 domains, 13k stars |
| [[agents (wshobson)]] | 48 agents | **184 agents** + 150 skills + 98 commands across 78 plugins |
| `mehdi-lamrani/awesome-claude-skills` | (cited) | **404 — repo not currently accessible** |
| NerdyChefsAI Skills | (cited) | community contribution |
| `move-code-quality-skill` | MIT | — |
| `cocoindex-claude` | Apache 2.0 | — |
| 21 commands from [[Awesome Claude Code (hesreallyhim)]] | 21 | — |

The implication for wiki readers: don't rely on the README's counts; the actual skill ecosystem is several multiples larger. Each of the larger collections has its own source page now.

## Web interface (aitmpl.com + the new Dashboard beta)

aitmpl.com is now positioned as a **curated catalog with a Stack Builder** — users browse the 1000+ components and click `+` to add to a stack for batch install. Featured partner integrations (Bright Data, TinyFish, ClaudeKit) sit alongside community contributions. **`Cmd+K` search** for fast discovery.

Several adjacent tools shipped:

| Tool | Command | Purpose |
|---|---|---|
| **Claude Code Analytics** | `--analytics` | Real-time monitoring; live state detection; performance metrics |
| **Conversation Monitor** | `--chats` (`--tunnel` for remote) | Mobile-optimized view; **Cloudflare Tunnel for secure remote access** |
| **Health Check** | `--health-check` | Diagnostics for installation optimization |
| **Plugin Dashboard** | `--plugins` | Unified marketplace + installed-plugins + permission management |

The Plugin Dashboard is the newest addition; positions Templates as a layer over the [[Plugins|native plugin system]] for users who prefer a UI to the CLI.

## Installation

```bash
npx claude-code-templates@latest
```

Browse interactively or install specific components by category.

## Author / license

Daniel Avila. MIT (with original licenses preserved for aggregated resources — MIT, Apache 2.0, CC0 1.0).

## Why this matters for our wiki

Two things make this source uniquely valuable:

### 1. The analytics layer
Most ecosystem tooling focuses on *capabilities*. Claude Code Templates ships **measurement infrastructure** — analytics, performance metrics, plugin dashboard. For [[Token Efficiency]], you need feedback. Templates' analytics is one of the few ways to get it without rolling your own.

### 2. As a discovery / install accelerator
For Alessandro: when a wiki query identifies "you should install X," Claude Code Templates is often the friendliest install path because of the polished UI and aggregated catalog.

## Tools that compete in similar territory

Per [[Awesome Claude Code (hesreallyhim)|the awesome list]], several other usage-monitoring tools exist:
- [[ccusage (ryoppippi)|ccusage]] — local CLI dashboard, 13.5k stars (now has its own wiki page)
- [[CodeBurn (AgentSeal)|CodeBurn]] — TUI dashboard + macOS menubar + `optimize` (now has its own wiki page)
- **ccflare / better-ccflare** — comprehensive web dashboard
- **ccxray** (lis186) — HTTP proxy + real-time dashboard between CC and the API
- **Claude Code Usage Monitor** (Maciek-roboblog) — terminal monitor with burn rate
- **Claudex** (Kunwar Shah) — web-based session browser with full-text search

Different tradeoffs: ccusage is lightweight CLI + statusline; CodeBurn adds optimization with copy-paste fixes; ccflare/ccxray are web-first; Claude Code Templates wraps measurement + install in the same UI. Pick based on whether you want install-discovery (Templates), actionable optimization (CodeBurn), pure measurement (ccflare/ccxray), or session browsing (Claudex).

## My assessment

Claude Code Templates is a **friendly entry point** to the ecosystem, not a power-user framework. Best for:
- Initial setup ("what should I install first?")
- Browsing and trying small components
- Casual usage measurement

For deeper measurement (request-level tracing, cost-per-skill analysis), tools like ccxray are more powerful. For deeper customization, the heavier frameworks (Superpowers, claudekit, ECC) are more comprehensive.

But as the **gateway**, this is well-positioned. Worth bookmarking.

Cross-references: [[Awesome Claude Code (hesreallyhim)]] · [[Token Efficiency]] (measurement section) · [[Claude Code Ecosystem]] · [[Plugins]]
