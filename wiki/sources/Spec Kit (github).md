---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, github, spec-driven-development, planning, official]
source_url: https://github.com/github/spec-kit
source_author: GitHub
---

# Spec Kit (github)

GitHub's official open-source toolkit for **Spec-Driven Development**. Operationalizes [[Spec-Driven Development|SDD]] across 30+ AI coding agents (Claude Code, GitHub Copilot, Cursor, etc.). 91k stars per [[shanraisshan Claude Code Best Practice|shanraisshan's workflow comparison]].

The pitch: specifications become **executable** rather than advisory. Generate working implementations directly from detailed specs — no "specs as scaffolding to discard once coding begins."

## The 5 primary commands

| Command | Purpose |
|---|---|
| `/speckit.constitution` | Project governance principles and development guidelines |
| `/speckit.specify` | Functional requirements and user stories |
| `/speckit.plan` | Technical architecture and implementation strategy |
| `/speckit.tasks` | Decompose plans into ordered, dependency-aware tasks |
| `/speckit.implement` | Execute task lists to build features |

Optional quality gates:
- `/speckit.clarify` — explicitly surfaces underspecified requirements *before* `/speckit.plan` commits to architecture
- `/speckit.analyze` — pre-implementation review

## The methodology

Sequence:
```
constitution → specify → clarify → plan → tasks → implement
```

This is more granular than the typical [[Spec-Driven Development|SDD]] sequence (research→plan→execute). The added phases:
- **Constitution** — establishes project-wide governance (style, testing standards) that guides every subsequent agent decision
- **Clarify** — explicit ambiguity-resolution gate before architecture commits

The constitution-first pattern is novel. Most SDD frameworks treat governance as an afterthought; Spec Kit makes it the *first* artifact, ensuring downstream specs and plans inherit it.

## Extensions and presets

- **150+ community-contributed extensions** — Jira integration, security review, V-Model test traceability, parallel feature orchestration
- **Presets** — customize artifact formats and terminology without changing tooling. Enables organizational compliance, methodology adaptation, localization.

The extension model is well-considered: customize *what gets generated* without forking the framework.

## Installation

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@vX.Y.Z
specify init <project>     # then select your coding agent integration
```

`uv` recommended; `pipx` works.

## Author

GitHub officially. Influence credited to researcher John Lam's work on AI-driven development workflows.

## Why this matters for our wiki

Spec Kit is a major data point for [[Spec-Driven Development]]:

- **GitHub's bet on SDD as the discipline** matters strategically. When the platform that hosts most of the world's code commits to a methodology, it's worth taking seriously.
- The **constitution-first** pattern is genuinely novel. Worth folding into [[Spec-Driven Development]] as a recommended addition to the basic spec→plan→execute sequence.
- **/speckit.clarify** as an explicit gate is a structural answer to "Claude implements the wrong thing." Closer to a checkpoint than [[jeffallan claude-skills|/common-ground]] (which surfaces assumptions about *the project*); /speckit.clarify surfaces ambiguity in *this spec*.
- **Cross-tool support** (30+ AI agents) means the methodology is portable. Skills built on Spec Kit work across the ecosystem.

## Comparison to other workflow frameworks (per [[shanraisshan Claude Code Best Practice]])

Spec Kit, [[Superpowers (obra)]], [[Compound Engineering Plugin]], [[Everything Claude Code (affaan-m)]], BMAD, OpenSpec, gstack, Get Shit Done, oh-my-claudecode, HumanLayer all converge on Research→Plan→Execute→Review→Ship. Spec Kit's distinctive contribution is **explicit governance** (constitution) and **explicit clarification** (clarify gate).

If your team is GitHub-native and already uses Copilot, Spec Kit is the obvious entry point. If you're Claude-Code-native and want spec-driven discipline, [[Context Engineering Kit (NeoLabHQ)|NeoLabHQ's SDD plugin]] is the parallel choice.

## My assessment

Spec Kit is the **most institutionally backed** spec-driven implementation in the ecosystem. The constitution-first pattern is worth adopting whether or not you use the rest. The clarify-as-gate pattern is worth lifting into any SDD-style workflow.

For Alessandro's focus areas: the "constitution" idea maps to [[Memory|CLAUDE.md as discipline]] (e.g., the [[Karpathy Coding Principles|Karpathy four principles CLAUDE.md]]). Same insight, different framing — your project's persistent rules govern Claude's reasoning across all subsequent specs and plans.

Cross-references: [[Spec-Driven Development]] · [[Planning Mode]] · [[Memory]] · [[Reducing Hallucinations]] · [[Claude Code Ecosystem]]
