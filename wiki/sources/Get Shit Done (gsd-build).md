---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, framework, spec-driven, parallel-execution, xml-prompts]
source_url: https://github.com/gsd-build/get-shit-done
source_author: TÂCHES (Lex Christopherson)
license: MIT
---

# Get Shit Done (GSD)

A meta-prompting + context engineering framework explicitly built to make Claude Code reliable and consistent at scale. **57.5k stars.** Built by [[TACHES Claude Code Resources|TÂCHES]] — same author as the meta-skills repo (TÂCHES → audit-first design).

GSD's central thesis: address **context rot** (degradation as window fills) by structuring sessions around persistent artifacts and parallel-safe execution waves.

## Components

- **~33 specialized agents** — Planner, Plan Checker, Researcher, Executors, UAT Verifier, Debug, optional UI Designer / Security Enforcer / Doc Writer
- **~122 commands** spanning core workflow + brownfield ops + utilities
- **Markdown artifact hierarchy** — REQUIREMENTS.md, ROADMAP.md, PLAN.md, SUMMARY.md per feature

## The workflow cycle

```
gsd-new-project → gsd-discuss-phase → gsd-plan-phase → gsd-execute-phase → gsd-verify-work → ship
```

Each phase produces a markdown artifact persisting across sessions. Context rot mitigated by externalizing state.

## Distinctive techniques

### XML-structured plans (not just markdown)
Tasks use precise XML that Claude follows reliably:
```xml
<task type="auto">
  <name>Create login endpoint</name>
  <action>Use jose for JWT...</action>
  <verify>curl returns 200 + Set-Cookie</verify>
</task>
```

XML > markdown for structured task definition that needs strict instruction-following. Worth lifting into your own skills/commands.

### Wave-based parallelization
Dependencies determine execution waves. Independent plans run simultaneously; dependent plans wait. **Maximizes parallelism while respecting dependencies.** This is more sophisticated than naive parallelism.

### Atomic commits per task
Each completed task = one commit. Enables clean `git bisect` debugging. Aligns with [[Boris Cherny Tips Compendium|Boris's squash-merge / small-PR philosophy]].

### Fresh 200k-token context per executor
Each executor agent gets a fresh context. Pure example of [[Subagents]] as **cognitive isolation** rather than just specialization.

## Installation

```bash
npx get-shit-done-cc@latest
```

Cross-platform (CC, OpenCode, Gemini CLI, Kilo, Codex, Copilot, Cursor, Windsurf). Auto-detects runtime. CC 2.1.88+ for skill-based install.

## My assessment

GSD's most valuable contributions:
- **XML-structured tasks with `<verify>`** — explicit verification per task. Folds into [[Reducing Hallucinations]] as a structural pattern.
- **Wave-based parallelization** — beyond naive parallelism. Worth understanding as the right shape for parallel-safe orchestration.
- **Persistent artifact hierarchy** — same insight as [[ContextKit (Cihat Gunduz)|ContextKit]] (Spec.md / Tech.md / Steps.md per feature) and [[Spec Kit (github)|Spec Kit]] (constitution + spec + plan + tasks). Three independent implementations of the same insight = load-bearing pattern.

Author's anti-ceremony framing ("rejects sprint ceremonies, story points") is itself notable — pragmatic agile, not religious agile.

Cross-references: [[Spec-Driven Development]] · [[Subagents]] · [[Reducing Hallucinations]] · [[Test Time Compute]] · [[TACHES Claude Code Resources]] · [[Claude Code Ecosystem]]
