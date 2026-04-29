---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, index, prolific-author, agentic-os, domain-diversity]
source_url: https://github.com/danielrosehill/Claude-Code-Repos-Index
source_author: Daniel Rosehill
---

# Claude Code Repos Index (Daniel Rosehill)

A curated index of **75+ Claude Code repositories** by a single author, organized by use case and domain. Per [[Awesome Claude Code (hesreallyhim)|the awesome list]] curator: "the work of a prolific genius, or a very clever bot (or both)."

For our wiki, this source is uniquely valuable as **proof that Claude Code is a general-purpose agentic operating system, not a coding assistant**. One person built 75+ repos applying the same patterns (folder structure, CLAUDE.md, slash commands, MCP) across completely unrelated domains.

## Domain coverage (representative slice)

- **Systems administration** — bash aliases, system recovery, KDE Plasma, Linux debugging
- **Productivity & planning** — career tracking, budgeting, purchasing, personal planning
- **Legal & research** — evidence logging, document analysis, redaction, deep research
- **Health & wellbeing** — medical visit management, therapy tracking
- **Communications** — content creation, blog management, websites
- **Multi-agent systems** — orchestration frameworks, task queues, sub-agent networks
- **Media production** — audio/video editing, transcription, podcast assembly
- **Data work** — analysis, cleaning, visualization, wrangling

## Standout infrastructure repos

A few that directly inform our wiki's focus:

### Context engineering
- **CONTEXT.md** — patterns for context structuring
- **Claude-Code-Context-Toolkit** — separating human-authored context from AI-optimized briefings

### Skill scaffolding
- **Agent Workspace Generator** — standardized workspaces conforming to "Agent Workspace Model v1.1" with validation + publishing slash commands
- **Claude Development Agents** — 74+ pre-configured agent setups

### Plugin architecture
- **28 cluster plugins** — consolidate domain primitives (commands, skills, agents) globally; provision per-project scaffolds on demand. **Scalable alternative to forking template repos.**

### Linux desktop
- **Claude-Code-Linux-Desktop-Slash-Commands** — hardware benchmarking, filesystem organization, security posture validation. (Already noted in [[Awesome Claude Code (hesreallyhim)|awesome list]].)

## What this represents

> Claude Code is not a coding assistant. It's a **general-purpose agentic operating system**.

One developer applied the same design patterns across 75+ unrelated domains. The consistency suggests:
1. Mature mental model for human-AI collaboration workflows
2. Claude Code's primitives (folder structure, CLAUDE.md, slash commands, MCP) are domain-agnostic enough to support arbitrary use cases
3. The marginal cost of building a Claude Code project for a new domain has dropped low enough that prolific application is feasible

This is a bigger insight than any single repo. **Claude Code mastery is partly a mindset shift**: see new domains, ask "could I build a Claude Code workspace for this?"

## Author

Daniel Rosehill (`danielrosehill.com`). The index explicitly clarifies he's human, not AI-generated, addressing skepticism about prolific output.

## My assessment

For Alessandro's focus areas, this source matters in two ways:

1. **Mindset shift for the wiki itself** — Claude Code can be the substrate for *any* domain knowledge work. Worth treating as an option whenever a domain becomes complex enough that ad-hoc tools aren't enough.

2. **Direct value of specific infrastructure repos** — particularly the Agent Workspace Generator (standardized scaffolding) and the 28 cluster plugins (scalable distribution model).

The "75+ repos by one person" is itself a data point about the productivity ceiling Claude Code enables. [[gstack (Garry Tan)|Garry Tan's "810×"]] and [[Boris Cherny Tips Compendium|Boris's "141 PRs in a day"]] are the same insight from different angles: AI-assisted developers who structure their work systematically can ship at order-of-magnitude higher rates.

Cross-references: [[Daniel Rosehill]] · [[Skills]] · [[Memory]] · [[Plugins]] · [[Claude Code Ecosystem]]
