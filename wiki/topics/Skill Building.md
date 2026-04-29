---
type: topic
created: 2026-04-26
updated: 2026-04-26
sources: 7
tags: [topic, focus, skills, meta-skills, design]
---

# Skill Building

How to design [[Skills]] that actually fire, stay maintainable, and make Claude reliably better at recurring tasks.

The design space is large but the community has converged on a small set of principles. This page synthesizes that consensus across multiple sources.

---

## Thariq's 9 skill categories (from Anthropic, the canonical taxonomy)

Per [[Thariq Anthropic Skills + Sessions|Thariq]], skills naturally cluster into **9 categories**. Best skills fit cleanly into ONE. Confusion comes from skills spanning multiple types.

1. Library & API Reference
2. Product Verification
3. Data Fetching & Analysis
4. Business Process & Team Automation
5. Code Scaffolding & Templates
6. Code Quality & Review
7. CI/CD & Deployment
8. Runbooks
9. Infrastructure Operations

Use as a **design-time check**: "which category does this skill fit?" If you can't pick one, the skill is doing too many things — split it.

This taxonomy is more granular than the "two archetypes" framing below. Map approximately:
- Categories 1, 8, 9 = domain-expertise archetype
- Categories 2-7 = task-execution archetype

Use whichever framing helps you make design decisions in the moment.

---

## The two skill archetypes ([[TACHES Claude Code Resources|TÂCHES]]'s framing)

### Domain-expertise skills
Exhaustive knowledge bases (5–10k+ lines as resource files), structured for the model to query selectively. Examples: API references, framework expertise, codebase guides.

Design:
- **Index file** (≤500 lines) describing what's available and how to access it
- **Resource files** with the actual knowledge, loaded on demand
- **Activation triggered by domain detection** — file types, terminology

### Task-execution skills
Action-loaded, lean, focused. Examples: "review this code," "write a PRD from this conversation," "set up pre-commit hooks."

Design:
- **Imperative instructions** — what to do, in order
- **Optional bundled scripts** — implementation helpers
- **Activation triggered by task intent** — verbs in the prompt

These are *different design spaces*. Don't blur them.

---

## The 500-line rule ([[Claude Code Infrastructure Showcase (diet103)]])

`SKILL.md` ≤500 lines. If more is needed, use **progressive disclosure**:

```
SKILL.md (≤500 lines)
  → references resources/architecture.md
  → references resources/examples/
  → references templates/
```

The 500-line ceiling forces the question: "what's load-bearing here?" Anything not load-bearing belongs in a referenced file that loads only if needed.

This connects to [[Learn Claude Code (shareAI-lab)]] session 5: knowledge arrives on demand, not upfront. The 500-line rule is the operational form of that principle.

---

## Activation discipline

A skill that doesn't fire is invisible. The two paths:

### 1. Description-driven implicit activation
Write descriptions that **name trigger conditions explicitly**, not just capabilities.

Bad: "This skill helps with code review."
Better: "Use this skill when the user asks to review a diff, a file, or a PR; or whenever a `git diff` output appears in the conversation."

The model decides activation by reading descriptions. Make the decision easy.

### 2. Hook-driven explicit activation ([[Claude Code Infrastructure Showcase (diet103)]])
A `UserPromptSubmit` hook reads `skill-rules.json` and matches:
- File patterns (e.g., `**/*.tsx` → suggest the React skill)
- Prompt keywords (e.g., "test" → suggest the testing skill)
- Project context

Then injects "skill X is now applicable" suggestions.

This is more reliable than implicit activation. Worth setting up early.

---

## Quality auditing

[[TACHES Claude Code Resources|TÂCHES]] ships a **skill-auditor subagent** that reviews skills for best-practice compliance. Skill audit catches:
- Skills without trigger conditions in their descriptions
- Skills exceeding the 500-line rule without progressive disclosure
- Overlapping skills competing for the same trigger
- Skills with vague or duplicated content

Pattern is generalizable: write your own auditor for any structural artifact.

---

## Self-healing skills ([[TACHES Claude Code Resources|`/heal-skill`]])

Analyzes execution failures and updates the skill based on what actually worked. Conceptually adjacent to [[Compound Engineering Plugin|`/ce-compound`]] but at the skill-definition level — the skill itself learns from each invocation's failures.

---

## Meta-skills (skills for writing skills)

Four sources in the wiki ship meta-skills, all converging on similar principles. Read all four for triangulated consensus:

| Source | Meta-skill |
|---|---|
| [[Matt Pocock Skills]] | `write-a-skill` — emphasizes progressive disclosure + bundled resources |
| [[Superpowers (obra)]] | `writing-skills` — best-practices guide with testing methodology |
| [[TACHES Claude Code Resources]] | `Create Agent Skills` — distinguishes domain-expertise vs task-execution archetypes |
| [[Claude Code Infrastructure Showcase (diet103)]] | `skill-developer` — meta-skill for the showcase's skill family |

The shared principles:
- **Progressive disclosure** (500-line rule + resource files)
- **Activation discipline** (descriptions name triggers)
- **Bundled resources** (scripts, templates colocated with SKILL.md)
- **Testing** (skills should be testable; failures should improve the skill)

---

## SKILL.md anatomy (consensus pattern)

```markdown
---
name: skill-name
description: When to use, named explicitly (not just what it does)
tools: [Read, Write, Edit, Bash]   # optional restrictions
---

# Skill Name

## When this applies
[Explicit trigger conditions]

## What it does
[Brief overview]

## Steps
1. [Concrete action]
2. [Concrete action]
3. ...

## Resources
- See [resources/example.md] for [thing]
- Use [scripts/helper.sh] for [thing]

## Anti-patterns
[Common mistakes this skill prevents or has been mistaken about]
```

Frontmatter `tools:` restriction limits which tools the skill can invoke. Useful for guardrails and for keeping the skill scope narrow.

---

## Distribution choices

| Distribution | When |
|---|---|
| **Bundled in [[Plugins\|plugin]]** | Multi-skill sets, complete frameworks |
| **`npx skills@latest add`** ([[Matt Pocock Skills]] style) | Fine-grained, single-skill installation |
| **Manual `cp -r`** | Reference implementations the user adapts |
| **Direct `~/.claude/skills/<name>/`** | Private, project-specific, or experimental |

---

## Anti-patterns

- **Skill clutter** — adding skills without auto-activation rules. They consume registry overhead without firing.
- **Knowledge dumps** — multi-thousand-line `SKILL.md`. Use progressive disclosure.
- **Vague descriptions** — descriptions that don't name trigger conditions.
- **Overlapping skills** — multiple skills competing for the same trigger.
- **No anti-patterns section in the skill itself** — your skill knows about its failure modes from past use; capture them.
- **No tool restrictions on narrow skills** — a skill for "review TypeScript types" shouldn't have Bash access.

---

## A skill-building progression

If you're starting:

1. **Read at least two of the four meta-skills** (see above) to internalize the principles.
2. **Audit your existing skills** — are they hitting the rules? Use [[TACHES Claude Code Resources|TÂCHES skill-auditor]] or do it manually with the consensus criteria.
3. **Adopt the activation hook pattern** ([[Claude Code Infrastructure Showcase (diet103)]]) — `skill-rules.json` + `UserPromptSubmit` hook.
4. **Build one skill in each archetype** — one domain-expertise skill, one task-execution skill. The contrast teaches the design space.
5. **Set up `/heal-skill`-equivalent feedback** — even just a discipline of "if this skill failed, update its anti-patterns section."

---

## Cross-references

- [[Skills]] (the primitive) · [[Hooks]] (for activation) · [[Plugins]] (for distribution)
- [[Context Engineering]] · [[Token Efficiency]]
- Sources: [[Matt Pocock Skills]] · [[Superpowers (obra)]] · [[TACHES Claude Code Resources]] · [[Claude Code Infrastructure Showcase (diet103)]] · [[Learn Claude Code (shareAI-lab)]] · [[claudekit (Carl Rannaberg)]] · [[Context Engineering Kit (NeoLabHQ)]]
