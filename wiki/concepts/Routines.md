---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 2
tags: [claude-code, routines, cloud, scheduled-tasks, automation]
aliases: [Cloud Tasks, Scheduled Tasks]
---

# Routines

A Claude Code feature for **cloud-hosted scheduled or event-triggered tasks** that run on Anthropic's infrastructure even when your local machine is off.

For our wiki this is the right primitive for **"set it and forget it" automation** — code reviews, PR maintenance, recurring research, status reports, periodic skill audits.

## What they are

Three related surfaces, per [[shanraisshan Claude Code Best Practice]]:

| Surface | Where | Runtime |
|---|---|---|
| **`/loop`** | Local in-session, up to 7 days | Your machine; self-paces via Monitor tool |
| **`/schedule`** | Cloud (Anthropic infra) | Cloud; works while machine off |
| **Desktop scheduled tasks** | Local desktop | Your machine; access to local files |

`/schedule` is the canonical "Routines" feature — cron-shaped jobs hosted by Anthropic.

## Trigger types

- **Cron schedule** — periodic (every hour, every Monday at 9am)
- **API-triggered** — fire on external HTTP call
- **GitHub event-driven** — fire on PR opened, issue created, etc.

## Why cloud matters

Per the [[Boris Cherny Tips Compendium|Boris 15-tips]] + the [[shanraisshan Claude Code Best Practice|shanraisshan README]]:

- **Machine off, work continues** — laptop closed; cloud runs your tasks
- **No machine state required** — fresh execution each run; reproducible
- **Triggered by external events** — webhook → Routine runs → output pushed to wherever

## Use cases

### Recurring code review
Schedule daily PR sweep. Routine reviews open PRs, posts feedback. (Adjacent to Anthropic's `/code-review` GitHub App.)

### Skill audits
Per [[TACHES Claude Code Resources|TÂCHES]], periodically run skill-auditor against your skill library. Routine schedules it weekly. Detects drift.

### Status reports
Daily standup: Routine runs `/standup` skill → posts to Slack via [[Model Context Protocol|MCP]]. Async team coordination.

### Long research
Research that takes hours. Schedule overnight; results in your inbox in the morning.

### Periodic linting / health checks
[[claudekit (Carl Rannaberg)|claudekit]]-style project-wide validation, scheduled. Catch quality drift between active sessions.

### Boris's daily ritual
[[Boris Cherny Tips Compendium|Boris recommends]] reading the changelog daily — could be automated as a Routine that summarizes changes and pushes to your channel of choice.

## /loop vs /schedule

| | `/loop` | `/schedule` |
|---|---|---|
| Where | Local | Cloud (Anthropic infra) |
| Max duration | 7 days | Effectively indefinite (per cron) |
| Machine state required | Yes (machine on) | No |
| Cost | Local Claude tokens | Cloud-hosted compute (separate billing surface likely) |
| Best for | Active development with periodic check-ins | Background automation independent of your machine |

The Monitor tool self-paces `/loop` — self-pacing intervals reflect what the work needs (e.g., "check the build every 5 min").

## Tasks system

Per [[shanraisshan Claude Code Best Practice]]: `/tasks` and `~/.claude/tasks/` provide **persistent multi-session task tracking** for view of running and completed background work (Ultrareview, agents, scheduled tasks, dependencies).

> "Replaces the deprecated TodoWrite tool."

This is a significant change worth noting — `TodoWrite` is being phased out in favor of the `/tasks` system. Wiki entries that reference TodoWrite should be updated as the new system stabilizes.

## Relationship to other primitives

- [[Hooks]] — Routines can use hooks the same way local sessions do
- [[Subagents]] — Routines can spawn subagents for parallel work
- [[Auto Mode]] — Routines should generally use Auto Mode (no human there to approve)
- [[Sandboxing]] — extra important for unattended Routines
- [[Skills]] — Routines invoke skills the same way local sessions do

## Anti-patterns

- **Routines without verification** — unattended Routine that produces buggy code without verification = compounded errors. Pair with [[Verification Loops]].
- **Routines that escalate without bounds** — Auto Mode + bypassPermissions + cloud = recipe for runaway. Set explicit limits.
- **Routines for trivial work** — manual `/loop` is often fine. Cloud Routines pay off when machine availability matters.
- **Sensitive data in cloud Routines** — Anthropic-hosted execution sees your data. Consider what's appropriate.

## Cross-references

- [[Claude Code]] · [[Hooks]] · [[Auto Mode]] · [[Sandboxing]] · [[Subagents]]
- [[Verification Loops]] (especially important for unattended Routines)
- Sources: [[shanraisshan Claude Code Best Practice]] (categorized in "Hot" features) · [[Boris Cherny Tips Compendium]] (recurring tasks)
- Anthropic docs: `/en/routines`, `/en/scheduled-tasks`
