---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, session-continuity, cross-agent, search, multi-tool]
source_url: https://github.com/pchalasani/claude-code-tools
source_author: Prasad Chalasani
license: MIT
---

# claude-code-tools (Prasad Chalasani)

A productivity suite that addresses **session continuity, cross-tool handoff, and high-performance session search** for Claude Code and adjacent CLI agents. By Prasad Chalasani. 99 releases, 1.7k stars.

The pitch: language model agents lose context through token limits and session resets. claude-code-tools provides systematic mechanisms to preserve state and recover context.

## Distinctive contributions

### Cross-agent handoff: Claude Code ↔ Codex CLI
**Bidirectional session-state transfer** between Claude Code and Codex CLI. Agent in one platform can transfer state to the other. Use case: leverage specialized capabilities of each platform without losing momentum.

This is the most concrete implementation of cross-tool agent coordination in our wiki's coverage. Adjacent to [[gstack (Garry Tan)|gstack's `/pair-agent`]] (multi-vendor browser sharing) but at a different layer (session state, not runtime browser).

### Rust/Tantivy full-text session search
High-performance search across session histories built with Rust + Tantivy. **Dual interface**:
- **TUI** for human operators
- **CLI/skill** for agents

Most session-search tools are agent-only or human-only. claude-code-tools serves both — the same search engine accessible from both human exploration and agent invocation.

### tmux-cli skill
Direct terminal multiplexer integration. Agents create windows, send commands, orchestrate multi-process scenarios. Foundational for **terminal-based multi-agent orchestration** (the alternative to [[HCOM (Claude Hook Comms)|HCOM]]'s hook-based approach).

### Session continuity skills
Skills + commands specifically designed to **avoid token compaction** and **recover context** without forcing full re-entry.

### Safety hooks
Block dangerous command execution. Adjacent to [[Hooks|claudekit's PreToolUse safety hooks]] and [[Trail of Bits Security Skills]] but lightweight, focused.

## Installation

```bash
uv tool install claude-code-tools
```

Optional Google Docs/Sheets integration. Rust search engine separately installable via Homebrew, Cargo, or pre-built binaries.

## My assessment

claude-code-tools' most valuable contributions for our wiki:

1. **Cross-agent handoff Claude Code ↔ Codex CLI** — the canonical implementation. As multi-vendor agent setups become more common, this pattern matters more. Worth understanding even if you only use Claude Code now.

2. **Dual-interface search (TUI + CLI/skill)** — the right shape for session-search tools. Same engine for human exploration and agent invocation. Lift this pattern.

3. **Anti-compaction skills** — pair with [[Token Efficiency|the wiki's compaction discipline]] (proactive `/compact` with hint per [[Thariq Anthropic Skills + Sessions|Thariq]]). Tools + discipline together.

4. **tmux-cli for orchestration** — alternative to [[HCOM (Claude Hook Comms)|HCOM]] for multi-process coordination. tmux is older/more universal; HCOM is Claude-Code-native.

For Alessandro's focus areas, this is most useful as **session-continuity infrastructure** — particularly the search and the cross-agent handoff. The dual-interface search alone is worth knowing about for any project where session history is a knowledge asset.

Cross-references: [[Hooks]] · [[Token Efficiency]] · [[Memory]] · [[Subagents]] · [[gstack (Garry Tan)]] · [[HCOM (Claude Hook Comms)]] · [[Claude Code Ecosystem]]
