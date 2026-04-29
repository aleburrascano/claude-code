---
type: person
created: 2026-04-26
updated: 2026-04-26
sources: 2
tags: [people, claude-code, curator, hub-author]
---

# shanraisshan

Pakistani developer, prolific Claude Code curator. Creator of:

- [[shanraisshan Claude Code Best Practice|claude-code-best-practice]] — comprehensive hub repo with 82 tips, 10-workflow comparison, compiled Boris/Thariq tip docs
- [claude-code-hooks](https://github.com/shanraisshan/claude-code-hooks) — voice/audio hook collection (327 stars)
- [codex-cli-best-practice](https://github.com/shanraisshan/codex-cli-best-practice) — same shape for Codex
- [codex-cli-hooks](https://github.com/shanraisshan/codex-cli-hooks)
- [gemini-cli-best-practice](https://github.com/shanraisshan/gemini-cli-best-practice)
- [gemini-cli-hooks](https://github.com/shanraisshan/gemini-cli-hooks)

For our wiki, shanraisshan is the **canonical curator** of the Claude Code ecosystem. The claude-code-best-practice repo is the most comprehensive single index of community resources, tips, and Boris/Thariq guidance.

## Distinctive contributions

### Cross-tool curation discipline
Same hub structure for Claude Code, Codex, Gemini. Treats CLI-AI tooling as a category, not as Claude-Code-specific. As multi-vendor agent setups become more common (per [[gstack (Garry Tan)|gstack's `/pair-agent`]]), this cross-tool perspective becomes more valuable.

### Boris/Thariq tip compilation
Boris Cherny and Thariq tweet threads are publicly available but scattered. shanraisshan compiles them into single docs (`tips/claude-boris-13-tips-03-jan-26.md`, etc.) — making them citable, durable, and searchable.

This single contribution closed our wiki's previous "deferred Boris Cherny work." Without shanraisshan, fetching Boris's guidance would require traversing months of X posts.

### 82-tip taxonomy in 15 categories
Prompting, Planning/Specs, Context, Session Management, CLAUDE.md/.claude/rules, Agents, Commands, Skills, Hooks, Workflows, Workflows Advanced, Git/PR, Debugging, Utilities, Daily.

Each tip annotated with `🚫👶` ("do not babysit") for autonomous-friendly tips. Useful annotation system.

### 10-workflow comparison
Comparing Superpowers, ECC, Spec Kit, gstack, GSD, BMAD, OpenSpec, oh-my-claudecode, Compound Engineering, HumanLayer side by side with star counts and counts of (subagents, commands, skills). Reveals that all 10 converge on Research → Plan → Execute → Review → Ship.

### Voice/audio hook patterns ([[Hooks|claude-code-hooks repo]])
Pedagogical exemplar showing how to leverage 27+ hook events for multisensory feedback. Mouse-click sounds for `PreToolUse`, keyboard sounds for `PostToolUse`, voice for other events. Transforms abstract agent operations into perceivable feedback.

Even if the audio specifically isn't your interest, the repo is **the most complete catalog of Claude Code hook event types** with example handlers.

## Public presence

- Email: shanraisshan@gmail.com
- Polar (sponsorship): [polar.sh](https://buy.polar.sh/polar_cl_R6wjUESl8RiJD0iVaTyStBUV6WNuYvDmLJ0si1XXj4C)
- Author of "Billion-dollar questions" section in claude-code-best-practice — open questions for the discipline (CLAUDE.md best practices, agents/commands/skills choice, spec management)

## My assessment

shanraisshan's role is **discovery layer**. Where [[hesreallyhim]] curates an index (comprehensive but light annotations), shanraisshan compiles, annotates, and synthesizes. The two are complementary; both belong in the canonical sources for ecosystem awareness.

For Alessandro's focus areas, the most valuable single contribution is the **Boris/Thariq tip compilation** — these documents distill the most authoritative guidance available and make it citable. Bookmark the repo; check it periodically (Boris and Thariq post regularly).

The 10-workflow comparison is also high-leverage when evaluating which framework to adopt. Reading the comparison saves you from sequentially reading 10 READMEs.

## Cross-references

- [[shanraisshan Claude Code Best Practice]] (the hub repo)
- [[Boris Cherny Tips Compendium]] (compiled by shanraisshan)
- [[Thariq Anthropic Skills + Sessions]] (compiled by shanraisshan)
- [[Hooks]] (claude-code-hooks repo)
- [[Awesome Claude Code (hesreallyhim)]] (complementary curation)
- [[Claude Code Ecosystem]] (where shanraisshan's compilations are sourced from)
