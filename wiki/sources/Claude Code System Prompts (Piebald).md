---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, system-prompts, internals, reference]
source_url: https://github.com/Piebald-AI/claude-code-system-prompts
source_author: Piebald-AI
license: MIT
---

# Claude Code System Prompts (Piebald)

A version-tracked extraction of **all 110+ system prompts, tool descriptions, and subagent instructions** that power [[Claude Code]]. Updated within minutes of every release. As of clipping: tracking v2.1.120, 162 versions logged.

For this wiki, this source is **uniquely high-leverage**: understanding the actual instructions Claude receives (not inferred behavior) is the foundation of competent [[Context Engineering]].

## What's actually in the repo

Claude Code does not use a single monolithic system prompt. It uses ~110 dynamically composed fragments, some conditional on environment/config, others injected based on context. Piebald extracts each fragment from Claude Code's compiled source.

### Categories

**Agent prompts (30+):**
- Explore, Plan (enhanced)
- CLAUDE.md creation utility
- agent-creation-architect
- status-line-setup
- Slash command implementations: `/batch`, `/review-pr`, `/schedule`, `/security-review`
- Utility agents: memory synthesis, conversation summarization, verification specialist, WebFetch summarizer, worker fork

**Builtin tool descriptions (28+):**
- Write, Read, Edit, Bash, PowerShell, REPL, Grep, LSP
- WebFetch, WebSearch
- EnterPlanMode, ExitPlanMode, TodoWrite
- Computer (browser automation), Skill, TaskCreate, TeammateTool
- CronCreate, PushNotification
- Extensive Bash sub-notes: sandbox policy, git conventions, sleep rules, parallel execution

**System prompt fragments (70+):**
- Communication style
- Memory instructions
- Auto mode, Learning mode, Minimal mode
- Context compaction
- Hooks configuration
- Autonomous loop behavior
- Tool execution policy
- Subagent delegation guidance

**System reminders (40+):**
- Token usage notifications
- File modification notifications
- Plan mode state
- Hook success/error feedback
- Team coordination
- Memory file contents

**Skills (30+):** /loop, /dream consolidation, /morning-checkin, /stuck diagnosis, model migration, team onboarding, debugging, verify workflows, config updates, agent design patterns.

**Reference material:** Claude API docs (Python, TypeScript, Go, Java, C#, Ruby, PHP, cURL), Managed Agents, Files API, Batches API, Streaming, Tool Use, prompt caching design, HTTP error codes.

## Notable insights from reading the prompts directly

- **The Bash tool description alone spans 1,455 tokens.** It includes sandbox policy, git conventions, alternative-tool guidance ("use Read not cat"), and parallel-execution rules. This is the model's per-tool *operating manual*. Lesson: well-written tool descriptions are a large fraction of context — both in cost and in quality.
- **Memory instructions clarify that persistent memories update incrementally, not monolithically.** Stale memories must be verified against current state before acting. This pattern is worth mirroring in [[Memory|user-authored CLAUDE.md]] design — write memories as updateable facts, not append-only logs.
- **Subagent delegation is governed by an explicit prompt.** Knowing exactly what Claude is told about when to delegate clarifies *why* certain tasks get spawned to subagents and others don't. See [[When to Delegate to Subagents]].
- **Compaction is prompt-driven**, not just infrastructure. The compaction prompt's structure shapes what survives summarization — implications for how Alessandro structures long sessions and what he can rely on persisting through compaction.

## Currency

Updated within minutes of each Claude Code release. Currently tracking v2.1.120 (April 2026). Star the repo for release notifications.

## Author & license

Piebald-AI, MIT. Same author behind `tweakcc` (Claude Code styling customization).

## Relevance to mastering Claude Code

Essential for [[Context Engineering]]. Three concrete uses:

1. **Writing CLAUDE.md files that align with how Claude thinks about memory** — the memory-instruction prompt tells you what shape Claude expects.
2. **Designing skills that don't redundantly repeat what Claude already knows** — if a tool's description already covers something, your skill shouldn't restate it.
3. **Understanding the Bash sandbox and git conventions** — explains why some commands prompt and others don't, and how to avoid permission friction.

For [[Token Efficiency]]: knowing which tools have heavy descriptions (Bash) vs light ones tells you which to prefer when the choice exists.

## My assessment

This is the wiki's **highest-leverage reference for Claude Code internals**. Most other sources teach you patterns *for* Claude Code; this source shows you what's *inside* Claude Code. Set up a quarterly check or treat any "Claude is behaving differently" question as a prompt to check this repo's changelog first.

Cross-references: [[Claude Code]] · [[Context Engineering]] · [[Memory]] · [[Subagents]] · [[Hooks]] · [[Token Efficiency]] · [[Claude Code Ecosystem]]
