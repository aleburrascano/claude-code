---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 5
tags: [pattern, tdd, testing, hallucination-reduction]
aliases: [TDD with Claude, TDD for Claude Code]
---

# Test-Driven Development with Claude

The classic TDD discipline (RED-GREEN-REFACTOR) re-purposed for AI coding. Multiple sources independently converge on it as the **single most reliable structural defense against hallucinated code**.

The core insight: a failing test is **objective ground truth**. The agent can run, observe failure, modify, run, observe success — without human intermediation. Compare against "make it work," which only the human can verify.

## The loop

```
RED:    Write a test that reproduces the bug or specifies the new behavior.
        Run it. Confirm it fails.
GREEN:  Write the minimum code to make it pass. Run. Confirm it passes.
REFACTOR: Improve structure without breaking the test. Run. Confirm still passes.
```

For new features: tests come *before* implementation. For bug fixes: a test reproducing the bug comes *before* the fix.

## Why TDD pairs uniquely well with LLMs

[[Karpathy Coding Principles|Karpathy's "Goal-Driven Execution"]]:
> "LLMs are exceptionally good at looping until they meet specific goals. Don't tell it what to do, give it success criteria and watch it go."

A failing test *is* the success criterion. The LLM doesn't need clarification mid-flight; it can iterate against the test until green. TDD turns "did Claude understand?" into "do the tests pass?" — a question the agent can answer itself.

## TDD implementations in the ecosystem

| Source | Manifestation |
|---|---|
| [[Matt Pocock Skills\|`mattpocock/skills/tdd`]] | RED-GREEN-REFACTOR loop, one [[Vertical Slice]] at a time |
| [[Superpowers (obra)\|`test-driven-development`]] | Strict RED-GREEN-REFACTOR, anti-patterns reference, no shortcuts |
| [[claudekit (Carl Rannaberg)\|test-changed hook]] | PostToolUse hook running tests on every modified file |
| [[Context Engineering Kit (NeoLabHQ)\|TDD plugin]] | TDD commands with anti-pattern detection and test-fixing orchestration |
| [[TDD Guard (Nizar Selander)]] | Hook-driven system that monitors file ops and **blocks changes that violate TDD principles** |
| [[Awesome Claude Code (hesreallyhim)\|/tdd, /tdd-implement slash commands]] | Various community implementations |

When a community converges this strongly on a single discipline, it's worth treating as load-bearing.

## TDD-specific anti-patterns ([[Superpowers (obra)|Superpowers]] tracks these explicitly)

- **Implement-then-test** — writing the implementation first and then writing tests *for it*. The tests will pass (they were written to). Discipline lost.
- **Tests that don't actually test** — vacuous assertions, tests that exit before any check, integration tests with no integration. Watch for.
- **Skipping RED** — going straight to "write the test and the code." Loses the confirmation that the test would fail without your change.
- **Skipping REFACTOR** — leaving the green code as-is even when it's ugly. Compounds technical debt.

## TDD with subagents and worktrees

Powerful combinations:

### Subagent-driven TDD ([[Superpowers (obra)|subagent-driven-development]])
Spawn a subagent per task. Subagent operates RED-GREEN-REFACTOR on a fresh context. Returns the diff + test results. Main agent merges.

### Worktree-isolated TDD ([[Superpowers (obra)|using-git-worktrees]])
Create a feature branch worktree with a clean test baseline. The subagent's RED is unambiguous (clean repo + new failing test). Avoids contamination from in-progress work.

### Hook-enforced TDD ([[TDD Guard (Nizar Selander)]])
File-write hooks block modifications that don't follow TDD order. Heavyweight but effective for high-rigor projects. The canonical example of "hooks as TDD enforcement" — monitors `Write`/`Edit` events, parses the file, checks whether a corresponding test exists and is failing, blocks the operation if not. See [[Hooks]] for the broader hook-as-enforcement pattern.

## TDD and our focus areas

For [[Reducing Hallucinations]]: TDD turns vague intent into a verifiable goal. The test catches the case where Claude implemented something different than intended.

For [[Token Efficiency]]: a green test ends the iteration. Without a clear "done" signal, agents keep iterating, debating, polishing. Tests are the cheapest possible "done" signal.

For [[Skill Building]]: any skill that produces code should have a TDD-shaped variant. The "implement X" skill should have a paired "implement X with tests first" skill.

## When to skip TDD

- **Pure exploration** where you don't yet know what you're building
- **Research scripts** with one-time outputs, no maintenance burden
- **UI work** where "looks right" is the criterion (use [[Awesome Claude Code (hesreallyhim)|Design Review Workflow]] instead)
- **Trivial single-file edits** — overhead exceeds value

## Cross-references

- [[Karpathy Coding Principles]] (Goal-Driven Execution principle)
- [[Vertical Slice]] · [[Spec-Driven Development]] · [[Reducing Hallucinations]]
- [[Subagents]] · [[Hooks]]
- Sources: [[Matt Pocock Skills]] · [[Superpowers (obra)]] · [[claudekit (Carl Rannaberg)]] · [[Context Engineering Kit (NeoLabHQ)]] · [[TDD Guard (Nizar Selander)]] (canonical hook-enforced TDD) · [[Awesome Claude Code (hesreallyhim)]] (/tdd slash commands)
