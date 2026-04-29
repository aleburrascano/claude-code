---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, framework, spec-driven, tdd, dashboard, commercial]
source_url: https://github.com/maxritter/claude-codepro
source_author: Max Ritter
license: Commercial / source-available
aliases: [Claude CodePro]
---

# Pilot Shell (formerly Claude CodePro)

A **commercial source-available** framework that layers spec-driven planning, TDD enforcement, persistent cross-session knowledge, and quality automation on top of Claude Code. Tagline: "Make Claude Code production-ready."

> **Naming note**: The repo at `maxritter/claude-codepro` resolves to the renamed product **Pilot Shell**. Wiki entries reference both names.

By Max Ritter. Three commercial tiers: Solo, Team (multi-seat + extension sharing), Enterprise (source code access).

## Distinctive contributions

### Pilot Console — local web dashboard at `localhost:41777`
10 views: session management, memory browsing, spec tracking, requirements docs, extension management, change reviewing, **usage analytics**, settings. **All local SQLite, no cloud transmission.**

This is among the most polished management UIs in the ecosystem. Pairs with [[Claude Code Templates (Daniel Avila)|Claude Code Templates]] and [[Awesome Claude Code (hesreallyhim)|ccflare/ccxray]] for measurement infrastructure.

### Pilot Bot — 24/7 automation agent
Scheduled tasks, background jobs, heartbeat monitoring. Optional **Telegram integration** for bidirectional mobile messaging. Adjacent to [[Routines|Anthropic's Routines]] but locally hosted.

### Status line (3 lines)
Active model, context usage with progress indicators, lines changed, git status, cost tracking, spec progress, **token savings**.

### Quality hooks pipeline
**15 hooks across 7 events** — linting (ruff/ESLint), formatting, type checking, test execution at every file edit. Python (ruff), TypeScript/JavaScript (ESLint), Go (go vet).

### `/spec` command — replaces built-in plan mode
Detects feature vs bugfix automatically:

**Feature mode** flow:
- Planning: codebase exploration via **semantic search**, clarifying questions, detailed spec, **E2E test scenario generation**, spec-review validation
- Implementation: **isolated git worktree**, strict TDD red-green-refactor, quality hooks every edit
- Verification: full test suite, unified review subagent, browser-based E2E testing

**Bugfix mode** flow:
- Reproduce → trace backward through call chains → identify root cause at file:line → write regression test that fails on current code → minimal fix → verify

This bidirectional mode (feature vs bugfix) is novel and well-designed. Most spec-driven frameworks treat all work as feature dev.

### Cross-session memory with session linking
Persistent memory as **saved observations** (decisions, discoveries, bugfixes) tracked across sessions and browsable. Each memory entry **links to its originating session**, enabling navigation back to context. Unlike [[Memory|Claude Code's auto-memory]] (conversation-context capture), Pilot's is **explicitly categorized + searchable**.

### Semantic search via Probe + CodeGraph
"Probe" CLI for semantic code search; "CodeGraph" for structural analysis. Combined for context-aware planning.

> [!note] Tension with [[Agentic Search vs RAG|Boris's "agentic search > RAG"]] claim
> Pilot Shell uses semantic (vector-based) search. Boris explicitly recommends agentic search (`glob` + `grep`) for code. Pilot may work well in domains where vector search is appropriate (long-form code understanding); the tradeoff is worth knowing.

## Installation

Single bash command (macOS, Linux, Windows WSL2). 7-step installer. Sub-2-minute install with rollback on failure. Dev Container support.

## License

**Commercial** with three tiers. Source-available (Enterprise). Notable as one of the few commercial frameworks in the Claude Code ecosystem (most are MIT).

## My assessment

Pilot Shell is the **most polished commercial offering** in our wiki's coverage. The Console UI + Bot + status line + quality pipeline together represent more polish than any single OSS framework.

For Alessandro's focus areas:
- **Cross-session memory with session-linking** is a novel pattern worth understanding even if you don't adopt the commercial product. The principle: memories should link back to their context for verification.
- **Bugfix mode** is uniquely well-designed. The reproduce → trace → root-cause → regression test pattern is worth lifting into your own bugfix discipline.
- The **15 hooks across 7 events** is dense quality enforcement. Compare with [[claudekit (Carl Rannaberg)|claudekit's hook architecture]] for OSS alternative.

Caveat: commercial pricing matters. Free alternatives ([[claudekit (Carl Rannaberg)|claudekit]] for hooks, [[Compound Engineering Plugin|Compound Engineering]] for `/ce-*` workflow, [[Spec Kit (github)|Spec Kit]] for spec-driven dev) cover much of the same ground individually if you're willing to assemble.

Cross-references: [[Spec-Driven Development]] · [[Test-Driven Development with Claude]] · [[Memory]] · [[Token Efficiency]] · [[Hooks]] · [[Routines]] · [[Agentic Search vs RAG]] · [[Claude Code Ecosystem]]
