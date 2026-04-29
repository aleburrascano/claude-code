---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, context-engineering, planning, framework, quality-agents]
source_url: https://github.com/FlineDev/ContextKit
source_author: Cihat Gündüz
license: MIT
---

# ContextKit (Cihat Gündüz)

A systematic 4-phase planning + execution framework. Tagline: "AI assistants are reactive, not proactive. You have to spoon-feed them every single step." ContextKit's bet is that **structured planning artifacts make AI proactive** — the AI works autonomously within parameters you defined upfront, instead of needing constant course correction.

For our wiki, ContextKit is the canonical primary for **explicit phased planning** — more granular than [[Spec-Driven Development|SDD]] in general, with named quality agents per phase.

## The 4 phases

### Phase 1 — Business Case
What you're building and why. User stories, acceptance criteria, success metrics, **explicit scope boundaries**. No premature technical decisions.

### Phase 2 — Technical Architecture
Implementation strategy: technology choices, architectural patterns, accessibility, localization, with **constitutional compliance checks** (governance from prior project setup).

### Phase 3 — Implementation Tasks
Granular, **numbered steps S001–S999** with parallel execution markers and dependency chains. Enables precise communication and resumption across sessions.

### Phase 4 — Development
Execute the approved plan with **supervised autonomy** — specialized quality agents handle checks while you maintain oversight.

For smaller changes, the **Quick Workflow** compresses these into a single interactive step (good for bug fixes and focused refactoring).

## The quality agents

Specialized subagents that operate during development:

| Agent | What it does |
|---|---|
| `build-project` | Executes builds, reports results without flooding context |
| `run-test-suite` / `run-specific-test` | Tests with structured failure reporting |
| `check-accessibility` | VoiceOver labels, contrast, keyboard navigation |
| `check-localization` | String Catalog integrity, regional formatting |
| `check-error-handling` | Typed throws, user-friendly messaging |
| `check-modern-code` | Replace deprecated APIs and patterns |
| `check-code-debt` | Remove AI artifacts, consolidate duplication |

Notable: many quality agents are **iOS / Apple ecosystem** focused (accessibility, localization, modern Swift) — ContextKit has roots in Apple-platform development.

## Persistent artifacts

Features are organized in chronologically numbered folders containing:
- `Spec.md`
- `Tech.md`
- `Steps.md`

These survive chat-context limits — when the session ends or compacts, the artifacts persist. New sessions can resume from the artifacts. Same insight as [[Compound Engineering Plugin|/ce-compound]] and [[Memory|CLAUDE.md]] — externalize critical state from conversation into files.

A `Context.md` file documents the entire project structure as **source of truth** for every subsequent operation. Conceptually adjacent to [[jeffallan claude-skills|/common-ground]]'s output but more comprehensive.

## Key commands

- `/ctxk:plan:1-spec` — requirements definition
- `/ctxk:plan:2-research-tech` — architecture planning
- `/ctxk:impl:start-working` — supervised development execution
- `/ctxk:proj:init` — auto-detects technology, configures setup

## Installation

Shell script: download and execute install script globally; then `/ctxk:proj:init` in project directory.

## Author / License

Cihat Gündüz (FlineDev). MIT.

## Why this matters for our wiki

ContextKit's contribution is the **granularity of phased planning + the named quality-agent suite per phase**. Most SDD-style frameworks have 3-4 phases; ContextKit pushes to 4 distinct phases plus a quick workflow for trivial cases. The S001–S999 numbering convention enables **resumable, parallelizable** implementation.

Three patterns worth lifting whether or not you use ContextKit:

1. **Quality agents as named phase-bound subagents** — `check-accessibility`, `check-localization` etc. are reusable patterns. Even outside iOS/Apple work, the principle of "quality dimension X gets its own subagent" is generalizable. (See [[claudekit (Carl Rannaberg)|claudekit's 6-aspect parallel review]] for an analogous pattern.)

2. **Persistent feature artifacts (Spec.md, Tech.md, Steps.md per feature)** — survive context compaction, support resumption, enable team handoff.

3. **Quick workflow for trivial cases** — distinct from full 4-phase. ContextKit explicitly distinguishes by complexity. Avoids over-process for typo fixes.

## My assessment

ContextKit is **more granular than necessary for many users**, but the granularity is the point — it forces structured thought before code. For users who find themselves repeatedly correcting Claude mid-implementation, ContextKit's discipline pays off quickly.

The **iOS/Apple lean** matters: if you're not in that ecosystem, several quality agents won't apply directly, but the *pattern* (named-agent-per-quality-dimension) is reusable.

Pair with [[Spec Kit (github)]] (constitution + clarify gate), [[Compound Engineering Plugin]] (cycle-level learning), and [[Karpathy Coding Principles]] (per-task discipline). Together they cover governance / spec / plan / execute / learn.

Cross-references: [[Spec-Driven Development]] · [[Planning Mode]] · [[Subagents]] · [[Skill Building]] · [[Claude Code Ecosystem]]
