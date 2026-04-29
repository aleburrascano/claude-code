---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, learning-resource, feature-reference, tutorial]
source_path: raw/repos/luongnv89-claude-howto.md
source_date: 2026-04-26
source_author: luongnv89 (Luong Nguyen)
source_url: https://github.com/luongnv89/claude-howto
---

# Claude HowTo (luongnv89)

A visual, example-driven tutorial repository for Claude Code structured as a **10-module learning roadmap** (~11–13 hours end-to-end). 21,800+ stars on GitHub at the time of clipping. Maintained in lockstep with Claude Code releases (latest at clip: v2.1.119, April 2026). For this wiki, this source serves as the **canonical feature reference** — the cleanest enumeration of Claude Code's primitives currently available.

## The 10 modules

| # | Module | Level | Time |
|---|---|---|---|
| 1 | [[Slash Commands]] | Beginner | 30 min |
| 2 | [[Memory]] | Beginner+ | 45 min |
| 3 | [[Checkpoints]] | Intermediate | 45 min |
| 4 | CLI Basics | Beginner+ | 30 min |
| 5 | [[Skills]] | Intermediate | 1 hr |
| 6 | [[Hooks]] | Intermediate | 1 hr |
| 7 | [[Model Context Protocol|MCP]] | Intermediate+ | 1 hr |
| 8 | [[Subagents]] | Intermediate+ | 1.5 hr |
| 9 | Advanced Features | Advanced | 2–3 hr |
| 10 | [[Plugins]] | Advanced | 2 hr |

Modules ship with copy-paste configs (slash commands, CLAUDE.md templates, hook scripts, MCP configs, subagent definitions, plugin bundles), Mermaid diagrams of how each feature works under the hood, and quizzes via `/lesson-quiz [topic]` and `/self-assessment`.

## Why this is the cleanest taxonomy

luongnv89 distinguishes the primitives crisply:

| Feature | Invocation | Persistence | Best For |
|---|---|---|---|
| Slash Commands | Manual `/cmd` | Session only | Quick shortcuts |
| Memory | Auto-loaded | Cross-session | Long-term learning |
| Skills | Auto-invoked | Filesystem | Automated workflows |
| Subagents | Auto-delegated | Isolated context | Task distribution |
| MCP | Auto-queried | Real-time | Live data access |
| Hooks | Event-triggered | Configured | Automation & validation |
| Plugins | One command | All features | Complete solutions |
| Checkpoints | Manual/Auto | Session-based | Safe experimentation |
| Planning Mode | Manual/Auto | Plan phase | Complex implementations |
| Background Tasks | Manual | Task duration | Long-running operations |

Each row maps to a concept page in this wiki — the primitives section is essentially built on this enumeration.

## Standout details captured

- **Hook taxonomy (5 types, 28 events)** — Tool, Session, Task, Lifecycle, plus event-specific types. This count is the most precise I've seen; concrete event names live in [[Hooks]].
- **Permission modes**: `default`, `acceptEdits`, `plan`, `dontAsk`, `bypassPermissions`. Naming is non-obvious; worth memorizing.
- **Headless mode**: `claude -p "Run tests and generate report"` for CI/CD integration. Pairs with `--output-format json` for parseable scripts.
- **Session management**: `/resume`, `/rename`, `/fork`, `claude -c`, `claude -r` — fork is the underrated one for branching exploration.
- **Extended Thinking**: toggled with `Alt+T` / `Option+T` ([[Extended Thinking]]).

## Example workflows the README sketches

- **Code Review** = Slash Commands + Subagents + Memory + MCP
- **Documentation** = Skills + Subagents + Memory
- **DevOps Deployment** = Plugins + MCP + Hooks
- **Refactoring** = Checkpoints + Planning Mode + Hooks

These compositions make a useful point: the primitives are most valuable in combination, not in isolation. The wiki's [[Getting the Most from Claude Code]] topic page builds on this insight.

## Maintenance and currency

Synced with every Claude Code release. Author is responsive — the README was on v2.1.119 hours after release per the changelog. Worth treating as the live reference; revisit when major versions ship. The repo also offers an EPUB build (`uv run scripts/build_epub.py`) for offline reading.

## License and reuse

MIT. Templates can be copied into any project freely.

## My assessment

If a person new to Claude Code asks "where do I start," this is the right pointer. For mastering Claude Code in our wiki's sense, it's the **breadth scaffold** — concept pages built on this taxonomy let us layer depth (token efficiency, hallucination reduction, subagent design) on top of a clean enumeration. The official Anthropic docs are the authoritative spec; this is the *teachable* spec.

Cross-references: [[Claude Code]] · all primitive concept pages · [[Getting the Most from Claude Code]] · [[Claude Code Ecosystem]]
