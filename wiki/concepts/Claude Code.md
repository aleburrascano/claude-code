---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 4
tags: [claude-code, platform, anthropic]
aliases: [Claude Code CLI]
---

# Claude Code

Anthropic's official agentic coding tool. Lives primarily as a CLI but ships in multiple surfaces: terminal CLI, native desktop apps (macOS/Windows), web app (claude.ai/code), and IDE extensions (VS Code, JetBrains).

The defining design choice: Claude Code is **harness around a model**, not a wrapper around a chat. The model has direct tool access (file editing, shell execution, web fetch, subagent spawning, etc.), and operates in autonomous loops within a permission-bounded sandbox. See [[Learn Claude Code (shareAI-lab)]] for the architectural mental model: agency comes from the model; the harness shapes the world the model operates in.

## Primitives (the wiki's coverage)

The teachable feature set, per [[Claude HowTo (luongnv89)]]'s 10-module taxonomy:

| Primitive | What it is | Page |
|---|---|---|
| Slash Commands | User-invoked shortcuts (`/cmd`) | [[Slash Commands]] |
| Memory | Persistent context across sessions (CLAUDE.md files) | [[Memory]] |
| Skills | Auto-invoked, model-controlled capabilities | [[Skills]] |
| Subagents | Specialized AI assistants with isolated contexts | [[Subagents]] |
| MCP | Model Context Protocol — external tool/data access | [[Model Context Protocol]] |
| Hooks | Event-triggered shell commands | [[Hooks]] |
| Plugins | Bundled commands + agents + MCP + hooks | [[Plugins]] |
| Checkpoints | Session snapshots with rewind | [[Checkpoints]] |
| Planning Mode | Plan-first execution with explicit approval | [[Planning Mode]] |
| Extended Thinking | Deep-reasoning mode (toggle: `Alt+T` / `Option+T`) | [[Extended Thinking]] |
| Output Styles | Configurable response presentation | [[Output Styles]] |
| Auto Mode | Classifier-based permission auto-approval | [[Auto Mode]] |
| Sandboxing | OS-level filesystem + network isolation | [[Sandboxing]] |
| Routines | Cloud-hosted scheduled/triggered tasks | [[Routines]] |
| Status Lines | Customizable terminal status bar | (low-priority for this wiki) |

## Distribution and currency

- Claude Code 2.1+ ships as a **native per-platform binary** (macOS/Linux/Windows). Starting v2.1.113.
- `npm install -g @anthropic-ai/claude-code` still works — the native binary is downloaded as an optional dep on first use.
- Since v2.1.116, downloads come from `https://downloads.claude.ai/claude-code-releases` — corporate proxies must allowlist this host.
- Latest version per [[Claude HowTo (luongnv89)]] (clipped 2026-04-26): **v2.1.119**.
- Latest tracked by [[Claude Code System Prompts (Piebald)]]: **v2.1.120**, with 162 versions logged since v2.0.14.

For the current state of internals, [[Claude Code System Prompts (Piebald)]] is the most up-to-date primary source.

## Permission modes

From [[Claude HowTo (luongnv89)]] (full coverage in [[Auto Mode]]):
- `default` — prompts for risky actions; reads only auto-approved
- `acceptEdits` — auto-accept file edits + filesystem commands (`mkdir`, `touch`, `mv`, `cp`)
- `plan` — must enter plan mode before editing
- `auto` — classifier reviews + auto-approves safe actions ([[Auto Mode]])
- `dontAsk` — only pre-approved tools execute
- `bypassPermissions` — accept everything (dangerous; container-only territory)

Cycle modes mid-session with `Shift+Tab`. For risky autonomous use, prefer [[Auto Mode]] + [[Sandboxing]] over `bypassPermissions`.

## Sessions

`/resume`, `/rename`, `/fork`, `claude -c`, `claude -r`, `/branch`, `--teleport` — `--fork` and `/branch` enable parallel conversation threads. **Session teleportation** (`claude --teleport`, `/remote-control`, `/rc`) lets you switch devices (mobile/web/desktop/terminal) without losing context.

## Headless mode for CI/CD

```
claude -p "Run tests and generate report"
claude -p --output-format json "list functions"
cat error.log | claude -p "explain this error"
```

Pairs with [[Hooks]] for fully automated pipelines. The `--bare` flag gives 10x faster SDK startup by skipping local config auto-discovery.

## "Hot" features (per [[shanraisshan Claude Code Best Practice|shanraisshan]])

Recently shipped or under-utilized features beyond the primitives:

- **`/loop`** — local recurring tasks up to 7 days; self-paces via Monitor tool
- **`/schedule`** — cloud Routines (works while machine off)
- **Ultraplan** (`/ultraplan`) — draft plans in cloud with browser-based review
- **Ultrareview** (`/ultrareview`) — multi-agent code review in remote sandbox; 5-10 min, ~$5-20/run, 3 free for Pro/Max
- **Channels** (`--channels`) — push events from Telegram/Discord/webhooks into a session
- **Power-ups** (`/powerup`) — interactive lessons teaching CC features
- **Fast Mode** (`/fast`) — 2.5x faster Opus 4.6 at $30/$150 MTok
- **Computer Use** (`computer-use` MCP) — Claude controls your screen on macOS
- **Chrome** (`--chrome`, extension) — browser automation via Claude in Chrome
- **Voice Dictation** (`/voice`) — push-to-talk speech, 20 languages
- **Recaps** — brief elapsed-time summaries on return to long sessions
- **`/focus`** — hide intermediate work, show only result
- **`/btw`** — side queries that don't pollute the main task
- **`/batch`** — fan out large changesets across multiple worktree agents
- **`--add-dir`** — multi-repo access in one session
- **Git worktrees** — `EnterWorktree`/`ExitWorktree` tools; subagents support `isolation: "worktree"` (v2.1.106+)
- **Agent Teams** — multiple agents in parallel with shared task coordination
- **Cowork** — secure remote control for non-coding tasks
- **Slack** (`@Claude` in Slack) — mention Claude in team chat
- **Code Review** — GitHub App for multi-agent PR analysis
- **GitHub Actions** integration
- **Claude Code Web** (`claude.ai/code`) — long-running cloud tasks
- **Mobile apps** (iOS + Android) — review and code from phone
- **Tasks** (`/tasks`) — persistent multi-session task tracking; **replaces deprecated `TodoWrite` tool**
- **Bundled skills** — `/simplify`, `/batch`, `/debug`, `/loop`, `/claude-api` (always available)
- **Adaptive thinking effort** (Opus 4.7) — slider: low / medium / high / xhigh / max

## Agent SDK

Build your own Claude-Code-style agents as a library:

- **Python**: `pip install claude-agent-sdk`
- **TypeScript**: `npm install @anthropic-ai/claude-agent-sdk`

The SDK exposes the same agent loop, built-in tools (Read/Write/Edit/Bash/etc.), [[Hooks]], [[Subagents]], and [[Model Context Protocol|MCP]] that power Claude Code itself. Differs from the Anthropic Client SDK in that the agent loop is implemented for you. Useful for production AI agents in CI/CD, custom applications, or automation pipelines. See [[Learn Claude Code (shareAI-lab)]] for the educational reverse-engineering path.

## Compatible models

Claude Sonnet 4.6, Claude Opus 4.7, Claude Haiku 4.5. Model selection and migration patterns documented in the system-prompts repo.

## Surfaces beyond Claude Code itself

The same model powers:
- The Claude.ai web/mobile apps (different harness)
- The Claude API directly (no harness)
- Claude Agent SDK (build your own harness — see [[Learn Claude Code (shareAI-lab)]] for the educational path through this)

For our wiki's purposes "Claude Code" refers to the agentic-coding tool specifically. When a technique applies more broadly to "any Claude harness," we'll note it.

## Cross-references

- All primitive pages above
- [[Claude Code Ecosystem]] — synthesis of community resources
- [[Getting the Most from Claude Code]] — top-level dashboard for our focus
- Sources: [[Claude HowTo (luongnv89)]] · [[Claude Code System Prompts (Piebald)]] · [[Learn Claude Code (shareAI-lab)]] · [[Awesome Claude Code (hesreallyhim)]]
