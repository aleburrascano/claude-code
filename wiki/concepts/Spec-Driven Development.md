---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 4
tags: [pattern, methodology, planning, verification, agentic]
aliases: [SDD]
---

# Spec-Driven Development

A methodology for AI-assisted coding where a **structured specification** is treated as the load-bearing artifact. The spec drives everything downstream: planning, implementation, verification, review. Agents are evaluated against the spec, not against vague intent.

For agentic coding, SDD addresses a core failure mode: agents implement *something*, but not *the right something*, because what was wanted wasn't crisply specified.

## The core flow

```
prompt → structured spec → plan → implementation → verification (against spec)
```

Each arrow is a checkpoint. The spec is reviewable before planning starts. The plan is reviewable before implementation starts. The implementation is verifiable against the spec.

## Implementations in the ecosystem

### Spec-Driven Development plugin ([[Context Engineering Kit (NeoLabHQ)|NeoLabHQ SDD]])
The flagship implementation. Author claims ~99% working code on real production projects. Key features:
- Structured planning + architecture design
- LLM-as-Judge verification gates between phases
- Each phase produces an artifact that the next phase consumes

Pairs with their **Subagent-Driven Development (SADD)** plugin for parallelism — multiple subagents implement independent spec sections concurrently with judge verification.

### Superpowers writing-plans → executing-plans ([[Superpowers (obra)]])
Same shape: brainstorm → write-plan → execute-plan, with two-stage subagent review (spec-then-quality) at execution time.

### Compound Engineering's `/ce-brainstorm → /ce-plan → /ce-work` ([[Compound Engineering Plugin]])
Same shape, different naming. EveryInc's "80% planning + review, 20% execution" framing emphasizes the relative time investment.

### Claude Code's built-in [[Planning Mode]]
The execution surface for SDD-style workflows. Claude must produce a plan before modifying code; plan is reviewable.

### GitHub Spec Kit — constitution-first ([[Spec Kit (github)]])
GitHub's official toolkit adds a phase **before** spec: the **constitution**.

```
constitution → specify → clarify → plan → tasks → implement
```

- **`/speckit.constitution`** — establishes project governance principles + development guidelines
- **`/speckit.clarify`** — explicitly surfaces underspecified requirements *before* `/speckit.plan` commits to architecture
- **`/speckit.analyze`** — pre-implementation review

The constitution-first pattern is **novel and worth adopting**. Most SDD frameworks treat governance as an afterthought; Spec Kit makes it the *first* artifact, ensuring downstream specs and plans inherit it.

This is structurally similar to [[Memory|CLAUDE.md as constitution]] (per [[Diwank Field Notes|Diwank]]) but at the per-feature level — a constitution governs *everything* from session start, but Spec Kit's `/speckit.constitution` is per-project artifact.

The **clarify-as-gate** pattern is the second novel addition. Forces ambiguity resolution as an explicit step rather than relying on Claude to ask. Closely related to [[jeffallan claude-skills|`/common-ground`]] but operates at spec level (vs project assumptions) and at workflow level (vs ad-hoc).

### Other implementations (per [[Claude Code Ecosystem|the ecosystem catalog]])
Same fundamental shape across:
- [[BMAD-METHOD]] (`bmad-create-prd`) — adds scale-adaptive planning
- [[Get Shit Done (gsd-build)]] — XML-structured tasks with `<verify>` per task
- [[OpenSpec (Fission-AI)]] (`/opsx:propose`) — lightweight, agreement-first
- [[oh-my-claudecode]] (`team-plan → team-prd → team-exec → team-verify`)
- [[ContextKit (Cihat Gunduz)]] — 4-phase planning with named quality agents
- [[AB Method]] — incremental missions with mandatory TDD per mission
- [[The Agentic Startup (Rudolf Schmidt)]] — specify → validate → implement → review → maintain
- [[RIPER Workflow (Tony Narlock)]] — Research / Innovate / Plan / Execute / Review with permission boundaries
- [[Pilot Shell (formerly Claude CodePro)]] — feature mode + bugfix mode (different shapes per work type)

**The convergence is strong evidence the pattern is load-bearing.** All 10 successful frameworks land near the same shape.

## Why SDD works for agents

Three structural reasons:

1. **A spec is testable.** "Make it good" isn't testable; "the API must return 200 with `{user_id, role}` for valid input and 401 otherwise" is. Agents can verify the testable thing, not the vague one.

2. **A spec separates concerns.** Spec → plan → implementation: each layer has its own quality gate. Bad specs caught in spec review never become bad implementations.

3. **A spec persists across sessions.** Conversations evaporate; specs persist. New agents (subagents, future sessions) can be brought up to speed by reading the spec, not the entire transcript.

## Anti-patterns

- **Spec as documentation theater** — writing the spec and then ignoring it. The spec must be checked at each phase or it's noise.
- **Spec-of-the-implementation** — writing the spec by reading the code that already exists. Backwards. Inverts the discipline.
- **Multi-thousand-line specs** — if your spec doesn't fit in a single Claude context, neither will the verification step. Decompose by subsystem.
- **Mixing spec and plan** — the spec is *what* and *why*; the plan is *how*. Combining them muddles review.

## When to skip

- Trivial work (typo fix, single-line change) — the friction exceeds the value.
- Exploratory prototyping where the goal is to learn, not ship — the spec emerges from exploration.
- Pure code-translation tasks (rewrite this Python in TypeScript) — the spec is implicit in the source code.

## SDD and the wiki's focus areas

For [[Reducing Hallucinations]]:
- The spec is the **objective truth** the agent is held to. Without one, agents fill ambiguity with plausible-sounding choices that may be wrong.

For [[Token Efficiency]]:
- A good spec is shorter than the conversation that would otherwise be needed to align on intent.
- Subagents can read the spec instead of the whole conversation; cuts context-passing cost.

For [[Skill Building]]:
- Skills following SDD-shaped flows (a `plan-and-execute` skill, e.g.) are more reliable than free-form skills.

## Cross-references

- [[Planning Mode]] · [[Subagents]] · [[Compound Engineering]]
- [[Karpathy Coding Principles]] (Goal-Driven Execution is the per-task version of SDD's per-feature version)
- [[Reducing Hallucinations]] · [[Token Efficiency]]
- Sources: [[Context Engineering Kit (NeoLabHQ)]] (SDD/SADD) · [[Superpowers (obra)]] · [[Compound Engineering Plugin]] · [[Claude HowTo (luongnv89)]]
