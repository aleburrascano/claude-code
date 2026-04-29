---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 5
tags: [pattern, principles, hallucination-reduction, claude-md]
---

# Karpathy Coding Principles

Four operating principles for LLM-assisted coding, distilled by [[Andrej Karpathy]] from observed LLM failure modes and packaged into a drop-in CLAUDE.md by [[Andrej Karpathy Skills (forrestchang)|forrestchang]]. Among the highest-leverage, lowest-cost interventions available — the entire fix fits in one [[Memory|CLAUDE.md]] file.

## The four principles

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

LLMs default to picking an interpretation silently and running with it. This principle forces explicit reasoning:

- **State assumptions explicitly** — if uncertain, ask rather than guess
- **Present multiple interpretations** — don't pick silently when ambiguity exists
- **Push back when warranted** — if a simpler approach exists, say so
- **Stop when confused** — name what's unclear and ask

This addresses Karpathy's observation: *"They make wrong assumptions on your behalf and just run along with them without checking."*

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked
- No abstractions for single-use code
- No "flexibility" or "configurability" that wasn't requested
- No error handling for impossible scenarios
- If 200 lines could be 50, rewrite it

The test: *would a senior engineer say this is overcomplicated?*

Addresses: *"They really like to overcomplicate code and APIs, bloat abstractions... implement a bloated construction over 1000 lines when 100 would do."*

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting
- Don't refactor things that aren't broken
- Match existing style, even if you'd do it differently
- If you notice unrelated dead code, mention it — don't delete it

When your changes create orphans:
- Remove imports/variables/functions that *your* changes made unused
- Don't remove pre-existing dead code unless asked

The test: *every changed line should trace directly to the user's request.*

Addresses: *"They still sometimes change/remove comments and code they don't sufficiently understand as side effects, even if orthogonal to the task."*

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform imperative tasks into verifiable goals:

| Imperative | Verifiable |
|---|---|
| "Add validation" | "Write tests for invalid inputs, then make them pass" |
| "Fix the bug" | "Write a test that reproduces it, then make it pass" |
| "Refactor X" | "Ensure tests pass before and after" |

For multi-step tasks, state a brief plan with verification per step:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```

The Karpathy insight that drives this: *"LLMs are exceptionally good at looping until they meet specific goals... Don't tell it what to do, give it success criteria and watch it go."*

Strong success criteria let the LLM loop independently. Weak criteria ("make it work") force constant clarification.

## Why these compound

- *Think* → reduces wrong-direction work that *Surgical* would have to clean up.
- *Simplicity* → reduces what *Surgical* needs to defend against.
- *Surgical* → keeps changes traceable, which makes *Goal-Driven* verification feasible.
- *Goal-Driven* → lets the LLM use its real strength (looping toward criteria) instead of its weakness (silent assumption-making).

## Where these principles show up across the ecosystem

These four principles, framed differently, recur across many sources:

| Source | Echo |
|---|---|
| [[Superpowers (obra)]] | "Mandatory workflows, not suggestions" + bite-sized tasks + explicit YAGNI rejection |
| [[Compound Engineering Plugin]] | "80% planning + review, 20% execution"; review catches the *pattern* |
| [[claudekit (Carl Rannaberg)]] | Hooks enforcing surgical-changes (`check-comment-replacement`, `check-any-changed`) |
| [[Context Engineering Kit (NeoLabHQ)]] | Chain-of-Verification, evidence-based generation, Tree of Thoughts pruning |
| [[Matt Pocock Skills]] | TDD red-green-refactor, vertical slicing, "real engineering not vibe coding" |
| [[Encyclopedia of Agentic Coding Patterns]] | Multiple patterns echo each principle (Bounded Autonomy, Human in the Loop, etc.) |

When several thoughtful authors converge independently on the same operating principles, treat that convergence as load-bearing.

## Tradeoff to remember

These principles bias **caution over speed**. For trivial tasks (typo fixes, obvious one-liners), full rigor is overkill. Use judgment. Goal: reduce costly mistakes on non-trivial work, not slow down trivial ones.

## Adoption

Two paths from [[Andrej Karpathy Skills (forrestchang)]]:

```bash
# As a Claude Code plugin
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills

# Or as a per-project CLAUDE.md
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
```

A Cursor `.cursor/rules/karpathy-guidelines.mdc` ships in the same repo for cross-tool consistency.

## Cross-references

- [[Reducing Hallucinations]] — these principles are the cornerstone discipline
- [[Memory]] (the carrier — these go in your CLAUDE.md)
- [[Test-Driven Development with Claude]] (Goal-Driven Execution operationalized)
- [[Andrej Karpathy]] · [[Andrej Karpathy Skills (forrestchang)]]
