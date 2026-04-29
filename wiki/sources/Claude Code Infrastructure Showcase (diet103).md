---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, hooks, skills, skill-activation, infrastructure]
source_url: https://github.com/diet103/claude-code-infrastructure-showcase
source_author: diet103
license: MIT
---

# Claude Code Infrastructure Showcase (diet103)

A production-tested reference library extracted from 6 months of real-world Claude Code use on a complex TypeScript microservices project. **Not a working application** — explicitly a component catalog meant to be integrated into your own setup. The headline contribution is a hook-based **intelligent skill activation** mechanism that solves the "skills just sit there" problem.

## The core technique: intelligent skill activation

[[Skills]] are powerful but inert by default — they don't fire until invoked or until Claude decides they're relevant. diet103's mechanism makes activation **automatic and context-aware** via two hooks:

### 1. UserPromptSubmit hook — `skill-activation-prompt`
Runs on every user prompt. Inspects the prompt, the file context, and cross-references patterns in `skill-rules.json`. If a rule matches, it injects a suggestion that the relevant skill is now applicable. Claude then decides whether to use it.

### 2. PostToolUse hook — `post-tool-use-tracker`
Logs tool usage to refine future activation suggestions. Closes the loop — over time the activation rules can be tuned based on which suggestions led to successful outcomes.

### `skill-rules.json` (the activation rulebook)
Maps:
- File patterns (e.g., `**/*.tsx`) → skills to suggest
- Prompt keywords (e.g., "test", "review") → skills to suggest
- Project context → skills to suggest

This is a **declarative skill router**. The pattern is reusable beyond this specific repo.

## Components

### 5 production skills (each ≤500 lines)
- **skill-developer** — meta-skill for creating skills (note: 4th independent meta-skill we've seen — see [[Skill Building]]).
- **backend-dev-guidelines** — Express/Prisma/Sentry patterns.
- **frontend-dev-guidelines** — React/MUI v7.
- **route-tester** — API testing.
- **error-tracking** — Sentry integration.

### The "500-line rule"
Each main `SKILL.md` is kept under 500 lines, with **progressive disclosure** to resource files for deeper material. Prevents context-window violations and keeps skills loadable. See [[Skill Building]] for the broader principle.

### 6 hooks
Two essential (skill-activation-prompt, post-tool-use-tracker) and four optional (tsc-check, trigger-build-resolver, error-handling-reminder, stop-build-check-enhanced).

### 10 specialized agents
Architecture review, refactoring, documentation generation, error debugging, etc.

### 3 slash commands
`/dev-docs`, `/dev-docs-update`, `/route-research-for-testing`.

## Why this matters (the problem statement)

Without intelligent activation:
- Users must remember which skill applies to their current task → **cognitive load on the user**
- Large monolithic skills hit context limits → **context bloat**
- Context resets erase project knowledge → **session-to-session amnesia**
- No consistency across development sessions → **drift**

diet103 names these problems and addresses each:
- Auto-suggestion via `skill-rules.json` removes user-side memory burden.
- 500-line rule + progressive disclosure prevents bloat.
- Persistent dev-docs structure (separate concern, mentioned but not the headline) handles cross-session knowledge.

## Installation (phased)

The README is organized as a 30-minute incremental setup:
- **Phase 1 (15 min)** — Copy two essential hooks, update `settings.json`.
- **Phase 2 (10 min)** — Add one relevant skill and configure `skill-rules.json`.
- **Phase 3 (5 min)** — Test activation by editing files and asking prompts.

Phasing the setup is a good distribution practice — the user gets value before they've adopted everything.

## My assessment

The **`skill-rules.json` declarative activation pattern** is the most generalizable contribution in this repo. Even if Alessandro doesn't adopt the rest of the showcase, copying the activation hook + rules file pattern dramatically reduces the friction of using a large skill library.

The **500-line rule** is also worth adopting as a personal convention. It's a heuristic, not a hard limit — but having the rule keeps you honest about progressive disclosure. See [[Skill Building]] for how this integrates with skill design generally.

Pair with [[TACHES Claude Code Resources|TACHES]] (skill-auditor for quality), [[Superpowers (obra)|Superpowers]] (writing-skills meta-skill), [[Matt Pocock Skills|Matt Pocock's `write-a-skill`]] (yet another meta-skill). All four converge on similar principles for skill construction; reading them together triangulates the consensus.

Cross-references: [[Skill Building]] · [[Skills]] · [[Hooks]] · [[Context Engineering]] · [[Claude Code Ecosystem]]
