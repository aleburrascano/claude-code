---
type: source
created: 2026-04-27
updated: 2026-04-27
sources: 1
tags: [agent, subagent, skill, plugin, marketplace, model-routing, three-tier]
source_path: (no raw — discovered via hyperlink in raw/repos/davila7-claude-code-templates.md)
source_date: 2026-04-27
source_author: wshobson
source_url: https://github.com/wshobson/agents
license: MIT
---

# agents (wshobson)

Discovered via the attribution section of [[Claude Code Templates (Daniel Avila)]] (cited as "48 agents" — **the cited count is stale; the repo now ships 184 specialized agents** organized into 78 plugins with 150 agent skills and 98 commands across 25 categories).

## Why it matters for the wiki

This is the largest **plugin-architected agent collection** in the ecosystem. It demonstrates two patterns the wiki should track explicitly:

### 1. Granular plugin architecture for context isolation

Each plugin loads only its own agents, commands, and skills (avg 3.6 components per plugin) — a deliberate **token-efficiency design** that fights skill bloat at install time. Aligns with [[Memory|small-CLAUDE.md discipline]] and [[Token Efficiency|MCP <80 tools]] guidance, but applied at the plugin layer.

### 2. Three-tier model routing per agent

Agents are pre-assigned to model tiers based on task criticality:

| Tier | Use case | Examples |
|---|---|---|
| **Opus 4.7** | Critical work | Architecture, security review, code review |
| **Inheritable** | User choice | Defaults to user's main model |
| **Sonnet 4.6** | Balanced | Most development tasks |
| **Haiku 4.5** | Operational speed | Deployment, ops, mechanical work |

This is the wiki's clearest example of **model-tier-as-config-on-the-agent** — a canonical [[Subagents|subagent design pattern]]. Boris's [[Test Time Compute]] insight ("multiple uncorrelated context windows") meets [[oh-my-claudecode|smart model routing]] at agent-collection scale.

## Categories (25)

Development, Documentation, Workflows, Testing, Quality, AI/ML, Data, Database, Operations, Performance, Infrastructure, Security, Governance, Languages, Blockchain, Finance, Payments, Gaming, Creative, Accessibility, Marketing, Business, API, Utilities, Modernization.

## Multi-agent orchestration

**16 workflow orchestrators** coordinate agents across full-stack development, security, ML pipelines, and incident response. This is meta-agent territory: agents that delegate to other agents along a defined workflow. Adjacent to [[BMAD-METHOD|BMAD's Party Mode]] and [[oh-my-claudecode]] orchestration patterns, but with the model-tier baked in.

## Install

```
/plugin marketplace add wshobson/agents
/plugin install <plugin-name>
```

## Cross-references

- [[Subagents]] — three-tier model assignment is a canonical pattern
- [[Skills]] — 150 agent skills with progressive activation
- [[Plugins]] — granular 3.6-components-per-plugin architecture for context isolation
- [[Test Time Compute]] — Boris's reframing applies at agent-collection scale
- [[Token Efficiency]] — plugin-scope context loading as a design lever
- [[Claude Code Templates (Daniel Avila)]] — attribution source (stale "48 agents" count)
- [[Claude Code Ecosystem]] — agent-collection subsection
