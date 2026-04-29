---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, hooks, tdd, enforcement, plugin]
source_url: https://github.com/nizos/tdd-guard
source_author: Nizar Selander (nizos)
license: MIT
---

# TDD Guard (Nizar Selander)

A **hooks-driven system that enforces TDD discipline** by blocking file changes that violate red-green-refactor in real-time. 2,000+ stars, 150+ forks. Active community adoption.

For our wiki, TDD Guard is the **canonical hooks-as-enforcement** example. Pair conceptually with [[Verification Loops]] and [[Test-Driven Development with Claude]].

## Three TDD violations blocked

1. **Implementation Without Tests** — blocks code additions when no failing test exists to justify them
2. **Over-Implementation** — prevents code exceeding current test requirements
3. **Refactoring Violations** — enforces lint-based refactoring rules during the green-light phase

> "When your agent tries to skip tests or over-implement, TDD Guard blocks the action and explains what needs to happen instead."

The third violation type is subtle: refactoring isn't blocked, but **lint-violating refactoring** is. Encourages refactoring without quality regression.

## How TDD state is tracked

Integrates with test frameworks: **Vitest, Jest, Storybook, pytest, PHPUnit, Go, Rust, RSpec, Minitest**. Reads test execution results, validates that code changes correspond to failing tests.

## Architecture

Hooks-driven (the awesome list named it as a "hook-driven system"). Specific hook events not enumerated in README excerpt, but per [[Hooks]] taxonomy, almost certainly uses `PreToolUse` (block file writes) and likely `PostToolUse` (after-test-run state tracking).

## Installation

```text
/plugin marketplace add nizos/tdd-guard
/plugin install tdd-guard@tdd-guard
/tdd-guard:setup
```

Streamlined onboarding. Per-framework configuration via `setup`.

## My assessment

TDD Guard's distinctive contribution is **enforcement at the hook layer rather than the prompt layer**. Most TDD-related work in the Claude Code ecosystem is *advisory* (CLAUDE.md says "use TDD," skills suggest it). TDD Guard *blocks* violations — discipline that doesn't depend on Claude's compliance.

This pattern is generalizable: **for rules where compliance matters absolutely, use hooks (deterministic) not memory/skills (advisory)**. Per the [[Memory]] framing: "memory is context, not enforced configuration."

For Alessandro's focus areas:
- For [[Reducing Hallucinations]]: TDD Guard prevents Claude from "completing" implementation without tests — closes the trust-then-verify gap mechanically.
- For [[Hooks]]: a clean reference implementation of enforcement-via-hooks. Worth studying as a hook-design exemplar.
- For [[Test-Driven Development with Claude]]: TDD Guard is the most aggressive enforcement layer in the ecosystem. Pair with [[Superpowers (obra)|Superpowers test-driven-development skill]] for the discipline + [[claudekit (Carl Rannaberg)|claudekit hooks]] for the runtime checks.

Caveat: TDD Guard is opinionated. Some legitimate workflows (exploratory prototyping, throwaway scripts, generated code) genuinely don't benefit from TDD. Plan to disable per-session or scope-limit when those apply.

Cross-references: [[Hooks]] · [[Test-Driven Development with Claude]] · [[Verification Loops]] · [[Reducing Hallucinations]] · [[Claude Code Ecosystem]]
