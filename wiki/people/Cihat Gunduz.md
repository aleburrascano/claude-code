---
type: person
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [people, practitioner, planning, contextkit, swift, flinedev]
---

# Cihat Gündüz

Creator of [[ContextKit (Cihat Gunduz)|ContextKit]] (FlineDev) — a 4-phase planning framework with named quality agents per phase. One of the more disciplined *planning* methodologies in the wiki, distinct from other Spec-Driven approaches in its agent-per-phase structure.

For our wiki, Cihat matters because ContextKit's framing answers "**what should the planning step look like?**" with a concrete 4-phase decomposition rather than the more common "Research → Plan → Execute → Review" generalization.

## Key contributions

### The 4-phase planning structure

ContextKit decomposes any non-trivial task into:

1. **Discovery** — what does the existing codebase do? what constraints exist?
2. **Design** — what's the right shape? what alternatives were considered?
3. **Decomposition** — how does this break into independently testable units?
4. **Execution** — implement the units; verify each.

Each phase has a **named quality agent** that gates progression. Discovery isn't "done" until the discovery agent is satisfied; same for design and decomposition.

The novel part is the **named agents per phase**, not the phases themselves. Other frameworks ([[Spec Kit (github)|Spec Kit]], [[BMAD-METHOD|BMAD]], [[Get Shit Done (gsd-build)|GSD]]) have phase decomposition; ContextKit's structure of "phase + gating quality agent" is distinct.

### Planning as a separate discipline

ContextKit's framing is that **planning is its own quality bar**, not a preamble to "real" work. The 4-phase structure exists because each phase tends to be cut short under time pressure; named agents enforce completion.

Compare to [[Compound Engineering|Compound Engineering's]] "80% planning + review, 20% execution" — Cihat's framework operationalizes that ratio via the gating agents.

### Swift / Apple ecosystem focus

Cihat's broader work (FlineDev) is Swift-focused; ContextKit's patterns are domain-agnostic but the documentation often uses Swift examples. Doesn't limit applicability; worth noting as a stylistic anchor.

## Why this matters for our wiki

ContextKit fits a specific niche: teams that have tried Spec-Driven approaches and found them under-disciplined ("we said we'd plan but the plan was a paragraph"). The named-agent gating is the answer to "how do we keep planning honest?"

For [[Spec-Driven Development]]: ContextKit is one of the wiki's 10+ workflow framework references; it's the one to pick when *your discipline problem is in planning quality, not in spec→code translation*.

For [[Multi-Agent Orchestration]]: the pattern of "named quality agent per phase" is a clean role-specialization archetype. Distinct from [[claudekit (Carl Rannaberg)|claudekit's 6-aspect review]] (parallel, same-stage) and [[Superpowers (obra)|Superpowers' two-stage validation]] (sequential, post-implementation).

## Cross-references

- [[ContextKit (Cihat Gunduz)]] — the canonical source page
- [[Spec-Driven Development]] (ContextKit is one of the workflow frameworks)
- [[Multi-Agent Orchestration]] (named quality agents per phase as a pattern)
- [[Compound Engineering]] (planning-heavy ratio operationalized)
- [[Planning Mode]] (ContextKit's discovery phase pairs with plan mode)
