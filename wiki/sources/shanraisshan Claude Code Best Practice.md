---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, hub, best-practices, tips, comprehensive]
source_path: raw/repos/shanraisshan-claude-code-best-practice.md
source_date: 2026-04-26
source_author: shanraisshan
source_url: https://github.com/shanraisshan/claude-code-best-practice
---

# shanraisshan Claude Code Best Practice

A massive curated hub by shanraisshan covering the entire Claude Code surface — concepts, hot/recent features, 10 development workflows compared, **82 tips** in 15 categories, compiled tip docs from Boris Cherny and Thariq (Anthropic), videos/podcasts, related startups, and "billion-dollar questions" for the discipline.

For our wiki, this source is the **canonical tip compendium** and the **hub for Boris/Thariq guidance** — everything they've publicly said about Claude Code, organized.

## Concepts table — all primitives + "Hot" features

The README's CONCEPTS table is one of the cleanest enumerations of Claude Code's primitive surface. Includes most of what's covered in our existing concept pages plus several features I hadn't seen elsewhere:

### Hot / recent features (worth knowing)
- **[[Routines]]** (`claude.ai/code/routines`, `/schedule`) — cloud automation on Anthropic infrastructure; scheduled, API-triggered, or GitHub-event-driven. Runs while machine is off.
- **[[Ultrareview]]** (`/ultrareview`) — cloud-based multi-agent code review; every finding independently reproduced and verified in remote sandbox (5–10 min, ~$5–20/run; 3 free for Pro/Max).
- **Devcontainers** — preconfigured dev containers with security isolation and firewall rules.
- **Channels** (`--channels`, plugin) — push events from Telegram, Discord, webhooks into a running session.
- **Ultraplan** (`/ultraplan`) — draft plans in cloud with browser-based review; can teleport back to terminal.
- **[[Auto Mode]]** (`--permission-mode auto`, `Shift+Tab`) — background safety classifier replaces manual permission prompts. Max defaults with Opus 4.7. **Major hallucination/permission improvement.**
- **Power-ups** (`/powerup`) — interactive lessons teaching CC features.
- **Fast Mode** (`/fast`) — 2.5x faster Opus 4.6 at $30/$150 MTok.
- **Computer Use** (`computer-use` MCP) — Claude controls your screen on macOS.
- **[[Agent SDK]]** — build production AI agents with Claude Code as a library (Python + TypeScript SDKs).
- **Ralph Wiggum plugin** — official Anthropic plugin for the [[Ralph Wiggum Technique|Ralph loop]].
- **Chrome** (`--chrome`) — browser automation via Claude in Chrome.
- **Claude Code Web** (`claude.ai/code`) — long-running cloud tasks.
- **Slack** (`@Claude` in Slack) — mention Claude in team chat.
- **Code Review** GitHub App — multi-agent PR analysis.
- **Remote Control** (`/remote-control`, `/rc`) — continue local sessions from any device.
- **Agent Teams** — multiple agents in parallel on the same codebase with shared task coordination.
- **Scheduled Tasks** (`/loop`, `/schedule`, cron) — `/loop` runs prompts locally up to 7 days; `/schedule` runs in cloud.
- **Tasks** (`/tasks`) — persistent multi-session task tracking; **replaces deprecated TodoWrite tool**.
- **Voice Dictation** (`/voice`) — push-to-talk speech input, 20 languages.
- **Simplify & Batch** (`/simplify`, `/batch`) — built-in skills for code quality and bulk operations.
- **Git Worktrees** — `EnterWorktree`/`ExitWorktree` tools; subagents can run in temporary worktrees via `isolation: "worktree"` frontmatter (v2.1.106+).

The wiki's [[Claude Code]] page should be updated to reference these.

## Development workflows compared (10)

The README compares 10 major workflow repos by stars, plan command, and counts of (subagents, commands, skills):

| Workflow | Stars | Plan command |
|---|---|---|
| [[Superpowers (obra)\|Superpowers]] | 168k | writing-plans |
| **Everything Claude Code** ([[Affaan Mustafa]]) | 167k | planner |
| **Spec Kit** (github) | 91k | speckit.plan |
| **gstack** (Garry Tan) | 84k | autoplan |
| **Get Shit Done** (gsd-build) | 57k | gsd-planner |
| **BMAD-METHOD** | 46k | bmad-create-prd |
| **OpenSpec** | 43k | opsx:propose |
| **oh-my-claudecode** | 31k | ralplan |
| [[Compound Engineering Plugin\|Compound Engineering]] | 16k | ce-plan |
| **HumanLayer** | 11k | create_plan |

Notable: all 10 converge on **Research → Plan → Execute → Review → Ship**. Different teams, different naming, same shape. Strong evidence that this pattern is load-bearing for AI-assisted coding.

## 82 tips in 15 categories

Categories: Prompting, Planning/Specs, Context, Session Management, CLAUDE.md/.claude/rules, Agents, Commands, Skills, Hooks, Workflows, Workflows Advanced, Git/PR, Debugging, Utilities, Daily.

A few standout tips already woven into the wiki's topic pages:

- **Context rot at ~300-400k on 1M model**; "dumb zone" at ~40% context. New users keep below 40%; experienced under 30%, stretch to 60% only on simple tasks. (See [[Token Efficiency]].)
- **Rewind > correct** — double-Esc and re-prompt with what you learned, instead of leaving failed attempts + corrections polluting context.
- **`/compact` with a hint** beats letting autocompact fire — model is at its least intelligent point when auto-compacting due to context rot.
- **`.claude/rules/*.md` with `paths:` glob** — auto-load only when Claude touches matching files. Lazy memory.
- **`<important if="...">` tags** — keep CLAUDE.md rules from being ignored as files grow.
- **CLAUDE.md should target under 200 lines per file** (HumanLayer hits 60).
- **Skill description is a trigger, not a summary** — write for the model.
- **Don't railroad Claude in skills** — give goals and constraints, not prescriptive step-by-step.
- **`embed:!command` in SKILL.md** — inject dynamic shell output.
- **Use `/permissions` with wildcards** instead of `--dangerously-skip-permissions`.
- **`/sandbox`** to reduce permission prompts via file/network isolation — **84% reduction internally**.
- **`/less-permission-prompts` skill** — scans session history for safe commands that repeatedly prompt.
- **Build a `/go` skill** that (1) tests E2E (2) runs `/simplify` (3) puts up a PR.
- **Agentic search (glob + grep) > RAG** — Boris cites this as why Claude Code abandoned vector DBs. (See [[Agentic Search vs RAG]].)
- **Use [[TACHES Claude Code Resources|Cross-model]] (CC + Codex) for QA**.

## Compiled tip docs (the deferred Boris Cherny work, organized!)

shanraisshan has organized Boris's tweet threads and Thariq's articles into compiled docs:

### Boris Cherny (creator of Claude Code)
- 13 tips (Jan 26) — vanilla setup
- 10 tips (Feb 26) — team usage
- 12 tips (Feb 26) — customization patterns
- 2 tips (Mar 26) — Code Review & Test Time Compute
- 2 tips (Mar 26) — Squash Merging & PR Size Distribution
- 15 tips (Mar 26) — hidden & under-utilized features
- 6 tips (Apr 26) — Opus 4.7

The wiki has source pages for the most substantive: see [[Boris Cherny Tips Compendium]].

### Thariq (Anthropic engineer)
- Skills (Mar 26) — Lessons from Building Claude Code
- Session Management & 1M Context (Apr 26)

Wiki source page: [[Thariq Anthropic Skills + Sessions]].

## Other resources noted

- [[TACHES Claude Code Resources|Cross-Model (CC + Codex) Workflow]]
- RPI workflow
- Andrej Karpathy's autonomous research workflow
- Peter Steinberger (OpenClaw) workflow
- Videos: Boris on Lenny's Podcast, Y Combinator, Pragmatic Engineer; Thariq's "Seeing like an Agent" article; "Prompt Caching Is Everything" (Thariq).

## "Startups Claude replaced"

A telling table — Code Review (Greptile/CodeRabbit/Devin Review/OpenDiff/Cursor BugBot), Voice Dictation (Wispr Flow/SuperWhisper), Remote Control (OpenClaw), Claude in Chrome (Playwright/Chrome DevTools MCP), Computer Use (OpenAI CUA), Tasks (Beads), Plan Mode (Agent OS), Skills/Plugins (YC AI wrapper startups). Each Anthropic-shipped feature absorbs an entire startup's value prop.

## Billion-dollar questions

The README closes with open questions — what to put in CLAUDE.md vs leave out, agents vs commands vs skills vs vanilla, are we there yet on spec → regenerate. Worth periodically revisiting; these are still open at time of clipping.

## My assessment

This is the most comprehensive single source page in the wiki for "what's possible with Claude Code." Use as the **structural reference** when ingesting new sources — most things connect here.

Two specific high-leverage threads from this source already folded into the wiki:
1. The compiled Boris/Thariq tips closed the deferred work from previous round.
2. The "Hot" features list reveals 10+ primitives the wiki's [[Claude Code]] page didn't yet cover — addressed in this round's updates.

For Alessandro's stated focus areas, the most valuable extracts are:
- The 5-tip context category (rot zones, rewind > correct, /compact with hint, subagents for context management)
- The 9-tip skills category (description as trigger, gotchas section, don't railroad, on-demand hooks, embed shell)
- The 9-tip workflows-advanced category (auto mode, /sandbox, /less-permission-prompts, /go skill pattern)

Cross-references: [[Boris Cherny]] · [[Boris Cherny Tips Compendium]] · [[Thariq Anthropic Skills + Sessions]] · [[Auto Mode]] · [[Routines]] · [[Ultrareview]] · [[Agent SDK]] · [[Agentic Search vs RAG]] · [[Token Efficiency]] · [[Context Engineering]] · [[Skills]] · [[Memory]] · [[Claude Code Ecosystem]]
