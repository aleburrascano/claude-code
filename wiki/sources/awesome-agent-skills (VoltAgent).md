---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [skills, catalog, multi-platform, agent-skills, ecosystem]
source_path: (no raw)
source_date: 2026-04-29
source_author: VoltAgent + community
source_url: https://github.com/VoltAgent/awesome-agent-skills
license: MIT
---

# awesome-agent-skills (VoltAgent)

A **multi-platform skill catalog** at very large scale: **1,100+ skills across 50+ organizations**, 19.4k stars, MIT. Despite the breadth, Claude is a featured platform — Anthropic contributes 17 official skills (document editing, design, testing).

For our wiki, this matters because it's **the largest skill catalog in the ecosystem** and explicitly multi-platform — useful for understanding what skills *can* look like beyond the Claude Code-only patterns.

## What it covers

The catalog includes skills from major dev orgs:

- **Anthropic** — 17 official skills (document editing, design, testing)
- **Microsoft** — 133 skills across 6 languages (.NET, Java, Python, Rust, TypeScript, etc.)
- **Sentry** — 50+ SDK-related skills
- **Vercel, Stripe, Cloudflare, Netlify, Hugging Face, fal.ai, Google** — official skills from each
- **Community contributions** — marketing, advertising, Web3, domain-specific

Total: 1,100+ skills, organized by source organization with links to detailed documentation on `officialskills.sh`.

## Multi-platform scope

The repo's positioning matters:

> "Compatible with Claude Code, Codex, Gemini CLI, Cursor, GitHub Copilot, OpenCode, Windsurf, and more."

Like [[graphify (safishamsi)]]'s 15-platform skill design, the catalog targets the **`agentskills.io` skill format** across platforms — same SKILL.md files, different host AI tools.

> "Real-world Agent Skills created and used by actual engineering teams, not mass AI-generated stuff."

This claim distinguishes it from quantity-over-quality skill lists.

## How it complements existing wiki sources

| Catalog | Scope | Star count | Distinct contribution |
|---|---|---|---|
| [[awesome-claude-code-toolkit (rohitg00)]] | Claude Code-exclusive | 1.5k | Reference implementation; copy-paste-ready |
| [[Awesome Claude Code (hesreallyhim)]] | Claude Code | (community standard) | Most-cited canonical list |
| [[Anthropic Skills]] | Anthropic-official | 125k | Reference SKILL.md format |
| [[claude-skills (alirezarezvani)]] | Claude Code | 13k | 235+ skills, persona-driven |
| [[claude-scientific-skills (K-Dense-AI)]] | Scientific domains | (specialist) | 133 scientific skills |
| **awesome-agent-skills (VoltAgent)** | **Multi-platform** | **19.4k** | **Largest, most cross-platform; official-team focus** |

The VoltAgent catalog occupies a distinct niche: **vendor-and-org-curated skills** rather than community contributions. If you're looking for "the official Stripe skill" or "the official Sentry skills," this is the catalog.

## Where this lands in the wiki

- **[[Skills]]** — community-scale skill collection landscape; this is now the largest entry
- **[[Skill Building]]** — the 17 Anthropic skills here are reference implementations
- **[[Claude Code Ecosystem]]** — under "Skill / agent collections"
- **[[Agentic Search vs RAG]]** (peripheral) — multi-platform skill catalogs are an alternative to per-platform retrieval

## Open questions

> [!note] Cross-catalog dedup
> Because VoltAgent + alirezarezvani + wshobson all aggregate skills, there's likely overlap. A future lint pass: cross-check which skills appear in multiple catalogs (Anthropic-official ones, in particular) — the dedup story is worth understanding before adopting.

## Cross-references

- [[Skills]] · [[Skill Building]] · [[Anthropic Skills]]
- [[awesome-claude-code-toolkit (rohitg00)]] (sibling catalog, Claude Code-exclusive)
- [[claude-skills (alirezarezvani)]] · [[agents (wshobson)]] · [[claude-scientific-skills (K-Dense-AI)]] (the other community-scale catalogs)
- [[graphify (safishamsi)]] (analogous multi-platform skill design)
- [[Claude Code Ecosystem]]
