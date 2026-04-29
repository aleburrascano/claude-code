---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [anthropic, official, quickstarts, sdk, reference-implementations]
source_url: https://github.com/anthropics/claude-quickstarts
source_author: Anthropic
license: (Anthropic; varies per quickstart)
---

# Anthropic Claude Quickstarts

Official starter projects for the Claude API. **Anthropic-blessed reference implementations**. 16.3k stars. 55.8% Python, 26.3% TypeScript, plus Jupyter Notebooks.

For our wiki, this is the canonical "where do I start building with Claude" reference. Less directly relevant to Claude Code mastery than to building Claude-API or Agent-SDK applications, but useful to know about.

## The 5 demo projects

### Customer Support Agent
Knowledge-base integration, context retrieval, multi-turn conversation management. Foundational for AI-assisted support systems.

### Financial Data Analyst
Interactive data visualization + Claude's analytical capabilities. Real-time chat-based interaction patterns over financial data.

### Computer Use Demo
Environment + tools letting Claude control desktop computers. Latest `computer_use_20251124` tool version, including zoom actions. **Foundational for understanding Claude's automation capabilities** (relevant to [[Claude Code]]'s Computer Use feature).

### Browser Tools API Demo
Browser automation reference implementation: navigation, DOM inspection, form manipulation. Uses Playwright integration. Relevant to [[Claude Code]]'s Chrome extension and browser automation patterns.

### Autonomous Coding Agent
**Two-agent pattern** (initializer + coding agent) using the [[Claude Code|Claude Agent SDK]]. Persistent progress tracking via git, feature list management, multi-session application development. **Direct reference for building Claude-Code-style autonomous agents.**

## Workflow patterns

- Multi-turn conversations with context management
- Agent-based orchestration (two-agent pattern for complex tasks)
- Tool integration (computer use, browser automation, knowledge bases)
- Data analysis workflows with visualization feedback loops
- Incremental development with persistent state across sessions

## Why this matters for our wiki

For Alessandro's focus areas:
- **The Autonomous Coding Agent demo** is the canonical Anthropic reference for [[Claude Code|Agent SDK]]-based autonomous agents. If you ever want to build your own Claude-Code-style harness rather than use Claude Code itself, this is the starting point.
- **The Computer Use Demo** is the official reference for the screen-control capability mentioned in [[Claude Code|Claude Code's "Hot" features]]. If exploring Computer Use, this is the official baseline.

Less directly relevant to *using* Claude Code (which is the wiki's main focus). But know it exists for the day you want to *build* something Claude-Code-shaped.

## Cross-references

- [[Claude Code]] · [[Agent SDK|Claude Code's Agent SDK section]] · [[Subagents]] (two-agent pattern)
- [[Learn Claude Code (shareAI-lab)]] (educational reverse-engineering complement)
- [[Claude Code Ecosystem]]
