---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, human-in-the-loop, claude-md, agent-orchestration]
source_url: https://github.com/humanlayer/humanlayer
source_author: HumanLayer team
license: Apache 2.0
---

# HumanLayer

An open-source IDE built on top of Claude Code, emphasizing **keyboard-first workflows + parallel multi-agent execution + intelligent human intervention**. 10.6k+ stars. 11k stars per [[shanraisshan Claude Code Best Practice|shanraisshan's workflow comparison]].

For our wiki, HumanLayer matters for two specific contributions:
1. **Human-in-the-loop framing** as a design principle
2. **An exemplary ~60-line CLAUDE.md** noted by the community as a model

## The human-in-the-loop philosophy

HumanLayer's core thesis: **strategic human oversight beats full autonomy**. Rather than autonomous execution end-to-end, the framework embeds approval gates and decision points where human judgment matters most. This reduces hallucinations and ensures outputs align with project intent.

The framing matters because the rest of the ecosystem leans toward *more* autonomy (auto mode, /focus, autonomous loops). HumanLayer is the explicit counterweight — sometimes the right discipline is to *insist on human checkpoints* even when the model could plausibly run alone.

## Core components

- **Agents & Sessions** — parallel Claude Code sessions across worktrees and remote cloud workers
- **Commands** — `create_plan` and others; structured commands enable reproducibility and human verification
- **Context engineering** — scaling AI development across teams while maintaining quality
- **Integrations** — version control, environment management, team collaboration

Active development (714 releases as of clipping; latest codelayer-0.20.0 Dec 2025). TypeScript (59%) + Go (33%).

## The exemplary CLAUDE.md (~60 lines)

Per [[shanraisshan Claude Code Best Practice|shanraisshan]], HumanLayer's CLAUDE.md is exemplary in its **brevity and clarity**:
- Defines agent capabilities and constraints
- States when human approval is required
- Names integration points with development workflows
- Sets context parameters for consistent behavior

The ~60-line target matches the ecosystem consensus that **CLAUDE.md should aim under 200 lines** ([[Boris Cherny Tips Compendium|Boris's tip]]) and that *shorter is better*. HumanLayer hits the lower bound.

For [[Memory]]: HumanLayer's CLAUDE.md is the canonical example of "brief, clear, and load-bearing without bloat." Worth studying as a template.

## "12 Factor Agents"

The team published a foundational framework called "12 Factor Agents" (named after the [12-Factor App](https://12factor.net/) methodology). Articulates principles for agent design analogous to how 12-Factor articulates principles for cloud-native apps.

Full coverage: [[12 Factor Agents (HumanLayer)]] — dedicated source page with all 12 factors, mapped to the wiki's focus areas (especially [[Reducing Hallucinations|Factors 3, 7, 9, 10, 12]] for hallucination defense and [[Subagents|Factor 10]] for delegation discipline).

## Podcast: AI That Works

The HumanLayer team runs a podcast discussing model optimization and agent design. Worth subscribing to for ongoing insights on human-in-the-loop patterns.

## Installation

> Status: imminent availability.
> `npx humanlayer join-waitlist --email ...`

The full IDE is in beta/waitlist as of clipping. Underlying open-source components are usable directly.

## Author / license

HumanLayer team. Apache 2.0 (commercial-friendly with attribution).

## Why this matters for our wiki

Three specific contributions:

1. **The human-in-the-loop framing as an explicit design principle.** Most ecosystem framings push toward autonomy; HumanLayer is the explicit counterweight. Worth folding into [[Reducing Hallucinations]] as a discipline (not just hooks/TDD/spec-driven-dev — also *deliberate human checkpoints at decision points*).

2. **The 60-line CLAUDE.md exemplar.** Concrete reference for [[Memory]] page. Brevity isn't accidental — it's discipline.

3. **The 12 Factor Agents framework** (worth fetching separately for principles). Frames agent design as an engineering discipline analogous to cloud-native app design.

## My assessment

HumanLayer is most useful as a **design philosophy reference** rather than an operational tool (until the IDE is generally available). The emphasis on human intervention is the right counter-pressure to over-autonomous designs that can compound errors.

For Alessandro's focus areas:
- [[Reducing Hallucinations]] — adds "explicit human checkpoints" to the structural defenses list
- [[Memory]] — the 60-line CLAUDE.md as model
- [[When to Delegate to Subagents]] — pairs with the human-in-the-loop principle (subagents *and* human gates work together)

Cross-references: [[Memory]] · [[Reducing Hallucinations]] · [[Subagents]] · [[Karpathy Coding Principles]] · [[Claude Code Ecosystem]]
