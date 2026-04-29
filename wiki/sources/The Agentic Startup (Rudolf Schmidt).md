---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, framework, multi-agent, output-styles, spec-driven]
source_url: https://github.com/rsmdt/the-startup
source_author: Rudolf Schmidt
license: MIT
---

# The Agentic Startup (Rudolf Schmidt)

Multi-agent framework that **organizes Claude Code into team-based roles** for production software development. By Rudolf Schmidt. **One of the few frameworks in the ecosystem that actually uses [[Output Styles]]** (highlighted by [[Awesome Claude Code (hesreallyhim)|the awesome list curator]] for this reason).

## Two plugins

### Start plugin
10 user-invocable skills across three phases:
- **Setup** — constitution rules
- **Build** — specify → validate → implement pipeline
- **Maintain** — analyze, refactor, debug

Orchestrates parallel agent execution and enforces quality gates.

### Team plugin (optional)
Eight specialized roles: **Chief, Analyst, Architect, Software Engineer, QA Engineer, Designer, Platform Engineer, Meta Agent**. 20 activity-based agents. **Version 3 introduces experimental Agent Teams** for autonomous multi-agent collaboration.

## The Output Styles contribution (uniquely valuable)

Two distinct output styles altering Claude's communication while maintaining quality:

### "The Startup" (high-energy execution)
> Energetic, celebratory communication focused on rapid delivery.

Invoke: `/output-style "start:The Startup"`.

### "The ScaleUp" (calm confidence + educational depth)
**Includes explanatory insights during execution.** Example: "I used exponential backoff here because this endpoint has rate limiting." Valuable for **learning unfamiliar codebases**.

Invoke: `/output-style "start:The ScaleUp"`.

This is the **canonical example in our wiki of Output Styles done well**. See [[Output Styles]].

## The workflow

1. **Specify** — three documents: requirements, solution design, **execution manifest with unit-level decomposition**
2. **Validate** — quality gates (completeness, consistency, correctness)
3. **Implement** — phase-by-phase, parallel agent coordination, test validation
4. **Review** — four specialized reviewers: security, performance, quality, test coverage
5. **Maintain** — ongoing analysis, refactoring, debugging

**Specs persist on disk** — resume mid-spec or mid-implementation across sessions. Critical for context window management.

## Installation

```bash
curl -fsSL https://raw.githubusercontent.com/rsmdt/the-startup/main/install.sh | sh
```

Requires CC v2.0+ with marketplace support. Basic usage:
```text
/specify Add user authentication with OAuth support
/implement 001
```

## Author / community

Rudolf Schmidt. **42 releases**, 263 stars (smaller community than most heavy frameworks but actively developed).

## My assessment

The Agentic Startup's most distinctive contributions:

1. **Output Styles in production** — almost unique in the ecosystem. The ScaleUp style's "explain decisions inline" is particularly valuable for ramp-up on unfamiliar codebases. Worth borrowing the pattern even if you don't adopt the framework.

2. **Role-based agent organization** — Chief, Analyst, Architect, etc. Adjacent to [[gstack (Garry Tan)|gstack's role-based skill model]]. The CEO/manager-level roles (Chief, Analyst) are atypical; most frameworks focus on engineering roles.

3. **Quality gates as named phase boundaries** — `validate` between `specify` and `implement`. Comparable to [[Spec Kit (github)|Spec Kit's `/speckit.clarify`]] gate. Pattern: explicit stop-and-check phases prevent forward drift.

4. **Disk-persistent specs** — work survives session boundaries. Essential for sustained development.

For Alessandro's focus areas, the Output Styles work alone makes this worth knowing about. The ScaleUp educational style is genuinely useful for learning new codebases — pair with built-in **Explanatory** style ([[Boris Cherny Tips Compendium|Boris recommends Explanatory]]) as candidates for "learning mode."

Cross-references: [[Output Styles]] (canonical implementation example) · [[Spec-Driven Development]] · [[Subagents]] · [[gstack (Garry Tan)]] (role-based parallel) · [[Claude Code Ecosystem]]
