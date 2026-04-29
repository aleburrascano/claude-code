---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [thariq, anthropic, tasks, todowrite, action-space, multi-agent, file-system, primitive]
source_path: raw/articles/Thariq - Tasks Tool (Todos to Tasks).md
source_date: 2026-01-22
source_author: Thariq (Anthropic engineer; @trq212)
source_url: https://x.com/trq212/status/2014480496013803643
---

# Thariq — Tasks Tool (Todos to Tasks)

The full announcement of the **TodoWrite → Tasks** transition that [[Thariq - Seeing like an Agent|Thariq's Seeing like an Agent]] essay later cited as the canonical "tools designed for past models can constrain current models" example.

For our wiki, this completes the [[Action Space Design]] story: the wiki had the reframe ("re-audit your action space when a new model generation ships") but lacked the full mechanics of *what* the new primitive looks like and *why* the old one became constraining.

## The transition: why TodoWrite became constraining

> "As model capabilities grow, one of the most important things we can do is **'unhobble' Claude** and allow it to use its new capabilities effectively. Compared to previous models, **Opus 4.5 is able to run autonomously for longer and keep track of its state better**. We found that the TodoWrite Tool was no longer necessary because Claude already knew what it needed to do for smaller tasks."

The framing is "**unhobble**" — earlier models needed scaffolding (Todos + every-5-turn system reminders) to stay on track. Later models can hold state without that crutch. Keeping the crutch makes them treat the list as fixed, which actively hurts their newly-strong autonomy.

## What Tasks adds

Tasks address a different problem from Todos:

| Old: TodoWrite | New: Tasks |
|---|---|
| Keep one model on track within one session | Coordinate work across sessions / subagents on long projects |
| In-context list, recreated each session | **File-system-stored** (persistent) |
| No dependency model | Dependencies + blockers as first-class metadata |
| Implicit single-owner | Multi-session / multi-subagent collaboration |
| Reminded every 5 turns | Updates broadcast to all sessions on the same Task List |

This is **a new primitive**, not a renamed Todo. The shape is closer to a project management system (Linear/Jira-like) than a checklist.

## The mechanics

### File-system storage

```
~/.claude/tasks/
```

Tasks are files. You can build additional utilities on top — scripts, hooks, MCP servers reading the same store.

### Cross-session collaboration via shared task lists

```bash
CLAUDE_CODE_TASK_LIST_ID=groceries claude
```

Multiple sessions started with the same `CLAUDE_CODE_TASK_LIST_ID` collaborate on the same Task List. Updates broadcast. Works with `claude -p` (headless mode) and the **Agent SDK**.

### Dependencies + blockers as metadata

Tasks can depend on other Tasks. Stored in the task metadata. **Mirrors more how projects work** — work isn't a flat list; it's a DAG with blockers.

## "Unhobble" as a design principle

> "As model capabilities grow, one of the most important things we can do is unhobble Claude and allow it to use its new capabilities effectively."

Generalize: when a new model generation ships, audit which scaffolding has become constraining. Anthropic ran this audit on TodoWrite and removed it. The pattern applies to:

- **Periodic system reminders** — needed for Sonnet 3.5; constraining for Opus 4.5+
- **Verbose tool descriptions** — needed when models couldn't infer; counterproductive when they can
- **Forced single-step reasoning** — needed before extended thinking; ceiling now
- **Mandatory plan-mode** for trivial tasks — overhead for capable models

This is the operational form of [[Action Space Design#Tools designed for past models can constrain current models|Thariq's "tools designed for past models" rule]]. Audit on each model bump.

## The Steve Yegge connection

> "We took inspiration from projects like **Beads by Steve Yegge**."

This is the second time Steve Yegge surfaces in this wiki — once via the Tier 4.2 candidates list (skipped under VERIFY-FIRST) and now via Anthropic explicitly citing his Beads project as inspiration for Tasks. **Worth promoting from skipped to ingested** — see [[Steve Yegge]] (just-created person page).

## Where this lands in the wiki

- **[[Action Space Design]]** — Tasks is the canonical worked example of "unhobble on each model bump"; replaces the prior summarized-via-Thariq mention with primary-source detail
- **[[Subagents]]** — Tasks are now the canonical mechanism for cross-subagent state (file-system store + broadcast on update)
- **[[Multi-Agent Orchestration]]** — Tasks add a new coordination mechanism: **file-system-mediated state** (sibling to briefs, disk handoff, hooks-as-message-bus, MCP-mediated state). Specifically, the broadcast-on-update behavior is novel
- **[[Memory]]** — `~/.claude/tasks/` pairs with Auto Memory's `~/.claude/projects/<project>/memory/` as **two file-system-resident state stores Claude reads on each session**
- **[[Anthropic Models Overview]]** — Opus 4.5 specifically is named as the model that "keeps state better" — operational anchor for the model selection table
- **[[Steve Yegge]]** — promoted from Tier 4.2 skip-list to ingested

## Cross-references

- [[Thariq]] (the author)
- [[Thariq - Seeing like an Agent]] (the related essay that cited this transition obliquely)
- [[Action Space Design]] (primary anchor; the canonical "unhobble" example)
- [[Subagents]] · [[Multi-Agent Orchestration]] · [[Memory]]
- [[Steve Yegge]] (Beads inspiration; surfaces in this wiki via this acknowledgement)
- [[Anthropic Models Overview]] (Opus 4.5 capability lift framing)
