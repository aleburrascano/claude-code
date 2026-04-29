---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, framework, spec-driven, tdd, ddd, missions]
source_url: https://github.com/ayoubben18/ab-method
source_author: Ayoub Bensalah
license: MIT
---

# AB Method

A spec-driven framework that decomposes complex problems into **single-threaded, test-first incremental missions**. Each mission completes through a TDD cycle before the next begins. Built by Ayoub Bensalah.

For our wiki, AB Method's distinctive contribution is the **mission-as-atomic-unit** philosophy combined with mandatory TDD.

## The methodology

An "incremental mission" = atomic, completable unit of work. **All missions invoke the `tdd` skill** (red-green-refactor); the test is the spec. Missions tracked as one-line technical summaries in a progress-tracker file — preserves context without documentation overhead.

Sequential discipline: missions are defined upfront but executed one-at-a-time.

## Core components

### Slash commands
- `/create-task` — invokes `grill-me` skill ([[Matt Pocock Skills|Matt Pocock pattern]]) to interview requirements before mission definition
- `/resume-task` — continues from progress tracker (no scattered docs to recover)
- `/extend-task` — appends missions when scope expands
- `/analyze-project`, `/analyze-frontend`, `/analyze-backend` — full or targeted architecture sweeps
- `/ab-master` — beginner-friendly guided workflow

### Specialized subagents
Backend architect (Next.js), frontend developer (shadcn UI), testing agents (Vitest, Playwright), cloud infrastructure (SST), code auditing, AI agent development.

### Workflows
Read configuration from `.ab-method/structure/index.yaml`. Manage output paths, documentation scaffolding, task lifecycles across frontend/backend/full-stack.

### Skills bundled
`grill-me`, `tdd`, `domain-model`, `ubiquitous-language` ([[Vertical Slice|DDD]]), refactoring utilities.

## Distinctive contributions

### DDD + TDD integration
Most spec-driven frameworks focus on planning. AB Method explicitly integrates **domain-driven design** (UBIQUITOUS_LANGUAGE.md, bounded contexts) with **test-first development**. See [[Vertical Slice]] and [[Test-Driven Development with Claude]].

### Skill-as-real-files distribution
Skills copied as actual files (not symlinks/imports). Portable across OS and CI pipelines. Important detail when distribution mechanics matter.

### Auto-detection install
`npx ab-method` auto-detects environment (`.claude/`, `.agents/`, both) and installs accordingly. Reduces config friction.

## Installation

```bash
npx ab-method
```

Eight built-in subagents offered during interactive setup.

## My assessment

AB Method's clearest contribution is **single-threaded mission execution + mandatory TDD per mission**. Most frameworks let you decompose then parallelize; AB Method explicitly serializes. For sustained, careful production work where context preservation matters more than throughput, this discipline pays.

The DDD integration (ubiquitous-language, bounded contexts) is rare in the Claude Code ecosystem — most frameworks don't bring formal domain-modeling vocabulary. Worth borrowing for any project where domain language matters (most non-trivial projects).

Cross-references: [[Spec-Driven Development]] · [[Test-Driven Development with Claude]] · [[Vertical Slice]] · [[Subagents]] · [[Matt Pocock Skills]] (grill-me skill origin) · [[Claude Code Ecosystem]]
