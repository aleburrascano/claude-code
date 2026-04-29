---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, awesome-list, ecosystem-index, meta-source]
source_path: raw/repos/hesreallyhim-awesome-claude-code.md
source_date: 2026-04-26
source_author: hesreallyhim
source_url: https://github.com/hesreallyhim/awesome-claude-code
---

# Awesome Claude Code (hesreallyhim)

The **canonical index of the Claude Code ecosystem**. A curated list — not a dump — of 150+ skills, agents, plugins, hooks, slash commands, workflows, status lines, IDE integrations, and CLAUDE.md examples. Annotations are opinionated and informative (the author clearly uses what they list). For this wiki, this source functions as the meta-source: it points to the primary sources for nearly every other repo we cover.

The companion topic page [[Claude Code Ecosystem]] organizes these resources by theme; this source page captures the structure of the awesome list itself and notes where it's authoritative.

## Top-level categories

- **Agent Skills** — General-purpose skill collections
- **Workflows & Knowledge Guides** — General + Teams + Ralph Wiggum subsection
- **Tooling** — General + IDE Integrations + Usage Monitors + Orchestrators + Config Managers
- **Status Lines**
- **Hooks**
- **Slash Commands** — Subdivided by purpose (Git, Code Analysis, Context Loading, Documentation, CI/Deployment, Project Management, Misc)
- **CLAUDE.md Files** — Language-Specific + Domain-Specific + Project Scaffolding & MCP
- **Alternative Clients** — Mobile/desktop UIs over Claude Code
- **Official Documentation**

## Standout entries (deep-dived in this wiki)

These have dedicated source pages of their own:

- [[Context Engineering Kit (NeoLabHQ)]] — Spec-Driven Development, Subagent-Driven Development, Reflexion, FPF reasoning
- [[Encyclopedia of Agentic Coding Patterns]] — 245 entries from Wolf McNally
- [[Claude Code System Prompts (Piebald)]] — Claude Code's actual system prompts and tool descriptions, version-tracked
- [[Superpowers (obra)]] — Composable skills + methodology by Jesse Vincent
- [[claudekit (Carl Rannaberg)]] — 20+ subagents and hook-based quality gates
- [[Compound Engineering Plugin]] — EveryInc's mistake-into-lesson framework
- [[Claude Code Infrastructure Showcase (diet103)]] — Hooks for intelligent skill activation
- [[TACHES Claude Code Resources]] — Meta-skills (skill-auditor, hook creation)
- [[Learn Claude Code (shareAI-lab)]] — Reverse-engineering Claude Code into ~500 lines/session of Python
- [[Claude Code Tips (ykdojo)]] — 45 tips on context, tokens, multi-model, containers

## Notable entries in scope but not yet deep-dived

Worth queuing for future ingest if/when relevant:

- **Claude Code Templates** (Daniel Avila) — Companion repo to the awesome list with dashboard/analytics UI.
- **Claude Code PM** (Ran Aroussi) — Project-management workflow with specialized agents.
- **claude-code-tools** (Prasad Chalasani) — Session continuity with cross-agent handoff Claude↔Codex; Tantivy-powered full-text session search.
- **ContextKit** (Cihat Gündüz) — 4-phase planning methodology with quality agents.
- **Claude Code Repos Index** (Daniel Rosehill) — 75+ Claude Code repos by one author, covering CMS, system design, deep research, IoT, agentic workflows.
- **Trail of Bits Security Skills** — 12+ professional security skills (CodeQL, Semgrep, variant analysis, fix verification).
- **Fullstack Dev Skills** (jeffallan) — 65 skills + the `/common-ground` command (surfaces Claude's hidden assumptions). The command itself is directly on-point for [[Reducing Hallucinations]].
- **Encyclopedia… aipatternbook.com** — Already deep-dived but worth noting it's free web access.
- **Anthropic Quickstarts**, **Claude Code GitHub Actions** — Official docs.
- **claudekit-style hook collections**: TDD Guard, parry (prompt injection scanner), Dippy (auto-approve safe bash via AST).

## Lower-priority categories (per our [[CLAUDE|wiki schema's Focus]])

The following sections of the awesome list are skimmed but not expanded into the wiki:

- **Status Lines** — Mostly cosmetic. CC Usage, ccflare, claude-pace are usage-monitoring-adjacent and could matter if [[Token Efficiency]] needs measurement infrastructure.
- **IDE Integrations** — Wrappers around Claude Code in editors. Useful but doesn't move the needle on our focus areas.
- **Alternative Clients** — Crystal, Omnara, Happy Coder, etc. Workflow conveniences, not capability extensions.
- **CLAUDE.md Files (Language-Specific)** — Project-specific examples. Useful as templates but not load-bearing for understanding [[Memory]] design.

## On the curation philosophy

The awesome list's contribution model is unusual: "the only person who is allowed to submit PRs to this repo is Claude." Submissions go through a recommendation system rather than direct PR. This implies the list is itself a Claude Code-managed artifact — a useful proof-of-concept that LLM-curated indices can stay maintained.

The annotations are also notable for being **opinionated and warm** (humor, personal asides, occasional skepticism). This makes the list more readable than a typical awesome list, but also means Alessandro should treat the framings as one curator's judgment, not consensus.

## License

CC BY-NC-ND 4.0 — fork and redistribute with attribution; no modifications, no commercial use. Note that listed resources have their own (typically MIT) licenses.

## My assessment

This is the right anchor for the wiki's coverage of the Claude Code ecosystem. New ingests can use it as a discovery layer, then drop down into specific repo READMEs (as we did for the 10 deep-dives). When new resources appear here over time, they're worth at least skimming for fit with our focus areas.

Cross-references: [[Claude Code Ecosystem]] · [[hesreallyhim]] (curator) · all 10 deep-dive source pages · [[Claude Code]]
