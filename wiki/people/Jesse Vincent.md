---
type: person
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [people, claude-code, framework-author, prime-radiant]
aliases: [obra]
---

# Jesse Vincent

Software engineer and entrepreneur, founder of **Prime Radiant**. GitHub handle: **obra**. Active in the open-source Claude Code community with sponsorship programs, Discord engagement, and frequent releases.

## Relevance to mastering Claude Code

Author of [[Superpowers (obra)|Superpowers]] — a composable skills framework + software-development methodology for Claude Code. Among the most influential framework-level contributions to the ecosystem.

Key contributions to the wiki's focus areas:

- **subagent-driven-development** — independent subagents per task with **two-stage review** (spec compliance → code quality). The two-stage ordering is the distinctive insight. See [[Subagents]] and [[When to Delegate to Subagents]].
- **writing-plans** — bite-sized tasks (2–5 minutes each) with explicit file paths and verification steps. See [[Spec-Driven Development]] and [[Vertical Slice]].
- **test-driven-development** — strict RED-GREEN-REFACTOR with anti-patterns reference. See [[Test-Driven Development with Claude]].
- **systematic-debugging** — four-phase root-cause analysis with defense-in-depth.
- **writing-skills** — meta-skill for skill construction. One of four converging meta-skills in the wiki ([[Skill Building]]).

## Design philosophy

Vincent's framing: empowerment through **scaffolding**. Agents work best with bite-sized tasks "clear enough for an enthusiastic junior engineer with poor taste, no judgement" to follow. This intentionally pushes judgment back to the *planning* phase, where the human can intervene.

The "Superpowers" name reflects this: the model's raw capability becomes reliable output when wrapped in systematic processes, review mechanisms, and verification checkpoints.

Notable: explicit rejection of YAGNI in this framework — counterintuitive but consistent with the planning-heavy approach. Plan thoroughly, execute mechanically.

## Cross-platform reach

Superpowers ships across Claude Code, Cursor, OpenAI Codex CLI/App, OpenCode, GitHub Copilot CLI, and Gemini CLI. One of the broader-reach plugins in the ecosystem.

## Cross-references

- [[Superpowers (obra)]] · [[Skill Building]] · [[Spec-Driven Development]]
- [[Subagents]] · [[Test-Driven Development with Claude]]
- [[Karpathy Coding Principles]] (his framework operationalizes Karpathy's "Goal-Driven Execution" at framework scale)
