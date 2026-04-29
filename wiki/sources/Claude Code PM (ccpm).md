---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, project-management, github-issues, parallel-execution, agentskills]
source_url: https://github.com/automazeio/ccpm
source_author: Ran Aroussi (Automaze)
license: MIT
---

# Claude Code PM (ccpm)

An Agent Skill system for **GitHub-Issues-anchored project management**. By Ran Aroussi (Automaze).

The thesis: AI-assisted coding fails when context evaporates between sessions and parallel work conflicts. ccpm solves both by anchoring everything to written specifications with full traceability via GitHub Issues + Git worktrees.

> "No Vibe Coding" — every line of code must trace back to a specification.

## The 5 phases

1. **Planning** — guided brainstorming → PRDs in `.claude/prds/`. Asks clarifying questions before writing.
2. **Epic Creation** — PRDs become technical epics with architecture decisions in `.claude/epics/<feature>/epic.md`.
3. **Task Decomposition** — epics break into 7-10 parallelizable tasks with explicit metadata: `depends_on`, `parallel`, `conflicts_with`.
4. **GitHub Sync** — tasks become GitHub Issues with parent-child relationships; dedicated worktrees isolate parallel streams.
5. **Execution & Tracking** — multiple agents work simultaneously on independent streams.

## Distinctive techniques

### Parallel work decomposition with explicit conflict metadata
Most frameworks have parallel execution; ccpm adds **`depends_on` / `parallel` / `conflicts_with`** as first-class task metadata. This makes parallelization safe (won't run conflicting tasks simultaneously) and explicit (you can see what depends on what).

### Velocity math
Traditional serial: 1 agent × 5 tasks = 5x wall time. ccpm parallel: 5 agents × independent streams = 1x wall time. The conductor conversation orchestrates without drowning in implementation details.

### 14+ bash scripts for instant operations
Status checks, standup reports, search, validation — all bash, no LLM overhead. Saves tokens for actual work; matches [[Token Efficiency]] discipline.

### "AgentSkills.io" standard compliance
ccpm follows the [agentskills.io](https://agentskills.io) open standard. **Harness-agnostic** — works with any agent framework that supports the standard, not just Claude Code.

## Components

- 5-phase workflow with dedicated references and tools per phase
- GitHub-native (Issues + worktrees)
- 14+ deterministic bash scripts
- Parent-child issue relationships preserved

## Installation

Prerequisites: authenticated `git` and `gh` CLI tools.

- Claude Code: clone repo, add to `.claude/skills/ccpm/`
- Factory/Droid: symlink into skills directory
- Other agentskills.io-compliant: point your framework at `skill/ccpm/`

## My assessment

ccpm's most valuable contributions:

1. **Explicit dependency metadata for parallel execution** — `depends_on`/`parallel`/`conflicts_with` is the right shape for safe parallelism. Worth lifting into any multi-agent workflow.

2. **GitHub Issues as the persistence layer** — most frameworks invent their own artifact system. ccpm uses GitHub Issues, which most teams already use for tracking. Lower adoption friction.

3. **Bash scripts for deterministic operations** — status checks, search, validation. Nothing the LLM can do better than `grep`. Saves significant tokens. Matches [[Token Efficiency]] philosophy ("agentic search > vector DB" in the right spots — but here, **bash > agent** for purely-deterministic operations).

4. **agentskills.io standard compliance** — the framework is portable. As Claude Code's primitives stabilize, more frameworks will move toward standards-based portability.

Best for: teams that already use GitHub Issues + want to scale Claude Code work across multiple agents in parallel without conflicts. Less ideal for solo devs not using GitHub-native PM.

Cross-references: [[Subagents]] · [[Token Efficiency]] · [[Spec-Driven Development]] · [[Claude Code Ecosystem]]
