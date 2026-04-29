---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 2
tags: [pattern, methodology, learning, mistakes]
---

# Compound Engineering

An engineering discipline (named and operationalized by **EveryInc**) built on a single inverted-debt insight:

> **Each unit of engineering work should make subsequent units easier — not harder.**

Conventional engineering accumulates technical debt; Compound Engineering tries to accumulate **leverage**. Each cycle is structured to feed subsequent cycles: brainstorms sharpen plans, plans inform reviews, reviews document patterns, documented patterns inform architecture decisions on the next feature.

Canonical primary source: [[Compound Engineering Plugin]].

## The cycle

```
ideate → brainstorm → plan → work → debug → review → compound
                                                       ↓
                                       (lessons feed back into all upstream steps)
```

Each phase produces an artifact that improves the next. The terminal `compound` step explicitly **documents lessons as reusable artifacts** so future agents (and future Claude sessions) inherit them.

## Why this matters specifically for AI coding

Without a compound discipline:
- Mistakes evaporate when the conversation ends.
- The next session repeats the same wrong assumptions because there's no memory of last time's correction.
- Agents don't get *better* at your codebase over time; they reset.

With a compound discipline:
- Lessons get written into [[Memory|CLAUDE.md]] or auxiliary docs.
- Reviews catch the *pattern* underlying the bug, not just the bug instance.
- Patterns inform architecture choices on the next feature, not just the current fix.

## Two key quotes (from [[Compound Engineering Plugin]])

> "80% is in planning and review, 20% is in execution."

> "A good review catches the pattern, not just the bug."

> "The next agent does not have to learn the same lesson from scratch."

## Operational mechanisms

Three patterns make compound engineering work in practice:

### 1. Explicit lesson capture
Some artifact is updated whenever a lesson is learned. Candidates:
- [[Memory|CLAUDE.md]] entries (for project-wide lessons)
- Auxiliary `docs/adr/` (Architecture Decision Records — referenced in [[Matt Pocock Skills|Matt Pocock's `improve-codebase-architecture`]])
- Per-skill notes ([[TACHES Claude Code Resources|TÂCHES `/heal-skill`]] updates the skill itself)

### 2. Pattern-level review
Reviews ask "what's the *pattern* here?" not just "is this bug fixed?" Catches:
- Recurring root causes (5 Whys / fishbone — see [[Context Engineering Kit (NeoLabHQ)|Kaizen plugin]])
- Categorical errors that will repeat
- Architectural smells

### 3. Brainstorm-before-execute
Spend disproportionate time in the planning/brainstorm phase. Most "execution mistakes" trace to planning omissions; planning is where leverage is paid forward.

## Adjacent concepts

| Adjacent | Distinction |
|---|---|
| [[Compound Engineering Plugin\|Reflexion]] (Context Engineering Kit) | Reflexion is in-session self-critique; Compound Engineering is across-session institutional learning. |
| [[Karpathy Coding Principles\|Goal-Driven Execution]] | Karpathy's per-task discipline; Compound is the project/portfolio-level discipline that emerges. |
| [[Spec-Driven Development]] | SDD specifies *what*; Compound Engineering specifies *what we learned about how to specify*. |
| [[Memory]] | The carrier — compound learnings live in CLAUDE.md or related artifacts. |

## Anti-patterns

- **Lesson capture without review** — capturing every observation eventually clutters memory. Lessons should be *patterns*, not log entries.
- **Lessons without trigger conditions** — "be careful with X" doesn't help unless it says when X applies. Make lessons actionable.
- **Compound rituals without consumer** — if `/ce-compound` writes lessons that nothing reads, it's theater. Verify lessons are actually loaded into [[Memory]] or auxiliary docs.

## Implementation in this wiki

The wiki you're reading is itself a compound-engineering artifact for Claude Code mastery: each ingest produces concept and topic pages; each lint pass surfaces patterns; each cross-reference compounds the value of prior work. The schema in [[CLAUDE]] is its operating manual.

## Cross-references

- [[Compound Engineering Plugin]] — canonical primary
- [[Memory]] · [[Reducing Hallucinations]] · [[Spec-Driven Development]]
- [[Context Engineering Kit (NeoLabHQ)|Kaizen]] (5 Whys / fishbone) · [[Context Engineering Kit (NeoLabHQ)|Reflexion]] (in-session)
- [[EveryInc|EveryInc essays]]: "Compound Engineering: How Every Codes with Agents"; "My AI Had Already Fixed the Code Before I Saw It"
