---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, plugins, learning, mistakes, methodology]
source_url: https://github.com/EveryInc/compound-engineering-plugin
source_author: EveryInc
license: MIT
---

# Compound Engineering Plugin

EveryInc's official plugin delivering 36+ skills and 51+ agents organized around a single inverted-debt insight: **each unit of engineering work should make subsequent units easier — not harder.** Cross-platform (Claude Code, Codex, Cursor, Copilot, others). 15.6k stars at clip.

For our wiki this is the canonical primary for [[Compound Engineering]] as a practice and the definitive "learn from mistakes" mechanism in the ecosystem.

## The core philosophy

> "80% is in planning and review, 20% is in execution."

> "A good review catches the pattern, not just the bug."

> "The next agent does not have to learn the same lesson from scratch."

Conventional engineering accumulates technical debt; compound engineering tries to accumulate **leverage**. Each cycle is structured to feed subsequent cycles: brainstorms sharpen plans, plans inform reviews, reviews document patterns, documented patterns inform future architecture.

## Primary commands

| Command | Purpose |
|---|---|
| `/ce-ideate` | Big-picture idea generation and critique |
| `/ce-brainstorm` | Requirements documentation via Q&A |
| `/ce-plan` | Detailed implementation planning |
| `/ce-work` | Execution with task tracking |
| `/ce-debug` | Systematic failure reproduction and root-cause analysis |
| `/ce-code-review` | Multi-agent review before merge |
| `/ce-compound` | Lesson documentation for future reuse |

Each command spawns specialized agents (reviewers, researchers, workflow agents) within a unified reasoning loop.

## The learning-from-mistakes mechanism (`/ce-compound`)

This is the load-bearing piece. The mechanism:

1. **`/ce-debug`** systematically reproduces the failure, traces root cause, and implements the fix.
2. **`/ce-code-review`** catches the *pattern* underlying the bug, not just the bug instance.
3. **`/ce-compound`** documents the lesson as a reusable artifact that future agents (and Claude sessions) inherit.

The cycle creates compounding returns: each brainstorm sharpens future plans; each review documents patterns; documented patterns inform architecture decisions on the next feature.

This is structurally similar to [[Context Engineering Kit (NeoLabHQ)|Reflexion]] (self-critique with curated memory) but operates at the *project/team* level rather than per-session.

## Cross-platform installation

| Platform | Command |
|---|---|
| Claude Code | `/plugin marketplace add EveryInc/compound-engineering-plugin` then `/plugin install compound-engineering` |
| Cursor | Search marketplace for "compound engineering" |
| Codex | Register marketplace, install via Bun CLI, use Codex TUI |
| Copilot (VS Code) | Command palette → `Chat: Install Plugin from Source` |
| Copilot CLI / Droid / Qwen | Marketplace registration + install |
| Custom (OpenCode, Pi, Gemini, Kiro) | `bunx @every-env/compound-plugin install compound-engineering --to [target]` |

The cross-platform reach is unusual and worth noting — most plugins target Claude Code only.

## Author / EveryInc

EveryInc is the company behind Every (every.to), a media + software org. They've published essays on the philosophy:
- "Compound Engineering: How Every Codes with Agents"
- "My AI Had Already Fixed the Code Before I Saw It"

The plugin is the operationalization of those essays.

## My assessment

The single most valuable thing here is the **explicit mechanism for converting mistakes into reusable artifacts**. Most ecosystems treat learning as implicit — Compound Engineering names it, schedules it, and gives it a command.

Pair this with:
- [[Context Engineering Kit (NeoLabHQ)|Reflexion]] — for in-session self-critique loops
- [[claudekit (Carl Rannaberg)|claudekit]] — for the runtime guardrails that catch errors worth learning from
- [[Karpathy Coding Principles]] — for the per-edit discipline

For Alessandro specifically: the `/ce-compound` step is the missing link between "Claude made a mistake this session" and "future sessions don't repeat it." Without an explicit lesson-documentation pass, mistakes evaporate when the conversation ends. Worth treating as a candidate session-end ritual even outside the plugin's structure.

The `80/20` planning-vs-execution claim is opinionated but consistent with [[Superpowers (obra)|Superpowers]]'s "judgment-free execution + judgment-rich planning" stance. Two independent groups arriving at the same ratio is a signal worth taking seriously.

Cross-references: [[Compound Engineering]] · [[Reducing Hallucinations]] · [[Plugins]] · [[Memory]] · [[Claude Code Ecosystem]]
