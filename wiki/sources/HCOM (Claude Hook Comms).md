---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, multi-agent, hooks, communication, orchestration]
source_url: https://github.com/aannoo/claude-hook-comms
source_author: aannoo
license: MIT
---

# HCOM (Claude Hook Comms)

Lightweight CLI tool for **real-time messaging and coordination between Claude Code sub-agents**. By aannoo. Cross-platform (Claude Code, Gemini CLI, Codex, OpenCode).

The novel contribution: **hooks-as-message-bus**. Inter-agent communication via hooks + SQLite + hooks pattern.

## Hook-based architecture

```
agent → hooks → db (SQLite) → hooks → other agent
```

Innovation: instead of complex middleware, hooks record activity to local SQLite + deliver messages from it. **Lightweight, no external dependencies, agents stay in real terminals.**

For supported tools: messages arrive **mid-turn** (injected between tool calls) or **immediately wake idle agents**. Any process can trigger agent notifications via `hcom send`.

Hooks integrate into config directories on first run. **Dormant if HCOM isn't actively used** — minimizes overhead.

## @-mention targeting

Agents address peers using `@notation`:
- Individual agents: `@agent-name`
- **Group tags**: launch with `--tag mycrew` → addressable as `@mycrew`

Selective messaging reduces noise. Atypical for multi-agent systems which often broadcast.

## Live dashboard (TUI)

`hcom` opens TUI dashboard:
- Active agents + status + message flow
- **Transcripts, file edits, terminal screens, command history**
- **Observe and interrupt agents in real-time**
- Multiple emulators supported: kitty, wezterm, tmux, others

This is among the most complete multi-agent observation surfaces in the ecosystem.

## Installation

```bash
brew install aannoo/hcom/hcom    # macOS
uv tool install hcom              # PyPI
# or shell installer for macOS/Linux/WSL
```

Uninstalling **safely removes hooks while preserving system state** — important detail for trial usage.

## Author / community

aannoo. 239 stars, 28 releases. Active development.

## My assessment

HCOM's contributions for our wiki:

1. **Hooks as message bus** — novel architectural pattern. Most multi-agent systems use external orchestration (queues, web servers); HCOM uses Claude Code's native hooks. **Lower complexity, no external infrastructure.**

2. **@-mention with group tags** — addressable agents enable targeted (not broadcast) messaging. The right shape for non-trivial multi-agent setups.

3. **TUI dashboard with terminal-screen visibility** — observability that goes beyond log viewing. Useful for debugging multi-agent failures.

4. **"Dormant if not used"** — many hook-based tools impose overhead even when idle. HCOM's lightweight install is the right shape.

For Alessandro's focus areas, HCOM matters most for [[When to Delegate to Subagents|multi-agent orchestration]]. If you find yourself running multiple Claude Code sessions and wanting them to coordinate (rather than work independently), HCOM is the right shape.

Caveats:
- Awesome list noted "a little unstable at posting time but incredibly promising and creative." Check current stability before production adoption.
- Multi-agent coordination has real complexity costs. Use only when single-agent + subagents within one session is genuinely insufficient.

Cross-references: [[Hooks]] · [[Subagents]] · [[When to Delegate to Subagents]] · [[Test Time Compute]] (multi-agent pattern) · [[Claude Code Ecosystem]]
