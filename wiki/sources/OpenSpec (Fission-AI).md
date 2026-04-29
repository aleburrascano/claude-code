---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, spec-driven, agreement-first, lightweight]
source_url: https://github.com/Fission-AI/OpenSpec
source_author: Fission-AI
license: MIT
---

# OpenSpec (Fission-AI)

A lightweight spec-driven-development framework. 43k stars per [[shanraisshan Claude Code Best Practice|shanraisshan]]. Cross-tool (25+ AI assistants).

OpenSpec's framing: **agreement-first**. Establish specifications upfront and use them as the load-bearing artifact between humans and AI. Iterative ("fluid not rigid"), not waterfall.

## The workflow

`/opsx:propose <feature>` generates a structured **change folder** containing:
- **Proposal** — why and what
- **Specs folder** — requirements + use-case scenarios
- **Design document** — technical approach + architecture
- **Tasks** — implementation checklist

Work organized in `openspec/changes/`. Completed work archives for future reference.

## Installation

```bash
npm install -g @fission-ai/openspec@latest
cd your-project
openspec init
```

Then `/opsx:propose <feature>` in your AI assistant.

## My assessment

OpenSpec is **the most lightweight** SDD framework in our wiki's coverage. No 4-phase ceremony, no constitution, no quality-agent suite. Just: propose → folder of artifacts → execute.

Best for users who want **SDD discipline without framework weight**. Worse for teams that want strong opinions baked in (use [[ContextKit (Cihat Gunduz)|ContextKit]] for that, or [[Spec Kit (github)|Spec Kit]]).

The "agreement-first" framing is worth keeping in mind: the specs aren't documentation, they're agreements between human and AI. Same insight as [[jeffallan claude-skills|/common-ground]] but operating at the feature spec level rather than the project assumption level.

Cross-references: [[Spec-Driven Development]] · [[Reducing Hallucinations]] · [[Claude Code Ecosystem]]
