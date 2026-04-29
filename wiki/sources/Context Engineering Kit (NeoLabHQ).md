---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, context-engineering, token-efficiency, plugins, multi-agent]
source_url: https://github.com/NeoLabHQ/context-engineering-kit
source_author: NeoLabHQ
license: GPL-3.0
---

# Context Engineering Kit (NeoLabHQ)

A marketplace of hand-crafted Claude Code plugins specifically engineered for **agent reliability, output quality, and token efficiency** through advanced [[Context Engineering]], multi-agent orchestration, and quality-gated execution. Among the most directly on-point sources in this wiki for our focus areas.

## Flagship plugins

- **Spec-Driven Development (SDD)** — Transforms prompts into production code via structured planning, architecture design, and LLM-as-Judge verification gates. Author claims ~99% working code on real production projects. See [[Spec-Driven Development]].
- **Subagent-Driven Development (SADD)** — Orchestrates parallel/sequential [[Subagents]] with independent judge verification and automatic retry loops. The architectural counterpart to SDD.
- **Reflexion** — Feedback loops enabling self-critique and iterative refinement with curated memory across iterations.

## Quality & review

- **Review Plugin** — Multi-agent code analysis (bug-hunter, security-auditor, test-coverage-reviewer, etc.) with **impact/confidence filtering** to avoid noise.
- **Test-Driven Development plugin** — TDD commands with anti-pattern detection and test-fixing orchestration.

## Reasoning & analysis

- **FPF (First Principles Framework)** — Transparent, auditable reasoning via ADI cycles (Abduction–Deduction–Induction) with **hypothesis competition** and evidence-based trust scoring. Notable for making reasoning steps explicit and inspectable.
- **Kaizen** — Continuous-improvement plugin: 5 Whys, fishbone analysis, root-cause tracing, PDCA cycles. Pairs well with [[Compound Engineering Plugin]] for institutional learning.

## Supporting infrastructure

- **Tech Stack Plugin** — Auto-injects language-specific best practices (TypeScript focused initially).
- **Customaize Agent** — Framework for authoring commands, skills, hooks, and subagents — a meta-skill (see also [[TACHES Claude Code Resources]]).
- Workflow plugins: Git, Docs, MCP integrations.

## Notable techniques (with our focus lens)

### Context engineering
- **Context isolation across subagents** to prevent "context rot" and maintain peak LLM performance. Each agent gets a fresh context appropriate to its role.
- **Progressive disclosure** and **attention-budget optimization** — load only what the current step needs.

### Token efficiency
- **Granular plugin installation** — load only what you need; the kit is *not* a monolith.
- **Preference for command-oriented skills over general-purpose information skills** — bias toward action-loaded skills, not knowledge dumps.

### Hallucination & bias reduction
- **MAKER pattern** — clean-state launches, filesystem memory, multi-agent voting.
- **Chain-of-Verification** and **process reward models** for step-by-step validation.
- **Competitive generation** — multiple candidates produced in parallel, judged, and synthesized.

### Reasoning quality
- **Zero-shot and few-shot CoT tailored per agent role** — different agents get different reasoning scaffolds.
- **Tree of Thoughts** exploration with pruning of unpromising branches.
- **Structured rubrics and verified judgment scoring** (the LLM-as-Judge mentioned above).

## Design philosophy

> "Development as compilation" — minimize developer time while maintaining production-ready quality.

The kit is opinionated toward **evidence-based, scientifically-grounded patterns** over heuristics. Works best in complex existing codebases where impact analysis guides planning. Less useful for greenfield 50-line scripts.

## Installation

```
/plugin marketplace add NeoLabHQ/context-engineering-kit
/plugin install [plugin-name]@NeoLabHQ/context-engineering-kit
```

Also supports Cursor, Antigravity, OpenCode via `npx skills add`.

## My assessment

This is a top-shelf resource for our focus. SDD/SADD demonstrate how to build *reliable* multi-agent systems, not just clever ones. The FPF reasoning framework is genuinely novel — most "reasoning" plugins are just chain-of-thought; FPF makes reasoning structured and auditable.

The license (GPL-3.0) is more restrictive than the typical MIT in this ecosystem — worth noting if Alessandro plans to incorporate code into proprietary work. The patterns themselves are not encumbered.

Pair with [[Compound Engineering Plugin]] for the learning loop, [[Superpowers (obra)]] for SDLC workflow scaffolding, and [[claudekit (Carl Rannaberg)]] for hook-based quality gates. Together those four cover most of the ground for production-grade Claude Code use.

Cross-references: [[Context Engineering]] · [[Token Efficiency]] · [[Spec-Driven Development]] · [[Subagents]] · [[Reducing Hallucinations]] · [[Claude Code Ecosystem]]
