---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, skills, common-ground, hallucination-reduction]
source_url: https://github.com/jeffallan/claude-skills
source_author: Jeff Smolinski
license: MIT
---

# jeffallan claude-skills

A 66-skill plugin ecosystem covering languages, backend/frontend frameworks, infrastructure, APIs, testing, DevOps, security, data/ML, and platform specialists. 8.6k stars. By Jeff Smolinski (Principal Consultant at Synergetic Solutions).

For our wiki, this source is the canonical primary for the **`/common-ground` command** — a directly-on-point hallucination-reduction technique flagged for deep-dive in previous round.

## The `/common-ground` command — the headline contribution

Addresses a critical AI-coding failure mode: **Claude's hidden assumptions about your project.** Rather than letting Claude proceed from implicit (possibly wrong) understanding, `/common-ground` surfaces and validates those assumptions upfront.

How it works (per the project docs):
- Claude states what it believes about your codebase, architecture, dependencies, constraints
- You correct anything wrong before implementation begins
- It generates a **structured artifact** documenting shared understanding — a "single source of truth"
- Subsequent advice can't diverge into inaccurate territory because the baseline is explicit

When to use:
- **Project setup** — first session on a new codebase
- **After major architecture changes**
- **After team transitions** (new contributor, new agent)
- **After framework upgrades** that may have shifted invariants

The mechanism is described as "context engineering" — explicitly making Claude's mental model legible.

For our wiki, this is the **canonical assumption-surfacing technique**. Pair with [[TACHES Claude Code Resources|TÂCHES `/consider:first-principles`]] and Boris Cherny's "challenge Claude — grill me" pattern. Together they form the "make assumptions inspectable" toolkit.

## Other notable features

### 9 workflow commands (Jira/Confluence integration)
Manage epics from discovery → retrospectives. Atypically, these integrate with corporate PM tools, which most ecosystem skills don't.

### Feature Forge sequence
A multi-skill workflow:
```
Feature Forge → Architecture Designer → Fullstack Guardian → Test Master → DevOps Engineer
```
Demonstrates **skill composition through ordering** — each skill consumes the previous skill's output. Per [[Thariq Anthropic Skills + Sessions|Thariq]], explicit skill composition isn't natively managed yet, but works through references; this is one community implementation.

### 366 reference files
Skills are skill-folders with deep reference material — security hardening, debugging workflows, API design patterns. Heavy use of [[Skill Building|progressive disclosure]].

### 12 categories
Skills organized into discrete domains. Maps reasonably well to [[Thariq Anthropic Skills + Sessions|Thariq's 9 skill categories]] (with a few extras for platform specialists).

## Author

Jeff Smolinski (Principal Consultant at Synergetic Solutions). MIT license.

## My assessment

The repo is overall a competent skill collection, but `/common-ground` is the standout contribution worth lifting whether or not you adopt the rest. It's the most direct, most explicit answer to "how do I prevent Claude from running with wrong assumptions about my project?"

Worth installing the command alone (or replicating its pattern) even if you don't use the broader plugin. Add to your CLAUDE.md a note like "Run `/common-ground` at the start of any session on this project" and it becomes a session-start ritual.

For [[Reducing Hallucinations]]: this is the canonical example of **assumption-surfacing as defense**. Folded into the topic page.

For [[Skill Building]]: the Feature Forge skill-composition pattern is worth studying as one implementation of the skill-composition gap Thariq named.

Cross-references: [[Skills]] · [[Skill Building]] · [[Reducing Hallucinations]] · [[Context Engineering]] · [[Claude Code Ecosystem]]
