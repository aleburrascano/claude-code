---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, framework, role-based, parallel, multi-vendor]
source_url: https://github.com/garrytan/gstack
source_author: Garry Tan (President & CEO, Y Combinator)
license: MIT
---

# gstack (Garry Tan)

A 41+ skill framework that **replicates how experienced engineering teams operate** by assigning distinct roles — CEO, designer, engineer, QA lead, security officer — each with specific responsibilities and decision authority. **84k stars** per [[shanraisshan Claude Code Best Practice|shanraisshan]].

By [[Garry Tan]] (President + CEO of YC, ex-Palantir, co-founder of Posterous). Institutional credibility makes the methodology claims worth taking seriously.

## The 7-stage sprint cycle

| Phase | Skills |
|---|---|
| **Think** | `/office-hours` (product interrogation), `/plan-ceo-review` (challenge scope) |
| **Plan** | `/plan-eng-review`, `/plan-design-review` (rates 0-10), `/plan-devex-review` |
| **Build** | `/design-consultation`, `/design-shotgun` (4-6 variants), `/design-html` (mockup→production) |
| **Review & Test** | `/review` (staff-engineer audit), `/investigate` (root-cause), `/qa` (browser tests + auto-fix), `/cso` (OWASP+STRIDE) |
| **Ship** | `/ship` (test-first release), `/land-and-deploy`, `/canary` (post-deploy health) |
| **Reflect** | `/retro` (multi-project retrospectives) |
| **Cross-cutting** | `/browse` (real Chromium), `/pair-agent` (multi-vendor coordination), `/codex` (independent OpenAI review) |

Each stage feeds outputs into subsequent stages. Sequential structure prevents gaps.

## Distinctive contributions

### Role-based skill model
Most frameworks have skill-per-task. gstack has skill-per-role-per-phase. The CEO/designer/engineer/QA/security role split is more legible to humans and produces specific named perspectives.

### Multi-vendor agent coordination (`/pair-agent`)
Different AI vendors (OpenClaw, Hermes, Codex) share a browser with **tab isolation, scoped tokens, activity attribution**. Most frameworks are Claude-only; gstack treats AI as multi-vendor by default. Genuinely novel.

### Taste Memory Learning (`/design-shotgun`)
Generates 4-6 design variants. Learns user preferences across iteration rounds, biasing toward historically selected directions. **Skill that learns** — adjacent to [[Everything Claude Code (affaan-m)|ECC's instinct system]].

### Layered prompt-injection defense
22MB ML classifier + Claude Haiku transcript verification + random canary tokens + optional DeBERTa ensemble voting. **Defense in depth at the prompt level**, not just the tool level. More aggressive than typical adversarial-prompt protection.

### Safety guardrails
- `/careful` — warns before destructive
- `/freeze` — restricts edits to specific directories
- `/guard` — combines both for production work

### GBrain (persistent knowledge base)
Optional Supabase or local PGLite. Per-repository trust policies (read-write, read-only, deny). Conceptually adjacent to [[claude-mem (thedotmack)|claude-mem]] but with explicit per-repo trust model.

## Productivity claim

> "2026 logical-line pace represents approximately 810× my 2013 pace" (normalized for AI expansion).

Take with appropriate salt — but author has both the metric and the institutional position to make the claim credibly.

## Installation

30-second setup: clones to `~/.claude/skills/gstack`, runs `./setup`. **Team mode** bootstraps projects so all collaborators receive automatic updates.

Cross-platform: 10+ AI agents (CC, Codex, Cursor, Factory Droid, Slate, Kiro, Hermes, GBrain, OpenCode).

## My assessment

gstack's most unique contributions:

1. **Role-based skill organization** — CEO/designer/engineer/QA/security model is legible and forces clear domain ownership. Worth lifting whether or not you adopt the rest.

2. **Multi-vendor agent coordination via `/pair-agent`** — the only framework treating AI as multi-vendor by default. As multiple AI tools mature, this pattern becomes more important.

3. **Layered prompt-injection defense** — the most aggressive adversarial-content protection in the wiki's coverage. Pair with [[Everything Claude Code (affaan-m)|AgentShield]] for defense in depth.

4. **GBrain per-repo trust policies** — explicit trust model for cross-session memory. Important when memory ages and may not still be accurate (per [[Memory|"stale memories must be verified"]]).

Productivity claims are bold; YC president's institutional weight makes them at least worth investigating. The framework is heavy (41+ skills + 7 stages); best for users committed to systematic role-based development.

Cross-references: [[Garry Tan]] · [[Skills]] · [[Subagents]] · [[Memory]] · [[Reducing Hallucinations]] · [[Token Efficiency]] · [[Claude Code Ecosystem]]
