---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 3
tags: [claude-code, extended-thinking, reasoning, primitive]
---

# Extended Thinking

A Claude Code mode that gives the model **explicit space to reason** before producing its response. Toggled with `Alt+T` (Windows/Linux) / `Option+T` (macOS), or controlled per-turn via API parameters.

The model uses reasoning tokens (not visible in the response by default) to work through the problem. Net effect: better quality on hard problems, at the cost of more tokens and latency.

## When extended thinking pays off

- **Complex debugging** — multiple suspect components, ambiguous symptoms
- **Architectural decisions** — multiple valid options, non-obvious tradeoffs
- **Algorithm design** — correctness is non-trivial
- **Cross-cutting refactors** — many files, many possible orderings
- **Anything where you've seen Claude make wrong silent assumptions** — extended thinking surfaces these explicitly

## When it doesn't

- **Simple lookups** — "what's the syntax for X?"
- **Routine code generation** — boilerplate, glue code, scaffolds
- **Single-file edits** with obvious shape
- **Exploratory chat** before the question is even crisp

The cost matters: reasoning tokens are billed (and they're not free of latency). Use as a tool, not a default.

## Pattern: contextual depth control ([[claudekit (Carl Rannaberg)]])

claudekit ships a `thinking-level` hook on `UserPromptSubmit` that adjusts reasoning depth based on the prompt content. Mechanically:

```
hook reads prompt
  → if "debug" / "design" / "plan" / "why" → set thinking level high
  → else → leave at default
```

This is a generalizable pattern: don't think hard *all the time*; think hard *when the prompt warrants it*.

## Pairings

| Pair with | Why |
|---|---|
| [[Planning Mode]] | Planning is the highest-value moment for deep reasoning |
| [[Karpathy Coding Principles]] (Think Before Coding) | The principle is "surface assumptions explicitly"; extended thinking is the mechanism |
| [[Subagents]] | Subagents can have their own thinking levels independent of the main agent |
| [[TACHES Claude Code Resources]] `/consider:*` commands | Combine: ask for first-principles + enable deep thinking |

## What extended thinking is *not*

- Not a [[Skills|skill]] or [[Slash Commands|slash command]] — it's a model-level mode.
- Not chain-of-thought prompting in the response — the reasoning is internal/hidden by default.
- Not a guarantee of correctness — it makes wrong reasoning more *legible* if it's surfaced, but won't fix wrong premises. See [[Reducing Hallucinations]] for complementary discipline.

## Token cost framing

Extended thinking adds (sometimes substantial) reasoning tokens per turn. For [[Token Efficiency]]:
- Use only when the task warrants it
- Pair with [[Planning Mode]] so the deep thinking happens once (during plan) rather than on every execution turn
- Consider a hook ([[claudekit (Carl Rannaberg)|claudekit-style thinking-level]]) to make activation contextual

## Cross-references

- [[Planning Mode]] · [[Karpathy Coding Principles]] · [[Subagents]]
- [[Reducing Hallucinations]] · [[Token Efficiency]]
- Sources: [[Claude HowTo (luongnv89)]] (mechanics) · [[claudekit (Carl Rannaberg)]] (contextual hook pattern)
