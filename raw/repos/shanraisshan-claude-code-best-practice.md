---
title: "shanraisshan/claude-code-best-practice: from vibe coding to agentic engineering - practice makes claude perfect"
source: "https://github.com/shanraisshan/claude-code-best-practice"
author:
published:
created: 2026-04-26
description: "from vibe coding to agentic engineering - practice makes claude perfect - shanraisshan/claude-code-best-practice"
tags:
  - "clippings"
---
## claude-code-best-practice

from vibe coding to agentic engineering - practice makes claude perfect

\= Agents · = Commands · = Skills

[![Claude Code mascot jumping](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/claude-jumping.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/!/claude-jumping.svg)  
[![GitHub Trending #1 Repository Of The Day](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/root/github-trending-day.svg)](https://github.com/trending)

Boris Cherny on X ([tweet 1](https://x.com/bcherny/status/2007179832300581177) · [tweet 2](https://x.com/bcherny/status/2017742741636321619) · [tweet 3](https://x.com/bcherny/status/2021699851499798911))

## 🧠 CONCEPTS

| Feature | Location | Description |
| --- | --- | --- |
| [**Subagents**](https://code.claude.com/docs/en/sub-agents) | `.claude/agents/<name>.md` | Autonomous actor in fresh isolated context — custom tools, permissions, model, memory, and persistent identity |
| [**Commands**](https://code.claude.com/docs/en/slash-commands) | `.claude/commands/<name>.md` | Knowledge injected into existing context — simple user-invoked prompt templates for workflow orchestration |
| [**Skills**](https://code.claude.com/docs/en/skills) | `.claude/skills/<name>/SKILL.md` | Knowledge injected into existing context — configurable, preloadable, auto-discoverable, with context forking and progressive disclosure · [Official Skills](https://github.com/anthropics/skills/tree/main/skills) · [Skills for Mono-repos](https://github.com/shanraisshan/claude-code-best-practice/blob/main/reports/claude-skills-for-larger-mono-repos.md) |
| [**Workflows**](https://code.claude.com/docs/en/common-workflows) | [`.claude/commands/weather-orchestrator.md`](https://github.com/shanraisshan/claude-code-best-practice/blob/main/.claude/commands/weather-orchestrator.md) | Step-by-step guides for exploring codebases, fixing bugs, refactoring, and testing — orchestration patterns for multi-step tasks |
| [**Hooks**](https://code.claude.com/docs/en/hooks) | `.claude/hooks/` | User-defined handlers (scripts, HTTP, MCP tools, prompts, agents) that run outside the agentic loop on specific events · [Guide](https://code.claude.com/docs/en/hooks-guide) |
| [**MCP Servers**](https://code.claude.com/docs/en/mcp) | `.claude/settings.json`, `.mcp.json` | Model Context Protocol connections to external tools, databases, and APIs |
| [**Plugins**](https://code.claude.com/docs/en/plugins) | distributable packages | Bundles of skills, subagents, hooks, MCP servers, and LSP servers · [Marketplaces](https://code.claude.com/docs/en/discover-plugins) · [Create Marketplaces](https://code.claude.com/docs/en/plugin-marketplaces) |
| [**Settings**](https://code.claude.com/docs/en/settings) | `.claude/settings.json` | Hierarchical configuration system · [Permissions](https://code.claude.com/docs/en/permissions) · [Model Config](https://code.claude.com/docs/en/model-config) · [Output Styles](https://code.claude.com/docs/en/output-styles) · [Sandboxing](https://code.claude.com/docs/en/sandboxing) · [Keybindings](https://code.claude.com/docs/en/keybindings) |
| [**Status Line**](https://code.claude.com/docs/en/statusline) | `.claude/settings.json` | Customizable status bar showing context usage, model, cost, and session info |
| [**Memory**](https://code.claude.com/docs/en/memory) | `CLAUDE.md`, `.claude/rules/`, `~/.claude/rules/`, `~/.claude/projects/<project>/memory/` | Persistent context via CLAUDE.md files and `@path` imports · [Auto Memory](https://code.claude.com/docs/en/memory) · [Auto Memory Deep-dive](https://github.com/shanraisshan/claude-code-best-practice/blob/main/reports/claude-agent-memory.md) · [Rules](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules) |
| [**Checkpointing**](https://code.claude.com/docs/en/checkpointing) | automatic (git-based) | Automatic tracking of file edits with rewind (`Esc Esc` or `/rewind`) and targeted summarization |
| [**CLI Startup Flags**](https://code.claude.com/docs/en/cli-reference) | `claude [flags]` | Command-line flags, subcommands, and environment variables for launching Claude Code · [Interactive Mode](https://code.claude.com/docs/en/interactive-mode) · [Env Vars](https://code.claude.com/docs/en/env-vars) · `/usage` (merged `/cost` + `/stats` in v2.1.118) |
| **AI Terms** |  | Agentic Engineering · Context Engineering · Vibe Coding |
| [**Best Practices**](https://code.claude.com/docs/en/best-practices) |  | Official best practices · [Prompt Engineering](https://github.com/anthropics/prompt-eng-interactive-tutorial) · [Extend Claude Code](https://code.claude.com/docs/en/features-overview) |

### 🔥 Hot

| Feature | Location | Description |
| --- | --- | --- |
| [**Routines**](https://code.claude.com/docs/en/routines) | `claude.ai/code/routines`, `/schedule` | Cloud automation on Anthropic infrastructure — scheduled, API-triggered, or GitHub event-driven tasks that run even when your machine is off · [Desktop Tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks) |
| [**Ultrareview**](https://code.claude.com/docs/en/ultrareview) | `/ultrareview` | Cloud-based multi-agent code review — every finding independently reproduced and verified in a remote sandbox (5–10 min, ~$5–20/run); 3 free runs for Pro/Max · [Tasks tracking](https://code.claude.com/docs/en/ultrareview#track-a-running-review) |
| [**Devcontainers**](https://code.claude.com/docs/en/devcontainer) | `.devcontainer/` | Preconfigured development containers with security isolation and firewall rules for consistent Claude Code environments |
| [**Channels**](https://code.claude.com/docs/en/channels) | `--channels`, plugin-based | Push events from Telegram, Discord, or webhooks into a running session — Claude reacts while you're away · [Reference](https://code.claude.com/docs/en/channels-reference) |
| [**Ultraplan**](https://code.claude.com/docs/en/ultraplan) | `/ultraplan` | Draft plans in the cloud with browser-based review, inline comments, and flexible execution — remotely or teleported back to terminal |
| [**No Flicker Mode**](https://code.claude.com/docs/en/fullscreen) | `/tui fullscreen`, `CLAUDE_CODE_NO_FLICKER=1` | Flicker-free alt-screen rendering with mouse support, stable memory, and in-app scrolling — `/tui fullscreen` is the canonical toggle (v2.1.110+); env var is the legacy path |
| [**Auto Mode**](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) | `--permission-mode auto`, `Shift+Tab` | Background safety classifier replaces manual permission prompts — Claude decides what's safe while blocking prompt injection and risky escalations · `--enable-auto-mode` flag removed (v2.1.111); Max subscribers default with Opus 4.7 · [Blog](https://claude.com/blog/auto-mode) |
| [**Power-ups**](https://github.com/shanraisshan/claude-code-best-practice/blob/main/best-practice/claude-power-ups.md) | `/powerup` | Interactive lessons teaching Claude Code features with animated demos (v2.1.90) |
| [**Fast Mode**](https://code.claude.com/docs/en/fast-mode) | `/fast`, `"fastMode": true` | 2.5x faster Opus 4.6 at $30/$150 MTok — `↯` status indicator, extra-usage billing, requires admin opt-in for Team/Enterprise (v2.1.36+) |
| [**Computer Use**](https://code.claude.com/docs/en/computer-use) | `computer-use` MCP server | Let Claude control your screen — open apps, click, type, and screenshot your display on macOS · [Desktop](https://code.claude.com/docs/en/desktop#let-claude-use-your-computer) |
| [**Agent SDK**](https://code.claude.com/docs/en/agent-sdk/overview) | `npm` / `pip` package | Build production AI agents with Claude Code as a library — Python and TypeScript SDKs with built-in tools, hooks, subagents, and MCP · [Quickstart](https://code.claude.com/docs/en/agent-sdk/quickstart) · [Examples](https://github.com/anthropics/claude-agent-sdk-demos) |
| [**Ralph Wiggum Loop**](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum) | plugin | Autonomous development loop for long-running tasks — iterates until completion |
| [**Chrome**](https://code.claude.com/docs/en/chrome) | `--chrome`, extension | Browser automation via Claude in Chrome — test web apps, debug with console, automate forms, extract data from pages |
| [**Claude Code Web**](https://code.claude.com/docs/en/claude-code-on-the-web) | `claude.ai/code` | Run tasks on cloud infrastructure — long-running tasks, PR auto-fix, parallel sessions with no local setup · [Routines](https://code.claude.com/docs/en/routines) |
| [**Slack**](https://code.claude.com/docs/en/slack) | `@Claude` in Slack | Mention @Claude in team chat with a coding task — routes to Claude Code web sessions for bug fixes, code reviews, and parallel task execution |
| [**Code Review**](https://code.claude.com/docs/en/code-review) | GitHub App (managed) | Multi-agent PR analysis that catches bugs, security vulnerabilities, and regressions · [Blog](https://claude.com/blog/code-review) |
| [**GitHub Actions**](https://code.claude.com/docs/en/github-actions) | `.github/workflows/` | Automate PR reviews, issue triage, and code generation in CI/CD pipelines · [GitLab CI/CD](https://code.claude.com/docs/en/gitlab-ci-cd) |
| [**Remote Control**](https://code.claude.com/docs/en/remote-control) | `/remote-control`, `/rc` | Continue local sessions from any device — phone, tablet, or browser · [Headless Mode](https://code.claude.com/docs/en/headless) |
| [**Agent Teams**](https://code.claude.com/docs/en/agent-teams) | built-in (env var) | Multiple agents working in parallel on the same codebase with shared task coordination |
| [**Scheduled Tasks**](https://code.claude.com/docs/en/scheduled-tasks) | `/loop`, `/schedule`, cron tools | Three surfaces — `/loop` runs prompts locally in-session (up to 7 days) with self-pacing via the Monitor tool · [`/schedule`](https://code.claude.com/docs/en/routines) runs prompts in the cloud on Anthropic infrastructure (works while machine is off) · [Desktop scheduled tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks) run on your machine with access to local files · [Announcement](https://x.com/noahzweben/status/2036129220959805859) |
| [**Tasks**](https://github.com/shanraisshan/claude-code-best-practice/blob/main/reports/claude-global-vs-project-settings.md#tasks-system) | `/tasks`, `~/.claude/tasks/` | Persistent multi-session task tracking — view running and completed background work (ultrareview, agents, scheduled tasks) and inspect dependencies; replaces the deprecated TodoWrite tool · [Ultrareview tracking](https://code.claude.com/docs/en/ultrareview#track-a-running-review) |
| [**Voice Dictation**](https://code.claude.com/docs/en/voice-dictation) | `/voice` | Push-to-talk speech input for prompts with 20-language support and rebindable activation key |
| [**Simplify & Batch**](https://code.claude.com/docs/en/skills#bundled-skills) | `/simplify`, `/batch` | Built-in skills for code quality and bulk operations — simplify refactors for reuse and efficiency, batch runs commands across files |
| [**Git Worktrees**](https://code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees) | built-in, `EnterWorktree` / `ExitWorktree`, `isolation: "worktree"` | Isolated git branches for parallel development — each agent gets its own working copy; subagents can run in temporary worktrees via `isolation: "worktree"` frontmatter (v2.1.106+) |

[![section divider](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/claude-jumping.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/!/claude-jumping.svg)

See [orchestration-workflow](https://github.com/shanraisshan/claude-code-best-practice/blob/main/orchestration-workflow/orchestration-workflow.md) for implementation details of **Command** → **Agent** → **Skill** pattern.

[![Command Skill Agent Architecture Flow](https://github.com/shanraisshan/claude-code-best-practice/raw/main/orchestration-workflow/orchestration-workflow.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/orchestration-workflow/orchestration-workflow.svg)

```
claude
/weather-orchestrator
```

[![section divider](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/claude-jumping.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/!/claude-jumping.svg)

## ⚙️ DEVELOPMENT WORKFLOWS

All major workflows converge on the same architectural pattern: **Research → Plan → Execute → Review → Ship**

| Name | ★ | Uniqueness | Plan |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| [Superpowers](https://github.com/obra/superpowers) | 168k |  | [writing-plans](https://github.com/obra/superpowers/tree/main/skills/writing-plans) | 5 | 3 | 14 |
| [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) | 167k |  | [planner](https://github.com/affaan-m/everything-claude-code/blob/main/agents/planner.md) | 48 | 143 | 230 |
| [Spec Kit](https://github.com/github/spec-kit) | 91k |  | [speckit.plan](https://github.com/github/spec-kit/blob/main/templates/commands/plan.md) | 0 | 9+ | 0 |
| [gstack](https://github.com/garrytan/gstack) | 84k |  | [autoplan](https://github.com/garrytan/gstack/tree/main/autoplan) | 0 | 0 | 41 |
| [Get Shit Done](https://github.com/gsd-build/get-shit-done) | 57k |  | [gsd-planner](https://github.com/gsd-build/get-shit-done/blob/main/agents/gsd-planner.md) | 33 | 122 | 0 |
| [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) | 46k |  | [bmad-create-prd](https://github.com/bmad-code-org/BMAD-METHOD/tree/main/src/bmm-skills/2-plan-workflows/bmad-create-prd) | 0 | 0 | 39 |
| [OpenSpec](https://github.com/Fission-AI/OpenSpec) | 43k |  | [opsx:propose](https://github.com/Fission-AI/OpenSpec/blob/main/src/commands/workflow/new-change.ts) | 0 | 11 | 0 |
| [oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode) | 31k |  | [ralplan](https://github.com/Yeachan-Heo/oh-my-claudecode/tree/main/skills/ralplan) | 19 | 0 | 46 |
| [Compound Engineering](https://github.com/EveryInc/compound-engineering-plugin) | 16k |  | [ce-plan](https://github.com/EveryInc/compound-engineering-plugin/tree/main/plugins/compound-engineering/skills/ce-plan) | 51 | 4 | 37 |
| [HumanLayer](https://github.com/humanlayer/humanlayer) | 11k |  | [create\_plan](https://github.com/humanlayer/humanlayer/blob/main/.claude/commands/create_plan.md) | 6 | 27 | 0 |

### Others

- [Cross-Model (Claude Code + Codex) Workflow](https://github.com/shanraisshan/claude-code-best-practice/blob/main/development-workflows/cross-model-workflow/cross-model-workflow.md)
- [RPI](https://github.com/shanraisshan/claude-code-best-practice/blob/main/development-workflows/rpi/rpi-workflow.md)
- [Ralph Wiggum Loop](https://www.youtube.com/watch?v=eAtvoGlpeRU)
- [Andrej Karpathy (Founding Member, OpenAI) Workflow](https://x.com/karpathy/status/2015883857489522876)
- [Peter Steinberger (Creator of OpenClaw) Workflow](https://youtu.be/8lF7HmQ_RgY?t=2582)
- Boris Cherny (Creator of Claude Code) Workflow — [13 Tips](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-13-tips-03-jan-26.md) · [10 Tips](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-10-tips-01-feb-26.md) · [12 Tips](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-12-tips-12-feb-26.md) · [2 Tips](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-2-tips-25-mar-26.md) · [15 Tips](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-15-tips-30-mar-26.md) · [6 Tips](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-6-tips-16-apr-26.md)
- Thariq (Anthropic) Workflow — [Skills](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-thariq-tips-17-mar-26.md) · [Session Management](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-thariq-tips-16-apr-26.md)

[![section divider](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/claude-jumping.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/!/claude-jumping.svg)

## 💡 TIPS AND TRICKS (82)

🚫👶 = do not babysit

[Prompting](#tips-prompting) · [Planning](#tips-planning) · [Context](#tips-context) · [Session](#tips-session) · [CLAUDE.md +.claude/rules](#tips-claudemd) · [Agents](#tips-agents) · [Commands](#tips-commands) · [Skills](#tips-skills) · [Hooks](#tips-hooks) · [Workflows](#tips-workflows) · [Advanced](#tips-workflows-advanced) · [Git / PR](#tips-git-pr) · [Debugging](#tips-debugging) · [Utilities](#tips-utilities) · [Daily](#tips-daily)

■ **Prompting (3)**

| Tip | Source |
| --- | --- |
| challenge Claude — "grill me on these changes and don't make a PR until I pass your test." or "prove to me this works" and have Claude diff between main and your branch 🚫👶 |  |
| after a mediocre fix — "knowing everything you know now, scrap this and implement the elegant solution" 🚫👶 |  |
| Claude fixes most bugs by itself — paste the bug, say "fix", don't micromanage how 🚫👶 |  |

■ **Planning/Specs (6)**

| Tip | Source |
| --- | --- |
| always start with [plan mode](https://code.claude.com/docs/en/common-workflows) |  |
| start with a minimal spec or prompt and ask Claude to interview you using [AskUserQuestion](https://code.claude.com/docs/en/cli-reference) tool, then make a new session to execute the spec |  |
| always make a phase-wise gated plan, with each phase having multiple tests (unit, automation, integration) |  |
| spin up a second Claude to review your plan as a staff engineer, or use [cross-model](https://github.com/shanraisshan/claude-code-best-practice/blob/main/development-workflows/cross-model-workflow/cross-model-workflow.md) for review |  |
| write detailed specs and reduce ambiguity before handing work off — the more specific you are, the better the output |  |
| prototype > PRD — build 20-30 versions instead of writing specs, the cost of building is low so take many shots |  |

■ **Context (5)**

| Tip | Source |
| --- | --- |
| context rot kicks in around ~300-400k tokens on the 1M context model — don't let sessions drift past that for intelligence-sensitive work |  |
| dumb zone kicks in around ~40% context — "you hit this point where you have degrading results". Newcomers: "shoot to keep it under 40%, and if you get up to 60%, think about wrapping it up". Experienced: "aggressively keep it below 30%" — push to 60% only on simple tasks. Manual [/compact](https://code.claude.com/docs/en/interactive-mode) or [/clear](https://code.claude.com/docs/en/cli-reference) to reset when switching tasks |  |
| rewind > correct — double-Esc or [/rewind](https://code.claude.com/docs/en/checkpointing) back to before the failed attempt and re-prompt with what you learned, instead of leaving failed attempts + corrections polluting context 🚫👶 |  |
| [/compact](https://code.claude.com/docs/en/interactive-mode) with a hint (/compact focus on the auth refactor, drop the test debugging) beats letting autocompact fire — the model is at its least intelligent point when auto-compacting due to context rot |  |
| use subagents for context management — ask yourself "will I need this tool output again, or just the conclusion?" — 20 file reads + 12 greps + 3 dead ends stay in the child's context, only the final report returns 🚫👶 |  |

■ **Session Management (6)**

| Tip | Source |
| --- | --- |
| every turn is a branching point — after Claude ends a turn, pick between Continue, /rewind, /clear, /compact, or Subagent based on how much existing context you need to carry forward |  |
| new task = new session — related tasks (e.g. writing docs for what you just built) can reuse context for efficiency, but genuinely new tasks deserve a fresh session |  |
| use "summarize from here" before rewinding to have Claude write a handoff message — like a note to the previous iteration of Claude from its future self |  |
| /compact vs /clear — compact is lossy but momentum-friendly (mid-task, fuzzy details ok); /clear + brief is more work but you control exactly what carries forward (high-stakes next step) |  |
| use recaps for long-running sessions — short summaries of what Claude did and what's next, useful when returning after minutes or hours. Disable with recaps in /config |  |
| [/rename](https://code.claude.com/docs/en/cli-reference) important sessions (e.g. \[TODO - refactor task\]) and [/resume](https://code.claude.com/docs/en/cli-reference) them later — label each instance when running multiple Claudes simultaneously |  |

■ **CLAUDE.md +.claude/rules (8)**

| Tip | Source |
| --- | --- |
| [CLAUDE.md](https://code.claude.com/docs/en/memory) should target under [200 lines](https://code.claude.com/docs/en/memory#write-effective-instructions) per file. [60 lines in humanlayer](https://www.humanlayer.dev/blog/writing-a-good-claude-md) ([still not 100% guaranteed](https://www.reddit.com/r/ClaudeCode/comments/1qn9pb9/claudemd_says_must_use_agent_claude_ignores_it_80/)) |  |
| .claude/rules/\*.md auto-load into every session like CLAUDE.md — add paths: YAML frontmatter to lazy-load them only when Claude touches files matching the glob |  |
| wrap domain-specific CLAUDE.md rules in [<important if="..."> tags](https://www.hlyr.dev/blog/stop-claude-from-ignoring-your-claude-md) to stop Claude from ignoring them as files grow longer |  |
| use [multiple CLAUDE.md](https://github.com/shanraisshan/claude-code-best-practice/blob/main/best-practice/claude-memory.md) for monorepos — ancestor + descendant loading |  |
| use [.claude/rules/](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules) to split large instructions |  |
| any developer should be able to launch Claude, say "run the tests" and it works on the first try — if it doesn't, your CLAUDE.md is missing essential setup/build/test commands |  |
| keep codebases clean and finish migrations — partially migrated frameworks confuse models that might pick the wrong pattern |  |
| use [settings.json](https://github.com/shanraisshan/claude-code-best-practice/blob/main/best-practice/claude-settings.md) for harness-enforced behavior (attribution, permissions, model) — don't put "NEVER add Co-Authored-By" in CLAUDE.md when attribution.commit: "" is deterministic |  |

**Agents (4)**

| Tip | Source |
| --- | --- |
| have feature specific [sub-agents](https://code.claude.com/docs/en/sub-agents) (extra context) with [skills](https://code.claude.com/docs/en/skills) (progressive disclosure) instead of general qa, backend engineer |  |
| say "use subagents" to throw more compute at a problem — offload tasks to keep your main context clean and focused 🚫👶 |  |
| [agent teams with tmux](https://code.claude.com/docs/en/agent-teams) and [git worktrees](https://x.com/bcherny/status/2025007393290272904) for parallel development |  |
| use [test time compute](https://code.claude.com/docs/en/sub-agents) — separate context windows make results better; one agent can cause bugs and another (same model) can find them |  |

**Commands (3)**

| Tip | Source |
| --- | --- |
| use [commands](https://code.claude.com/docs/en/slash-commands) for your workflows instead of [sub-agents](https://code.claude.com/docs/en/sub-agents) |  |
| use [slash commands](https://code.claude.com/docs/en/slash-commands) for every "inner loop" workflow you do many times a day — saves repeated prompting, commands live in.claude/commands/ and are checked into git |  |
| if you do something more than once a day, turn it into a [skill](https://code.claude.com/docs/en/skills) or [command](https://code.claude.com/docs/en/slash-commands) — build /techdebt, context-dump, or analytics commands |  |

**Skills (9)**

| Tip | Source |
| --- | --- |
| use [context: fork](https://code.claude.com/docs/en/skills) to run a skill in an isolated subagent — main context only sees the final result, not intermediate tool calls. The agent field lets you set the subagent type |  |
| use [skills in subfolders](https://github.com/shanraisshan/claude-code-best-practice/blob/main/reports/claude-skills-for-larger-mono-repos.md) for monorepos |  |
| skills are folders, not files — use references/, scripts/, examples/ subdirectories for [progressive disclosure](https://code.claude.com/docs/en/skills) |  |
| build a Gotchas section in every skill — highest-signal content, add Claude's failure points over time |  |
| skill description field is a trigger, not a summary — write it for the model ("when should I fire?") |  |
| don't state the obvious in skills — focus on what pushes Claude out of its default behavior 🚫👶 |  |
| don't railroad Claude in skills — give goals and constraints, not prescriptive step-by-step instructions 🚫👶 |  |
| include scripts and libraries in skills so Claude composes rather than reconstructs boilerplate |  |
| embed!command in SKILL.md to inject dynamic shell output into the prompt — Claude runs it on invocation and the model only sees the result |  |

■ **Hooks (5)**

| Tip | Source |
| --- | --- |
| use [on-demand hooks](https://code.claude.com/docs/en/skills) in skills — /careful blocks destructive commands, /freeze blocks edits outside a directory |  |
| [measure skill usage](https://code.claude.com/docs/en/skills) with a PreToolUse hook to find popular or undertriggering skills |  |
| use a [PostToolUse hook](https://code.claude.com/docs/en/hooks) to auto-format code — Claude generates well-formatted code, the hook handles the last 10% to avoid CI failures |  |
| route [permission requests](https://code.claude.com/docs/en/hooks) to Opus via a hook — let it scan for attacks and auto-approve safe ones 🚫👶 |  |
| use a [Stop hook](https://code.claude.com/docs/en/hooks) to nudge Claude to keep going or verify its work at the end of a turn |  |

■ **Workflows (5)**

| Tip | Source |
| --- | --- |
| use [/model](https://code.claude.com/docs/en/model-config) to select model and reasoning, [/context](https://code.claude.com/docs/en/interactive-mode) to see context usage, [/usage](https://code.claude.com/docs/en/costs) to check plan limits, [/extra-usage](https://code.claude.com/docs/en/interactive-mode) to configure overflow billing, [/config](https://code.claude.com/docs/en/settings) to configure settings — use Opus for plan mode and Sonnet for code to get the best of both |  |
| always use [thinking mode](https://code.claude.com/docs/en/model-config) true (to see reasoning) and [Output Style](https://code.claude.com/docs/en/output-styles) Explanatory (to see detailed output with ★ Insight boxes) in [/config](https://code.claude.com/docs/en/settings) for better understanding of Claude's decisions |  |
| use ultrathink keyword in prompts for [high effort reasoning](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking#tips-and-best-practices) |  |
| /focus mode hides all intermediate work and shows only the final result — trust the model to run the right commands and just look at the outcome (toggle with /focus) |  |
| tune effort level with Opus 4.7's adaptive thinking — low for speed and fewer tokens, max for most intelligence (slider: low · medium · high · xhigh · max) |  |

■ **Workflows Advanced (9)**

| Tip | Source |
| --- | --- |
| use ASCII diagrams a lot to understand your architecture |  |
| use [/loop](https://code.claude.com/docs/en/scheduled-tasks) for local recurring monitoring (up to 7 days) · use [/schedule](https://code.claude.com/docs/en/routines) for cloud-based recurring tasks that run even when your machine is off |  |
| use [Ralph Wiggum plugin](https://github.com/shanraisshan/novel-llm-26) for long-running autonomous tasks |  |
| [/permissions](https://code.claude.com/docs/en/permissions) with wildcard syntax (Bash(npm run \*), Edit(/docs/\*\*)) instead of dangerously-skip-permissions |  |
| [/sandbox](https://code.claude.com/docs/en/sandboxing) to reduce permission prompts with file and network isolation — 84% reduction internally |  |
| invest in [product verification](https://code.claude.com/docs/en/skills) skills (signup-flow-driver, checkout-verifier) — worth spending a week to perfect |  |
| use [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) instead of dangerously-skip-permissions — a model-based classifier decides if each command is safe and auto-approves, pauses and asks if risky. Shift+Tab to cycle Ask → Plan → Auto modes 🚫👶 |  |
| use /less-permission-prompts skill to scan session history for safe bash/MCP commands that repeatedly prompt, then get a recommended allowlist to paste into [settings](https://github.com/shanraisshan/claude-code-best-practice/blob/main/best-practice/claude-settings.md) |  |
| build a /go skill that (1) tests end-to-end via bash/browser/computer use (2) runs /simplify (3) puts up a PR — so when you come back, you know the code works 🚫👶 |  |

■ **Git / PR (5)**

| Tip | Source |
| --- | --- |
| keep PRs small and focused — [p50 of 118 lines](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-2-tips-25-mar-26.md) (141 PRs, 45K lines changed in a day), one feature per PR, easier to review and revert |  |
| always [squash merge](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-2-tips-25-mar-26.md) PRs — clean linear history, one commit per feature, easy git revert and git bisect |  |
| commit often — try to commit at least once per hour, as soon as task is completed, commit |  |
| tag [@claude](https://github.com/apps/claude) on a coworker's PR to auto-generate lint rules for recurring review feedback — automate yourself out of code review 🚫👶 |  |
| use [/code-review](https://code.claude.com/docs/en/code-review) for multi-agent PR analysis — catches bugs, security vulnerabilities, and regressions before merge |  |

■ **Debugging (6)**

| Tip | Source |
| --- | --- |
| make it a habit to take screenshots and share with Claude whenever you are stuck with any issue |  |
| use mcp ([Claude in Chrome](https://code.claude.com/docs/en/chrome), [Playwright](https://github.com/microsoft/playwright-mcp), [Chrome DevTools](https://developer.chrome.com/blog/chrome-devtools-mcp)) to let claude see chrome console logs on its own |  |
| always ask claude to run the terminal (you want to see logs of) as a background task for better debugging |  |
| [/doctor](https://code.claude.com/docs/en/cli-reference) to diagnose installation, authentication, and configuration issues |  |
| use a [cross-model](https://github.com/shanraisshan/claude-code-best-practice/blob/main/development-workflows/cross-model-workflow/cross-model-workflow.md) for QA — e.g. [Codex](https://github.com/shanraisshan/codex-cli-best-practice) for plan and implementation review |  |
| agentic search (glob + grep) beats RAG — Claude Code tried and discarded vector databases because code drifts out of sync and permissions are complex |  |

■ **Utilities (5)**

| Tip | Source |
| --- | --- |
| [iTerm](https://iterm2.com/) / [Ghostty](https://ghostty.org/) / [tmux](https://github.com/tmux/tmux) terminals instead of IDE ([VS Code](https://code.visualstudio.com/) / [Cursor](https://www.cursor.com/)) |  |
| [/voice](https://code.claude.com/docs/en/voice-dictation) or [Wispr Flow](https://wisprflow.ai/) for voice prompting (10x productivity) |  |
| [claude-code-hooks](https://github.com/shanraisshan/claude-code-hooks) for claude feedback |  |
| [status line](https://github.com/shanraisshan/claude-code-status-line) for context awareness and fast compacting |  |
| explore [settings.json](https://github.com/shanraisshan/claude-code-best-practice/blob/main/best-practice/claude-settings.md) features like [Plans Directory](https://github.com/shanraisshan/claude-code-best-practice/blob/main/best-practice/claude-settings.md#plans-directory), [Spinner Verbs](https://github.com/shanraisshan/claude-code-best-practice/blob/main/best-practice/claude-settings.md#display--ux) for a personalized experience |  |

■ **Daily (2)**

| Tip | Source |
| --- | --- |
| [update](https://code.claude.com/docs/en/setup) Claude Code daily |  |
| start your day by reading the [changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) |  |

| Article / Tweet | Source |
| --- | --- |
| [6 Tips for Getting More Out of Opus 4.7 (Boris) \| 16/Apr/26](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-6-tips-16-apr-26.md) | [Tweet](https://x.com/bcherny) |
| [Session Management & 1M Context (Thariq) \| 16/Apr/26](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-thariq-tips-16-apr-26.md) | [Tweet](https://x.com/trq212) |
| [15 Hidden & Under-Utilized Features in Claude Code (Boris) \| 30/Mar/26](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-15-tips-30-mar-26.md) | [Tweet](https://x.com/bcherny/status/2038454336355999749) |
| [Squash Merging & PR Size Distribution (Boris) \| 25/Mar/26](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-2-tips-25-mar-26.md) | [Tweet](https://x.com/bcherny/status/2038552880018538749) |
| [Lessons from Building Claude Code: How We Use Skills (Thariq) \| 17/Mar/26](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-thariq-tips-17-mar-26.md) | [Article](https://x.com/trq212/status/2033949937936085378) |
| [Code Review & Test Time Compute (Boris) \| 10/Mar/26](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-2-tips-10-mar-26.md) | [Tweet](https://x.com/bcherny/status/2031089411820228645) |
| /loop — schedule recurring tasks for up to 3 days (Boris) \| 07 Mar 2026 | [Tweet](https://x.com/bcherny/status/2030193932404150413) |
| AskUserQuestion + ASCII Markdowns (Thariq) \| 28 Feb 2026 | [Tweet](https://x.com/trq212/status/2027543858289250472) |
| Seeing like an Agent - lessons from building Claude Code (Thariq) \| 28 Feb 2026 | [Article](https://x.com/trq212/status/2027463795355095314) |
| Git Worktrees - 5 ways how boris is using \| 21 Feb 2026 | [Tweet](https://x.com/bcherny/status/2025007393290272904) |
| Lessons from Building Claude Code: Prompt Caching Is Everything (Thariq) \| 20 Feb 2026 | [Article](https://x.com/trq212/status/2024574133011673516) |
| [12 ways how people are customizing their claudes (Boris) \| 12/Feb/26](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-12-tips-12-feb-26.md) | [Tweet](https://x.com/bcherny/status/2021699851499798911) |
| [10 tips for using Claude Code from the team (Boris) \| 01/Feb/26](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-10-tips-01-feb-26.md) | [Tweet](https://x.com/bcherny/status/2017742741636321619) |
| [How I use Claude Code — 13 tips from my surprisingly vanilla setup (Boris) \| 03/Jan/26](https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-boris-13-tips-03-jan-26.md) | [Tweet](https://x.com/bcherny/status/2007179832300581177) |
| Ask Claude to interview you using AskUserQuestion tool (Thariq) \| 28/Dec/25 | [Tweet](https://x.com/trq212/status/2005315275026260309) |
| Always use plan mode, give Claude a way to verify, use /code-review (Boris) \| 27/Dec/25 | [Tweet](https://x.com/bcherny/status/2004711722926616680) |

[![section divider](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/claude-jumping.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/!/claude-jumping.svg)

## 🎬 VIDEOS / PODCASTS

| Video / Podcast | Source | YouTube |
| --- | --- | --- |
| Everything We Got Wrong About Research-Plan-Implement (Dex) \| 24 Mar 2026 \| MLOps Community |  | [YouTube](https://youtu.be/YwZR6tc7qYg) |
| Building Claude Code with Boris Cherny (Boris) \| 04 Mar 2026 \| The Pragmatic Engineer |  | [YouTube](https://youtu.be/julbw1JuAz0) |
| Head of Claude Code: What happens after coding is solved (Boris) \| 19 Feb 2026 \| Lenny's Podcast |  | [YouTube](https://youtu.be/We7BZVKbCVw) |
| Inside Claude Code With Its Creator Boris Cherny (Boris) \| 17 Feb 2026 \| Y Combinator |  | [YouTube](https://youtu.be/PQU9o_5rHC4) |
| Boris Cherny (Creator of Claude Code) On What Grew His Career (Boris) \| 15 Dec 2025 \| Ryan Peterman |  | [YouTube](https://youtu.be/AmdLVWMdjOk) |
| The Secrets of Claude Code From the Engineers Who Built It (Cat) \| 29 Oct 2025 \| Every |  | [YouTube](https://youtu.be/IDSAMqip6ms) |

[![section divider](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/claude-jumping.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/!/claude-jumping.svg)

## 🔔 SUBSCRIBE

| Source | Name | Badge |
| --- | --- | --- |
|  | [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/), [r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/), [r/Anthropic](https://www.reddit.com/r/Anthropic/) |  |
|  | [Claude](https://x.com/claudeai), [Claude Devs](https://x.com/ClaudeDevs), [Anthropic](https://x.com/AnthropicAI), [Boris](https://x.com/bcherny), [Thariq](https://x.com/trq212), [Cat](https://x.com/_catwu), [Lydia](https://x.com/lydiahallie), [Noah](https://x.com/noahzweben), [Anthony](https://x.com/amorriscode), [Alex](https://x.com/alexalbert__), [Kenneth](https://x.com/neilhtennek) |  |
|  | [Jesse Kriss](https://x.com/obra) ([Superpowers](https://github.com/obra/superpowers)), [Affaan Mustafa](https://x.com/affaanmustafa) ([ECC](https://github.com/affaan-m/everything-claude-code)), [Garry Tan](https://x.com/garrytan) ([gstack](https://github.com/garrytan/gstack)), [Dex Horthy](https://x.com/dexhorthy) ([HumanLayer](https://github.com/humanlayer/humanlayer)), [Kieran Klaassen](https://x.com/kieranklaassen) ([Compound Eng](https://github.com/EveryInc/compound-engineering-plugin)), [Tabish Gilani](https://x.com/0xTab) ([OpenSpec](https://github.com/Fission-AI/OpenSpec)), [Brian McAdams](https://x.com/BMadCode) ([BMAD](https://github.com/bmad-code-org/BMAD-METHOD)), [Lex Christopherson](https://x.com/official_taches) ([GSD](https://github.com/gsd-build/get-shit-done)), [Dani Avila](https://x.com/dani_avila7) ([CC Templates](https://github.com/davila7/claude-code-templates)), [Dan Shipper](https://x.com/danshipper) ([Every](https://every.to/)), [Andrej Karpathy](https://x.com/karpathy) ([AutoResearch](https://x.com/karpathy/status/2015883857489522876)), [Peter Steinberger](https://x.com/steipete) ([OpenClaw](https://x.com/openclaw)), [Sigrid Jin](https://x.com/realsigridjin) ([claw-code](https://github.com/ultraworkers/claw-code)), [Yeachan Heo](https://x.com/bellman_ych) ([oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode)) |  |
|  | [Anthropic](https://www.youtube.com/@anthropic-ai) |  |
|  | [Lenny's Podcast](https://www.youtube.com/@LennysPodcast), [Y Combinator](https://www.youtube.com/@ycombinator), [The Pragmatic Engineer](https://www.youtube.com/@pragmaticengineer), [Ryan Peterman](https://www.youtube.com/@ryanlpeterman), [Every](https://www.youtube.com/@every_media), [MLOps Community](https://www.youtube.com/@MLOps) |  |

[![section divider](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/claude-jumping.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/!/claude-jumping.svg)

## ☠️ STARTUPS / BUSINESSES

| Claude | Replaced |
| --- | --- |
| [**Code Review**](https://code.claude.com/docs/en/code-review) | [Greptile](https://greptile.com/), [CodeRabbit](https://coderabbit.ai/), [Devin Review](https://devin.ai/), [OpenDiff](https://opendiff.com/), [Cursor BugBot](https://bugbot.dev/) |
| [**Voice Dictation**](https://code.claude.com/docs/en/voice-dictation) | [Wispr Flow](https://wisprflow.ai/), [SuperWhisper](https://superwhisper.com/) |
| [**Remote Control**](https://code.claude.com/docs/en/remote-control) | [OpenClaw](https://openclaw.ai/) |
| [**Claude in Chrome**](https://code.claude.com/docs/en/chrome) | [Playwright MCP](https://github.com/microsoft/playwright-mcp), [Chrome DevTools MCP](https://developer.chrome.com/blog/chrome-devtools-mcp) |
| [**Computer Use**](https://docs.anthropic.com/en/docs/agents-and-tools/computer-use) | [OpenAI CUA](https://openai.com/index/computer-using-agent/) |
| [**Cowork**](https://claude.com/blog/cowork-research-preview) | [ChatGPT Agent](https://openai.com/chatgpt/agent/), [Perplexity Computer](https://www.perplexity.ai/computer/), [Manus](https://manus.im/) |
| [**Tasks**](https://x.com/trq212/status/2014480496013803643) | [Beads](https://github.com/steveyegge/beads) |
| [**Plan Mode**](https://code.claude.com/docs/en/common-workflows) | [Agent OS](https://github.com/buildermethods/agent-os) |
| [**Skills / Plugins**](https://code.claude.com/docs/en/plugins) | YC AI wrapper startups ([reddit](https://reddit.com/r/ClaudeAI/comments/1r6bh4d/claude_code_skills_are_basically_yc_ai_startup/)) |

[![section divider](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/claude-jumping.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/!/claude-jumping.svg)

[![Billion-Dollar Questions](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/tags/billion-dollar-questions.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/!/tags/billion-dollar-questions.svg)

*If you have answers, do let me know at [shanraisshan@gmail.com](mailto:shanraisshan@gmail.com)*

**Memory & Instructions (4)**

1. What exactly should you put inside your CLAUDE.md — and what should you leave out?
2. If you already have a CLAUDE.md, is a separate constitution.md or rules.md actually needed?
3. How often should you update your CLAUDE.md, and how do you know when it's become stale?
4. Why does Claude still ignore CLAUDE.md instructions — even when they say MUST in all caps? ([reddit](https://reddit.com/r/ClaudeCode/comments/1qn9pb9/claudemd_says_must_use_agent_claude_ignores_it_80/))

**Agents, Skills & Workflows (6)**

1. When should you use a command vs an agent vs a skill — and when is vanilla Claude Code just better?
2. How often should you update your agents, commands, and workflows as models improve?
3. Should you have a generalist subagent or a feature-specific/role-specific agent? Does giving your subagent a detailed persona improve quality, and what does a "perfect persona prompt" for research/vision look like?
4. Should you rely on Claude Code's built-in plan mode — or build your own planning command/agent that enforces your team's workflow?
5. If you have a personal skill (e.g., /implement with your coding style), how do you incorporate community skills (e.g., /simplify) without conflicts — and who wins when they disagree?
6. Are we there yet? Can we convert an existing codebase into specs, delete the code, and have AI regenerate the exact same code from those specs alone?

**Specs & Documentation (3)**

1. Should every feature in your repo have a spec as a markdown file?
2. How often do you need to update specs so they don't become obsolete when a new feature is implemented?
3. When implementing a new feature, how do you handle the ripple effect on specs for other features?

[![section divider](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/claude-jumping.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/!/claude-jumping.svg)

## REPORTS

[![section divider](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/claude-jumping.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/!/claude-jumping.svg)

```
1. Read the repo like a course, learn what commands, agents, skills, and hooks are before trying to use them.
2. Clone this repo and play with the examples, try /weather-orchestrator, listen to the hook sounds, run agent teams, so you can see how things actually work.
3. Go to your own project and ask Claude to suggest what best practices from this repo you should add, give it this repo as a reference so it knows what's possible.
```

[![Watch on YouTube](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/thumbnail/video-1.png)](https://www.youtube.com/watch?v=AkAhkalkRY4)

[![section divider](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/claude-jumping.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/!/claude-jumping.svg)

[![GitHub Trending](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/root/github-trending.png)](https://github.com/trending?since=monthly)  
✨Trending on Github in March 2026✨

## Other Repos

| [![Claude Code Hooks](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/claude-speaking.svg)](https://github.com/shanraisshan/claude-code-hooks)   [**Claude Code   Hooks**](https://github.com/shanraisshan/claude-code-hooks) | [![Codex CLI Best Practice](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/codex-jumping.svg)](https://github.com/shanraisshan/codex-cli-best-practice)   [**Codex CLI   Best Practice**](https://github.com/shanraisshan/codex-cli-best-practice) | [![Codex CLI Hooks](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/codex-speaking.svg)](https://github.com/shanraisshan/codex-cli-hooks)   [**Codex CLI   Hooks**](https://github.com/shanraisshan/codex-cli-hooks) | [![Gemini CLI Best Practice](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/gemini-jumping.svg)](https://github.com/shanraisshan/gemini-cli-best-practice)   [**Gemini CLI   Best Practice**](https://github.com/shanraisshan/gemini-cli-best-practice) | [![Gemini CLI Hooks](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/gemini-speaking.svg)](https://github.com/shanraisshan/gemini-cli-hooks)   [**Gemini CLI   Hooks**](https://github.com/shanraisshan/gemini-cli-hooks) |
| --- | --- | --- | --- | --- |

## Developed by

> | # | Workflow | Description |
> | --- | --- | --- |
> | 1 | /workflows:development-workflows | Update the DEVELOPMENT WORKFLOWS table and cross-workflow analysis report by researching all 10 workflow repos in parallel |
> | 2 | /workflows:best-practice:workflow-concepts | Update the README CONCEPTS section with the latest Claude Code features and concepts |
> | 3 | /workflows:best-practice:workflow-claude-settings | Track Claude Code settings report changes and find what needs updating |
> | 4 | /workflows:best-practice:workflow-claude-subagents | Track Claude Code subagents report changes and find what needs updating |
> | 5 | /workflows:best-practice:workflow-claude-commands | Track Claude Code commands report changes and find what needs updating |
> | 6 | /workflows:best-practice:workflow-claude-skills | Track Claude Code skills report changes and find what needs updating |

## Star History

[![Star History Chart](https://camo.githubusercontent.com/c2a961cd4db713fc6137eba6a30befa08333fc754a8950a8af23134b9861312f/68747470733a2f2f6170692e737461722d686973746f72792e636f6d2f7376673f7265706f733d7368616e726169737368616e2f636c617564652d636f64652d626573742d707261637469636526747970653d44617465)](https://star-history.com/#shanraisshan/claude-code-best-practice&Date)

stars and counting

[![section divider](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/claude-jumping.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/!/claude-jumping.svg)

## Sponsor My Work

If you like my work, buy me a doodh patti 🍵 on

[![Polar](https://github.com/shanraisshan/claude-code-best-practice/raw/main/!/tags/polar.svg)](https://buy.polar.sh/polar_cl_R6wjUESl8RiJD0iVaTyStBUV6WNuYvDmLJ0si1XXj4C) [**Polar**](https://buy.polar.sh/polar_cl_R6wjUESl8RiJD0iVaTyStBUV6WNuYvDmLJ0si1XXj4C)