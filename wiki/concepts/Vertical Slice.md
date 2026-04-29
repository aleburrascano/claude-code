---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 2
tags: [pattern, decomposition, methodology]
---

# Vertical Slice

A decomposition strategy where each unit of work delivers an **end-to-end thin slice** of a feature — touching every layer (data → logic → UI → tests) — rather than a "horizontal" layer (e.g., "first all the database changes, then all the business logic, then all the UI").

A vertical slice is **demoable**: at the end, you can show "this part works." Horizontal slices are *not* — at the end of "all the database changes," nothing visibly works.

For Claude Code use, vertical slicing is the unit of decomposition that pairs best with [[Planning Mode]], [[Test-Driven Development with Claude|TDD]], and [[Subagents]].

## Why vertical for AI coding

| Property | Vertical slice | Horizontal slice |
|---|---|---|
| Demoable at end of slice | Yes | No |
| Breaks easy to localize | Yes (small surface) | No (everything touched is in flight) |
| Verifiable per slice | Yes (end-to-end) | No (intermediate states) |
| Compatible with [[Subagents]] working in parallel | Yes | Awkward |
| Aligns with [[Karpathy Coding Principles|Goal-Driven Execution]] | Yes (each slice has criteria) | No (criteria only at the end) |

## Where this shows up in the wiki's sources

- **[[Matt Pocock Skills|`mattpocock/skills/to-issues`]]** — explicitly breaks plans into "independently-grabbable GitHub issues using vertical slices." This is the canonical primary in our wiki for vertical slicing as a Claude-coding practice.
- **[[Matt Pocock Skills|`mattpocock/skills/tdd`]]** — operates on one vertical slice at a time, RED-GREEN-REFACTOR per slice.
- **[[Superpowers (obra)|writing-plans]]** — bite-sized tasks with explicit verification steps; effectively vertical at the task level.
- **[[Compound Engineering Plugin|/ce-plan → /ce-work]]** — task-level execution after planning; works best with vertical decomposition.

## How to spot a horizontal slice

If a planned task description is structured as:
- "All the schema changes for X"
- "Database layer for Y"
- "Tests for Z (where Z's implementation is in another task)"

…that's horizontal. The fix: regroup so each task touches its own slice end-to-end.

## How to spot a vertical slice

If a planned task description is structured as:
- "User can log in with email/password" (touches schema, auth logic, UI form, tests)
- "API returns paginated results" (touches handler, query, contract test, docs)
- "Bug: 500 on missing optional field" (touches reproduction test + fix + regression test)

…that's vertical. Each slice ships a coherent, demoable, verifiable unit.

## Tradeoff to know

Vertical slicing can produce **shallow scaffolding** — many incomplete code paths that would have been better designed up front. The mitigation is good upfront [[Spec-Driven Development|spec/planning]]: the spec sees the whole, even if implementation comes in slices.

## Anti-patterns

- **"Vertical" slices that aren't actually thin** — "user can log in" decomposed as a single slice, but that slice spans 12 files and 800 lines. Re-slice.
- **Fake vertical** — slices that touch every layer but only halfway, leaving half-complete code at every level. Each slice should be *complete* at the depth it operates.
- **Slicing that ignores invariants** — slicing should respect data and architectural invariants. "Add login but skip session expiration" leaves the system inconsistent.

## Cross-references

- [[Test-Driven Development with Claude]] — natural pairing
- [[Planning Mode]] · [[Spec-Driven Development]] · [[Subagents]]
- [[Karpathy Coding Principles]] (Goal-Driven Execution per slice)
- Sources: [[Matt Pocock Skills]] · [[Superpowers (obra)]]
